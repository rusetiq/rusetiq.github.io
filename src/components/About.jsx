import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: 'Python', tier: 'core' }, { name: 'Flask', tier: 'core' }, { name: 'Django', tier: 'core' },
    { name: 'Node.js', tier: 'core' }, { name: 'React', tier: 'frontend' }, { name: 'JavaScript', tier: 'frontend' },
    { name: 'AI / ML', tier: 'research' }, { name: 'NumPy', tier: 'research' },
];
const tierColor = { core: '#E8622A', frontend: '#C9852A', research: '#9B3A1A' };

function CountUp({ to, suffix = '', duration = 1800 }) {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true;
                const begin = Date.now();
                const tick = () => {
                    const p = Math.min((Date.now() - begin) / duration, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    setVal(Math.floor(eased * to));
                    if (p < 1) requestAnimationFrame(tick);
                    else setVal(to);
                };
                requestAnimationFrame(tick);
                obs.disconnect();
            }
        }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [to, duration]);
    return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const Lotus = () => (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
        {[0, 60, 120, 180, 240, 300].map((a, i) => {
            const x = 27 + 11 * Math.cos(a * Math.PI / 180), y = 27 + 11 * Math.sin(a * Math.PI / 180);
            return <ellipse key={i} cx={x} cy={y} rx="8" ry="4" transform={`rotate(${a},${x},${y})`} stroke="#E8622A" strokeWidth="0.6" fill="rgba(232,98,42,0.05)" />;
        })}
        <circle cx="27" cy="27" r="6" stroke="#C9852A" strokeWidth="0.6" fill="rgba(201,133,42,0.1)" />
        <circle cx="27" cy="27" r="2.5" fill="#E8622A" />
    </svg>
);

export default function About() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.ga').forEach(el => {
                gsap.fromTo(el,
                    { y: 55, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.95, ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
                    }
                );
            });
            gsap.fromTo(section.querySelectorAll('.skill-chip'),
                { y: 22, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', stagger: 0.055,
                    scrollTrigger: { trigger: '.skills-grid', start: 'top 86%', toggleActions: 'play none none none' }
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="about-section dot-grid">
            <div className="about-side-line left" aria-hidden="true" />
            <div className="about-side-line right" aria-hidden="true" />
            <div className="about-container">
                <div className="section-label ga">
                    <span className="section-number">01</span>
                    <span className="section-title-tag">About</span>
                </div>
                <div className="about-layout">
                    <div className="about-left">
                        <div className="about-lotus-row">
                            <Lotus />
                            <div className="about-lotus-line" />
                        </div>
                        <h2 className="about-heading ga">
                            Crafting code<br /><em>with intention</em>
                        </h2>
                        <div className="about-divider" />
                        <div className="about-stats ga">
                            <div className="stat">
                                <span className="stat-val"><CountUp to={421000} suffix="+" /></span>
                                <span className="stat-lbl">Lines of Code</span>
                            </div>
                            <div className="stat-sep" />
                            <div className="stat">
                                <span className="stat-val"><CountUp to={182} /></span>
                                <span className="stat-lbl">Cans of Diet Coke</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-right">
                        <p className="about-bio ga">
                            I'm a developer focused on <strong>backend engineering</strong>, clean web experiences,
                            performance tuning, and experimental AI/ML projects. I build NumPy-only LLMs,
                            squeeze performance from lean hardware, and architect APIs that scale.
                        </p>
                        <div className="skills-section">
                            <h3 className="skills-heading ga"><span className="skills-dash">—</span> Tech Stack</h3>
                            <div className="skills-grid">
                                {skills.map(s => (
                                    <span key={s.name} className="skill-chip" style={{ '--c': tierColor[s.tier] }}>{s.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
