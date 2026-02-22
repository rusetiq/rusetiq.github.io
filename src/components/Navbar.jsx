import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const links = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="navbar-inner">
                    <a href="#" className="navbar-brand" onClick={() => setOpen(false)}>
                        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" className="brand-mandala">
                            <circle cx="16" cy="16" r="13" stroke="#E8622A" strokeWidth="0.6" strokeDasharray="2 3" />
                            <circle cx="16" cy="16" r="8" stroke="#C9852A" strokeWidth="0.5" />
                            <circle cx="16" cy="16" r="2.5" fill="#E8622A" />
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                                <line key={i} x1={16 + 8 * Math.cos(a * Math.PI / 180)} y1={16 + 8 * Math.sin(a * Math.PI / 180)} x2={16 + 13 * Math.cos(a * Math.PI / 180)} y2={16 + 13 * Math.sin(a * Math.PI / 180)} stroke="#E8622A" strokeWidth="0.5" />
                            ))}
                        </svg>
                        <span className="brand-name">rusetiq</span>
                    </a>

                    <ul className="navbar-links">
                        {links.map((l, i) => (
                            <motion.li key={l.name} initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                                <a href={l.href} className="nav-link">{l.name}</a>
                            </motion.li>
                        ))}
                    </ul>

                    <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
                        <span /><span /><span />
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div className="mobile-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
                        <motion.div className="mobile-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45 }}>
                            <nav>
                                {links.map((l, i) => (
                                    <motion.a key={l.name} href={l.href} className="mobile-link" onClick={() => setOpen(false)}
                                        initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 + i * 0.07 }}>
                                        <span className="mobile-link-num">0{i + 1}</span>
                                        {l.name}
                                    </motion.a>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
