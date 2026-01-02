import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="section footer">
            <div className="footer-checkered" />

            <div className="container">
                <AnimatedSection>
                    <div className="footer-main">
                        <span className="footer-label">Start a Conversation</span>
                        <div className="footer-contacts">
                            <motion.a
                                href="mailto:aarush.uae@gmail.com"
                                className="footer-contact"
                                whileHover={{ x: 10 }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <span className="contact-text">aarush.uae@gmail.com</span>
                            </motion.a>
                            <motion.a
                                href="https://instagram.com/rusetiq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-contact"
                                whileHover={{ x: 10 }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                <span className="contact-text">@rusetiq</span>
                            </motion.a>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <div className="footer-bottom">
                        <div className="footer-links">
                            <motion.a
                                href="https://github.com/rusetiq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                                whileHover={{ color: '#FF6B00' }}
                            >
                                GitHub
                            </motion.a>
                            <span className="footer-dot" />
                            <motion.a
                                href="https://instagram.com/rusetiq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                                whileHover={{ color: '#FF6B00' }}
                            >
                                Instagram
                            </motion.a>
                            <span className="footer-dot" />
                            <motion.a
                                href="mailto:aarush.uae@gmail.com"
                                className="footer-link"
                                whileHover={{ color: '#FF6B00' }}
                            >
                                Email
                            </motion.a>
                        </div>

                        <p className="footer-credits">
                            <span className="footer-flag">🏁</span> © {currentYear} Rusetiq
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </footer>
    );
}
