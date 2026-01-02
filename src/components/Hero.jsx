import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import './Hero.css';

export default function Hero() {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 30 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);

    const handleMouseMove = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const letterVariants = {
        hidden: { y: 120, opacity: 0, rotateX: -90 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                delay: 0.3 + i * 0.06,
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    const name = "RUSETIQ";

    return (
        <section
            ref={containerRef}
            className="hero"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Tougher background pattern */}
            <div className="hero-bg-pattern" />
            <div className="hero-noise" />

            {/* Racing stripes - F1/GT reference */}
            <div className="racing-stripe" style={{ left: '8%' }} />
            <div className="racing-stripe" style={{ left: '10%', opacity: 0.04 }} />
            <div className="racing-stripe" style={{ right: '8%' }} />
            <div className="racing-stripe" style={{ right: '10%', opacity: 0.04 }} />

            {/* Pop culture floating icons */}
            <div className="floating-icons">
                {/* Spider-Man web */}
                <motion.div
                    className="floating-icon icon-web"
                    animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2v20M2 12h20M12 12L4 4M12 12L20 4M12 12L4 20M12 12L20 20" />
                        <circle cx="12" cy="12" r="5" />
                    </svg>
                </motion.div>

                {/* F1 Flag */}
                <motion.div
                    className="floating-icon icon-flag"
                    animate={{ y: [5, -5, 5], rotate: [-3, 3, -3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 2v20h2v-8h12l-2-4 2-4H6V2H4z" />
                    </svg>
                </motion.div>

                {/* Stranger Things style star */}
                <motion.div
                    className="floating-icon icon-star"
                    animate={{
                        y: [-8, 8, -8],
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
                    </svg>
                </motion.div>

                {/* Racing wheel - GT */}
                <motion.div
                    className="floating-icon icon-wheel"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="4" />
                        <line x1="12" y1="2" x2="12" y2="8" />
                        <line x1="12" y1="16" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="8" y2="12" />
                        <line x1="16" y1="12" x2="22" y2="12" />
                    </svg>
                </motion.div>

                {/* Lightning bolt - Stranger Things */}
                <motion.div
                    className="floating-icon icon-bolt"
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
                    </svg>
                </motion.div>
            </div>

            {/* Animated gradient orbs */}
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />

            {/* Grid pattern */}
            <div className="hero-grid" />

            <motion.div
                className="hero-content"
                style={{ rotateX, rotateY, transformPerspective: 1200 }}
            >


                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Aarush Diwakar
                </motion.p>

                <h1 className="hero-title">
                    {name.split('').map((letter, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className="hero-letter"
                            whileHover={{
                                scale: 1.2,
                                color: '#FF6B00',
                                textShadow: '0 0 60px rgba(255, 107, 0, 0.8)',
                                transition: { duration: 0.1 }
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    className="hero-tagline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <span className="tagline-item">BACKEND</span>
                    <span className="tagline-separator" />
                    <span className="tagline-item">WEB</span>
                    <span className="tagline-separator" />
                    <span className="tagline-item">AI/ML</span>
                </motion.p>

                {/* Speed indicator - F1 telemetry */}
                <motion.div
                    className="speed-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                >
                    <span className="speed-label">SECTOR</span>
                    <div className="speed-bars">
                        <motion.div
                            className="speed-bar"
                            animate={{ scaleY: [0.3, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                            className="speed-bar"
                            animate={{ scaleY: [0.5, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                            className="speed-bar"
                            animate={{ scaleY: [1, 0.5, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="hero-cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                >
                    <a href="#projects" className="btn">
                        <span>Explore Projects</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <motion.div
                    className="scroll-line"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Stranger Things style flickering edges */}
            <div className="edge-glow edge-glow-left" />
            <div className="edge-glow edge-glow-right" />
        </section>
    );
}
