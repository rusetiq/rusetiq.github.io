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
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse / u_resolution.xy;
    mouse.x *= u_resolution.x / u_resolution.y;

    float dist = distance(st, mouse);
    vec2 dir = normalize(st - mouse + vec2(0.001));
    float repel = smoothstep(0.45, 0.0, dist);
    st -= dir * repel * 0.15;

    float t = u_time * 0.15;

    vec2 q;
    q.x = snoise(st + vec2(0.0, t));
    q.y = snoise(st + vec2(1.0, t));

    vec2 r;
    r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.12 * t);
    r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.10 * t);

    float f = snoise(st + r);

    float mouseGlow = smoothstep(0.25, 0.0, dist) * 0.15;
    f += mouseGlow;

    vec3 deepBlack  = vec3(0.035, 0.020, 0.007);
    vec3 warmDark   = vec3(0.08,  0.045, 0.015);
    vec3 burnOrange = vec3(0.91,  0.38,  0.10);
    vec3 deepGold   = vec3(0.78,  0.56,  0.16);

    float t1 = smoothstep(-0.3, 0.8, f);
    vec3 color = mix(deepBlack, warmDark, t1);

    float highlight = smoothstep(0.38, 0.44, f) - smoothstep(0.44, 0.50, f);
    color = mix(color, burnOrange * 0.6, highlight * 0.9);

    float goldLayer = smoothstep(0.5, 0.55, f) - smoothstep(0.55, 0.6, f);
    color = mix(color, deepGold * 0.4, goldLayer * 0.7);

    float grain = snoise(st * 400.0 + t) * 0.04;
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
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#0a0602' }}>
            <Canvas camera={{ position: [0, 0, 1] }} resize={{ scroll: false }}>
                <GradientMesh />
            </Canvas>
        </div>
    );
}
