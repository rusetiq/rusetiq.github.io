import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'WORK', href: '#projects' },
        { name: 'ABOUT', href: '#about' },
        { name: 'GITHUB', href: '#github' },
        { name: 'CONTACT', href: '#contact' }
    ];

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="navbar-container">
                <a href="#" className="navbar-logo">
                    <span className="logo-text">RUSETIQ</span>
                </a>

                <ul className="navbar-links">
                    {navLinks.map((link, index) => (
                        <motion.li
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                            <a href={link.href} className="nav-link">
                                {link.name}
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
}
