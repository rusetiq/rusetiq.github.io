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
  vec3 x2 = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x2) - 0.5;
  vec3 ox = floor(x2 + 0.5);
  vec3 a0 = x2 - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float ridge(float n, float offset) {
    n = offset - abs(n);
    return n * n;
}

float ridgedFbm(vec2 p, float t) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    float prev = 1.0;
    for (int i = 0; i < 5; i++) {
        float n = ridge(snoise(p * freq + t * (0.3 + float(i) * 0.07)), 0.9);
        val += n * amp * prev;
        prev = n;
        amp *= 0.55;
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
    float repel = smoothstep(0.5, 0.0, dist);
    st -= dir * repel * 0.06;

    float t = u_time * 0.09;

    vec2 q;
    q.x = snoise(st * 1.4 + vec2(0.0, t));
    q.y = snoise(st * 1.4 + vec2(3.1, t));

    vec2 warped = st + q * 0.35;

    float veins = ridgedFbm(warped * 1.8, t);
    float veins2 = ridgedFbm(warped * 0.9 + vec2(4.4, 2.1), t * 0.6);
    float combined = veins * 0.7 + veins2 * 0.3;

    vec3 rock     = vec3(0.020, 0.010, 0.004);
    vec3 darkRock = vec3(0.040, 0.020, 0.007);
    vec3 lava1    = vec3(0.90,  0.28,  0.04);
    vec3 lava2    = vec3(0.98,  0.52,  0.08);
    vec3 core     = vec3(1.00,  0.82,  0.30);

    vec3 color = mix(rock, darkRock, smoothstep(0.0, 0.4, combined));

    float veinGlow = smoothstep(0.42, 0.62, combined);
    color = mix(color, lava1 * 0.6, veinGlow * 0.85);

    float hotVein = smoothstep(0.62, 0.78, combined);
    color = mix(color, lava2 * 0.7, hotVein * 0.9);

    float coreGlow = smoothstep(0.78, 0.88, combined);
    color = mix(color, core * 0.55, coreGlow * 0.8);

    float mouseGlow = smoothstep(0.28, 0.0, dist) * 0.22;
    color += lava1 * mouseGlow;

    float grain = snoise(st * 380.0 + t * 5.0) * 0.018;
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
        u_resolution: { value: new Vector2(
            window.innerWidth * (window.devicePixelRatio || 1),
            window.innerHeight * (window.devicePixelRatio || 1)
        ) }
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
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#0a0200' }}>
            <Canvas camera={{ position: [0, 0, 1] }} resize={{ scroll: false }}>
                <GradientMesh />
            </Canvas>
        </div>
    );
}
