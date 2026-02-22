import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const IndicDivider = () => (
    <svg className="footer-divider-svg" viewBox="0 0 1200 24" fill="none" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="560" y2="12" stroke="url(#fdg1)" strokeWidth="0.5" />
        <g transform="translate(600,12)">
            <circle r="2" fill="#E8622A" />
            <circle r="7" stroke="#C9922A" strokeWidth="0.5" fill="none" />
            <circle r="12" stroke="#E8622A" strokeWidth="0.3" fill="none" strokeDasharray="2 4" />
            {[0, 60, 120, 180, 240, 300].map((a, i) => (
                <line key={i} x1={7 * Math.cos(a * Math.PI / 180)} y1={7 * Math.sin(a * Math.PI / 180)}
                    x2={12 * Math.cos(a * Math.PI / 180)} y2={12 * Math.sin(a * Math.PI / 180)}
                    stroke="#C9922A" strokeWidth="0.4" />
            ))}
        </g>
        <line x1="640" y1="12" x2="1200" y2="12" stroke="url(#fdg2)" strokeWidth="0.5" />
        <defs>
            <linearGradient id="fdg1" x1="0" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8622A" stopOpacity="0" />
                <stop offset="1" stopColor="#C9922A" />
            </linearGradient>
            <linearGradient id="fdg2" x1="0" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C9922A" />
                <stop offset="1" stopColor="#E8622A" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

export default function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;
        if (!footer) return;

        const ctx = gsap.context(() => {
            const els = footer.querySelectorAll('.gsap-reveal');
            if (!els.length) return;
            gsap.fromTo(els,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.9, ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: footer,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <footer id="contact" ref={footerRef} className="footer">
            <IndicDivider />

            <div className="footer-marquee-wrap" aria-hidden="true">
                <motion.div
                    className="footer-marquee"
                    animate={{ x: [0, -1400] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                >
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className="footer-marquee-text">Backend. Design. AI. · Let's Build · Get in Touch ·</span>
                    ))}
                </motion.div>
            </div>

            <div className="footer-body">
                <div className="gsap-reveal footer-contact">
                    <p className="footer-contact-label">Initiate Contact</p>
                    <a href="mailto:aarush.uae@gmail.com" className="footer-email">
                        aarush.uae@gmail.com
                    </a>
                    <div className="footer-links">
                        <a href="https://github.com/rusetiq" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                        <span className="footer-link-sep">·</span>
                        <a href="https://instagram.com/rusetiq" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
                    </div>
                </div>

                <div className="gsap-reveal footer-identity">
                    <h1 className="footer-name">rusetiq</h1>
                    <p className="footer-tagline">
                        Developer focused on backend engineering,<br />
                        clean web experiences, and experimental AI.
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-copy">Made with <span style={{ color: '#E8622A' }}>&hearts;</span> by Aarush Diwakar.</p>
                <p className="footer-copy footer-coords">24.4512° N, 54.397° E — Abu Dhabi</p>
            </div>
        </footer>
    );
}
