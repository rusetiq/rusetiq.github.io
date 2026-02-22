import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundShader from './BackgroundShader';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.35 } } };
const item = { hidden: { y: 44, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } };

const Ornament = () => (
    <svg className="ornament-svg" viewBox="0 0 400 32" fill="none">
        <line x1="0" y1="16" x2="155" y2="16" stroke="url(#og1)" strokeWidth="0.5" />
        <g transform="translate(200,16)">
            <circle r="2" fill="#E8622A" />
            <circle r="7" stroke="#E8622A" strokeWidth="0.5" fill="none" />
            <circle r="13" stroke="#C9852A" strokeWidth="0.4" fill="none" strokeDasharray="2 3" />
            <circle r="19" stroke="#E8622A" strokeWidth="0.3" fill="none" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                <line key={i} x1={7 * Math.cos(a * Math.PI / 180)} y1={7 * Math.sin(a * Math.PI / 180)} x2={13 * Math.cos(a * Math.PI / 180)} y2={13 * Math.sin(a * Math.PI / 180)} stroke="#C9852A" strokeWidth="0.45" />
            ))}
        </g>
        <line x1="245" y1="16" x2="400" y2="16" stroke="url(#og2)" strokeWidth="0.5" />
        <defs>
            <linearGradient id="og1" x1="0" y1="0" x2="155" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8622A" stopOpacity="0" /><stop offset="1" stopColor="#C9852A" />
            </linearGradient>
            <linearGradient id="og2" x1="0" y1="0" x2="155" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9852A" /><stop offset="1" stopColor="#E8622A" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

const Yantra = () => {
    const r = 160;
    const cx = 200, cy = 200;
    const pts = (n, rad, offset = 0) => Array.from({ length: n }, (_, i) => {
        const a = (i * 360 / n + offset) * Math.PI / 180;
        return `${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a)}`;
    });
    const upTri = `${cx},${cy - 110} ${cx + 95.3},${cy + 55} ${cx - 95.3},${cy + 55}`;
    const downTri = `${cx},${cy + 110} ${cx + 95.3},${cy - 55} ${cx - 95.3},${cy - 55}`;
    return (
        <svg className="hero-yantra" viewBox="0 0 400 400" fill="none">
            <circle cx={cx} cy={cy} r="185" stroke="#E8622A" strokeWidth="0.4" fill="none" strokeDasharray="3 6" />
            <circle cx={cx} cy={cy} r="168" stroke="#C9852A" strokeWidth="0.3" fill="none" />
            {pts(12, 155).map((p, i) => {
                const [x, y] = p.split(',').map(Number);
                const a = i * 30 * Math.PI / 180;
                return <ellipse key={i} cx={x} cy={y} rx="18" ry="7" transform={`rotate(${i * 30},${x},${y})`} stroke="#E8622A" strokeWidth="0.4" fill="rgba(232,98,42,0.04)" />;
            })}
            <polygon points={upTri} stroke="#E8622A" strokeWidth="0.5" fill="rgba(232,98,42,0.04)" />
            <polygon points={downTri} stroke="#C9852A" strokeWidth="0.5" fill="rgba(201,133,42,0.03)" />
            <circle cx={cx} cy={cy} r="80" stroke="#E8622A" strokeWidth="0.4" fill="none" strokeDasharray="2 4" />
            {pts(8, 65).map((p, i) => {
                const [x, y] = p.split(',').map(Number);
                const a = i * 45 * Math.PI / 180;
                return <ellipse key={i} cx={x} cy={y} rx="22" ry="9" transform={`rotate(${i * 45},${x},${y})`} stroke="#C9852A" strokeWidth="0.45" fill="rgba(201,133,42,0.05)" />;
            })}
            <circle cx={cx} cy={cy} r="38" stroke="#C9852A" strokeWidth="0.45" fill="none" />
            <circle cx={cx} cy={cy} r="22" stroke="#E8622A" strokeWidth="0.5" fill="rgba(232,98,42,0.07)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                <line key={i} x1={cx + 22 * Math.cos(a * Math.PI / 180)} y1={cy + 22 * Math.sin(a * Math.PI / 180)} x2={cx + 38 * Math.cos(a * Math.PI / 180)} y2={cy + 38 * Math.sin(a * Math.PI / 180)} stroke="#E8622A" strokeWidth="0.4" />
            ))}
            <circle cx={cx} cy={cy} r="5" fill="#E8622A" fillOpacity="0.8" />
        </svg>
    );
};

export default function Hero() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;
        if (!section || !content) return;
        const ctx = gsap.context(() => {
            gsap.to(content, {
                yPercent: -14, opacity: 0.15, ease: 'none',
                scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1.2 },
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="hero-section">
            <BackgroundShader />
            <Yantra />
            <div className="hero-deva" aria-hidden="true">आरुष</div>

            <motion.div ref={contentRef} className="hero-content" variants={wrap} initial="hidden" animate="show">
                <motion.div variants={item} className="hero-eyebrow">
                    <span className="hero-badge">Backend Engineer · AI/ML · Open Source</span>
                </motion.div>

                <motion.div variants={item}><Ornament /></motion.div>

                <motion.h1 className="hero-name" variants={item} style={{ lineHeight: 0.5 }}>
                    <em>
                        <span style={{ color: '#fff' }}>aarush</span>
                        <br />
                        diwakar
                    </em>
                </motion.h1>

                <motion.div variants={item}><Ornament /></motion.div>

                <motion.p variants={item} className="hero-tagline">
                    Building backends with precision.<br />Crafting intelligence from scratch.
                </motion.p>

                <motion.div variants={item} className="hero-actions">
                    <a href="#projects" className="btn-primary">View Work</a>
                    <a href="#contact" className="btn-secondary">Get in Touch</a>
                </motion.div>

                <motion.div variants={item} className="hero-meta">
                    <span>24.4512° N</span>
                    <span className="hero-meta-dot" />
                    <span>54.397° E</span>
                    <span className="hero-meta-dot" />
                    <span>Abu Dhabi</span>
                </motion.div>
            </motion.div>

            <div className="hero-scroll" aria-hidden="true">
                <motion.div className="hero-scroll-line" animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
            </div>
        </section>
    );
}
