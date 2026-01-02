import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import './GitHub.css';

export default function GitHub() {
    return (
        <section id="github" className="section github">
            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <span className="section-index">03</span>
                        <div>
                            <div className="retro-line" />
                            <h2 className="heading-lg">GitHub</h2>
                            <span className="section-subtitle">// WITH GREAT CODE COMES GREAT RESPONSIBILITY</span>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <motion.a
                        href="https://github.com/rusetiq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-card"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="github-card-glow" />

                        {/* Web pattern corner - subtle Spider-Man */}
                        <div className="github-web-corner" />

                        <div className="github-card-content">
                            <div className="github-avatar">
                                <motion.div
                                    className="avatar-ring"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="avatar-inner">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="github-info">
                                <span className="github-label">Open Source</span>
                                <span className="github-username">@rusetiq</span>
                                <span className="github-desc">Explore my repositories and contributions</span>
                            </div>

                            <motion.div
                                className="github-arrow"
                                animate={{ x: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Racing stripe bottom */}
                        <motion.div
                            className="github-stripe"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.a>
                </AnimatedSection>
            </div>
        </section>
    );
}
