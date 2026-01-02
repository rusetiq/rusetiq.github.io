import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import './About.css';

export default function About() {
    const bio = "I'm a developer focused on backend engineering, clean web experiences, performance tuning, and experimental AI/ML projects.";

    return (
        <section id="about" className="section about">
            {/* Tougher background */}
            <div className="about-bg-pattern" />

            {/* Stranger Things light leak */}
            <div className="about-light-leak" />

            {/* Floating Stranger Things icons */}
            <motion.div
                className="section-float-icon icon-dimension"
                animate={{
                    rotate: [0, 180, 360],
                    opacity: [0.03, 0.06, 0.03]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="8" x2="22" y2="16" />
                    <line x1="22" y1="8" x2="2" y2="16" />
                </svg>
            </motion.div>

            <motion.div
                className="section-float-icon icon-portal"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.02, 0.05, 0.02]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                </svg>
            </motion.div>

            <div className="container">
                <div className="about-layout">
                    <AnimatedSection className="about-left">
                        <div className="section-header">
                            <span className="section-index">02</span>
                            <div>
                                <div className="retro-line" />
                                <h2 className="heading-lg">About</h2>
                                <span className="section-subtitle">// THE UPSIDE DOWN... OF CODE</span>
                            </div>
                        </div>
                    </AnimatedSection>

                    <div className="about-right">
                        <AnimatedSection delay={0.1}>
                            <p className="about-bio">{bio}</p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="skills-container">
                                <h3 className="skills-title">TECH STACK</h3>
                                <div className="skills-list">
                                    {[
                                        { name: 'Python', category: 'backend', icon: '🐍' },
                                        { name: 'Django', category: 'backend', icon: '🎸' },
                                        { name: 'Flask', category: 'backend', icon: '⚗️' },
                                        { name: 'Node.js', category: 'backend', icon: '💚' },
                                        { name: 'React', category: 'frontend', icon: '⚛️' },
                                        { name: 'JavaScript', category: 'frontend', icon: '⚡' },
                                        { name: 'AI/ML', category: 'other', icon: '🤖' },
                                    ].map((skill, i) => (
                                        <motion.span
                                            key={skill.name}
                                            className={`skill-tag skill-${skill.category}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.05 }}
                                            whileHover={{ y: -3, scale: 1.05 }}
                                        >
                                            <span className="skill-icon">{skill.icon}</span>
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <div className="about-stats">
                                <div className="stat-item">
                                    <span className="stat-value">421,964</span>
                                    <span className="stat-label">LINES OF CODE</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">182</span>
                                    <span className="stat-label">CANS OF DIET COKE</span>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
