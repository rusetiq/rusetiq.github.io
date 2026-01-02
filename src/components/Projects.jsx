import { motion, useMotionValue, useSpring } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import './Projects.css';

const projects = [
    {
        id: 1,
        title: 'DANAI',
        description: 'Interactive React application with modern design and smooth animations.',
        tech: 'React',
        liveUrl: 'https://rusetiq.github.io/danai/',
        githubUrl: 'https://github.com/rusetiq/danai/',
        lap: 'P1'
    },
    {
        id: 2,
        title: 'NAFIRA',
        description: 'Full-stack application built with React frontend and Node.js backend.',
        tech: 'React • Node.JS',
        liveUrl: 'https://nafira.vercel.app/',
        githubUrl: 'https://github.com/rusetiq/nafira/',
        lap: 'P2'
    },
    {
        id: 3,
        title: 'RTQOS',
        description: 'Custom handmade operating system built from scratch.',
        tech: 'C • Assembly',
        liveUrl: null,
        githubUrl: 'https://github.com/rusetiq/rtqos/',
        lap: 'P3'
    },
    {
        id: 4,
        title: 'DISHKPLATFORM',
        description: 'Comprehensive platform developed using Django framework.',
        tech: 'Django',
        liveUrl: null,
        githubUrl: 'https://github.com/rusetiq/dishkplatform/',
        lap: 'P4'
    }
];

function ProjectCard({ project, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 20 });
    const springY = useSpring(y, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / 20);
        y.set((e.clientY - centerY) / 20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.article
            className="project-card"
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="project-glow" />

            {/* F1 position indicator */}
            <div className="project-position">
                {project.lap}
                {/* Racing helmet icon for P1 */}
                {project.lap === 'P1' && (
                    <svg className="position-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C7 2 3 6 3 11v6c0 2 1 3 3 3h2c1 0 2-1 2-2v-4c0-1-1-2-2-2H6c0-3.3 2.7-6 6-6s6 2.7 6 6h-2c-1 0-2 1-2 2v4c0 1 1 2 2 2h2c2 0 3-1 3-3v-6c0-5-4-9-9-9z" />
                    </svg>
                )}
            </div>

            <div className="project-header">
                <span className="project-index">{project.lap}</span>
                <span className="project-tech">{project.tech}</span>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-links">
                {project.liveUrl && (
                    <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ x: 5 }}
                    >
                        <span>Live</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </motion.a>
                )}
                <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ x: 5 }}
                >
                    <span>Code</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </motion.a>
            </div>

            {/* Bottom racing stripe */}
            <motion.div
                className="project-stripe"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.article>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="section projects">
            {/* Tougher background */}
            <div className="section-bg-pattern" />

            {/* Vertical racing line */}
            <div className="section-racing-line" />

            {/* Floating F1 wheel icon */}
            <motion.div
                className="section-float-icon icon-speedometer"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            </motion.div>

            <div className="container">
                <AnimatedSection>
                    <div className="section-header">
                        <span className="section-index">01</span>
                        <div>
                            <div className="retro-line" />
                            <h2 className="heading-lg">Projects</h2>
                            <span className="section-subtitle">// PORTFOLIO LAP TIMES</span>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
