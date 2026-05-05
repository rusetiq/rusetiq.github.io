import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector2 } from 'three';

const fragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m * m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p, int octaves) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    val += amp * snoise(p * freq);
    amp *= 0.5;
    freq *= 2.1;
  }
  return val;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse / u_resolution.xy;
    mouse.x *= u_resolution.x / u_resolution.y;

    float dist = distance(st, mouse);
    vec2 dir = normalize(st - mouse + vec2(0.001));
    float repel = smoothstep(0.55, 0.0, dist);
    st -= dir * repel * 0.08;

    float t = u_time * 0.055;

    vec2 domain = st * 2.2;

    float warp1 = fbm(domain + vec2(t * 0.7, t * 0.3), 4);
    float warp2 = fbm(domain + vec2(warp1 * 0.9, warp1 * 1.2) + vec2(5.1, 3.7) + t * 0.2, 4);

    float base = fbm(domain + vec2(warp2 * 1.1, warp2 * 0.8) + t * 0.15, 5);

    base = base * 0.5 + 0.5;

    vec3 void0  = vec3(0.018, 0.009, 0.003);
    vec3 void1  = vec3(0.035, 0.018, 0.006);
    vec3 ember  = vec3(0.72,  0.20,  0.04);
    vec3 copper = vec3(0.62,  0.38,  0.08);
    vec3 gold   = vec3(0.80,  0.58,  0.12);

    vec3 color = mix(void0, void1, smoothstep(0.0, 0.55, base));

    float emberBand = smoothstep(0.55, 0.68, base) * (1.0 - smoothstep(0.68, 0.76, base));
    color = mix(color, ember * 0.55, emberBand * 1.1);

    float copperBand = smoothstep(0.76, 0.85, base) * (1.0 - smoothstep(0.85, 0.92, base));
    color = mix(color, copper * 0.4, copperBand * 0.8);

    float goldEdge = smoothstep(0.92, 0.96, base);
    color = mix(color, gold * 0.35, goldEdge * 0.7);

    float mouseHalo = smoothstep(0.3, 0.0, dist) * 0.18;
    color += ember * mouseHalo;

    float grain = snoise(st * 320.0 + t * 3.0) * 0.025;
    color += grain;

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const GradientMesh = () => {
    const mesh = useRef();
    const mouseRef = useRef(new Vector2(0, 0));

    useMemo(() => {
        const onMove = (e) => {
            const dpr = window.devicePixelRatio || 1;
            mouseRef.current.x = e.clientX * dpr;
            mouseRef.current.y = (window.innerHeight - e.clientY) * dpr;
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    const uniforms = useMemo(() => ({
        u_time: { value: 0 },
        u_mouse: { value: new Vector2(0, 0) },
        u_resolution: { value: new Vector2(window.innerWidth * (window.devicePixelRatio || 1), window.innerHeight * (window.devicePixelRatio || 1)) }
    }), []);

    useFrame(({ clock }) => {
        const dpr = window.devicePixelRatio || 1;
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
        mesh.current.material.uniforms.u_mouse.value.copy(mouseRef.current);
        if (mesh.current.material.uniforms.u_resolution.value.x !== window.innerWidth * dpr) {
            mesh.current.material.uniforms.u_resolution.value.set(window.innerWidth * dpr, window.innerHeight * dpr);
        }
    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]} scale={[20, 10, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
        </mesh>
    );
};

export default function BackgroundShader() {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#0a0301' }}>
            <Canvas camera={{ position: [0, 0, 1] }} resize={{ scroll: false }}>
                <GradientMesh />
            </Canvas>
        </div>
    );
}
