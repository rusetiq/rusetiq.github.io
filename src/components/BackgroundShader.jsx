import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector2 } from 'three';

const fragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

varying vec2 vUv;

// Classic Perlin/Simplex Noise implementation
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y; // Correct aspect ratio
    
    vec2 mouse = u_mouse / u_resolution.xy;
    mouse.x *= u_resolution.x / u_resolution.y; // Correct aspect ratio for mouse too
    
    // Repulsion / Expansion Effect
    // Sample from closer to the mouse to make it look like space is expanding/pushing out
    float dist = distance(st, mouse);
    vec2 dir = st - mouse;
    float repelForce = smoothstep(0.5, 0.0, dist);
    st -= normalize(dir) * repelForce * 0.2; 
    
    float time = u_time * 0.2;
    
    // Domain Warping - Creating that "Liquid Chaos" look
    vec2 q = vec2(0.);
    q.x = snoise(st + vec2(0.0, time));
    q.y = snoise(st + vec2(1.0, time));
    
    vec2 r = vec2(0.);
    r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time);
    r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time);
    
    float f = snoise(st + r);
    
    // Mouse Interaction: Highlight/Energy added to the repelled area
    // Re-calculate dist because st changed? No, use original dist for "glow" location or new?
    // Let's use the warped st for consistency or just keep it simple.
    // We already warped st, so f is warped. 
    
    float mouseEffect = smoothstep(0.2, 0.0, dist);
    f += mouseEffect * 0.2; // Just brighter center

    // Color Palette: Deep Black to High Voltage Orange
    vec3 colorBlack = vec3(0.02, 0.02, 0.02); // Almost Black
    vec3 colorDarkGrey = vec3(0.1, 0.1, 0.1); // Dark Grey
    vec3 colorOrange = vec3(1.0, 0.23, 0.0); // International Orange #FF3B00 equivalent
    
    vec3 color = mix(colorBlack, colorDarkGrey, smoothstep(0.0, 1.0, f));
    
    // Sharp Orange Highlights (Chaos Lines)
    float highlight = smoothstep(0.4, 0.45, f) - smoothstep(0.45, 0.5, f);
    color = mix(color, colorOrange, highlight);
    
    // Add noise grain
    float grain = snoise(st * 500.0 + time) * 0.08;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
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

    // Add window mouse listener to bypass any overlay issues
    useMemo(() => {
        const handleMouseMove = (e) => {
            const dpr = window.devicePixelRatio || 1;
            mouseRef.current.x = e.clientX * dpr;
            mouseRef.current.y = (window.innerHeight - e.clientY) * dpr;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_mouse: { value: new Vector2(0, 0) },
            u_resolution: { value: new Vector2(window.innerWidth * (window.devicePixelRatio || 1), window.innerHeight * (window.devicePixelRatio || 1)) }
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        const dpr = window.devicePixelRatio || 1;

        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
        mesh.current.material.uniforms.u_mouse.value.copy(mouseRef.current);

        // Update resolution in case of resize or dpr change
        if (mesh.current.material.uniforms.u_resolution.value.x !== window.innerWidth * dpr) {
            mesh.current.material.uniforms.u_resolution.value.set(window.innerWidth * dpr, window.innerHeight * dpr);
        }
    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]} scale={[20, 10, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

export default function BackgroundShader() {
    return (
        <div className="fixed inset-0 -z-50 bg-black pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }} resize={{ scroll: false }}>
                <GradientMesh />
            </Canvas>
        </div>
    );
}
