import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: 'DANAI',
        description: 'Interactive React application with modern design and smooth animations.',
        tech: ['React'],
        liveUrl: 'https://rusetiq.github.io/danai/',
        githubUrl: 'https://github.com/rusetiq/danai/',
    },
    {
        id: 2,
        title: 'NAFIRA',
        description: 'Full-stack application with React frontend and Node.js backend.',
        tech: ['React', 'Node.js'],
        liveUrl: 'https://nafira.vercel.app/',
        githubUrl: 'https://github.com/rusetiq/nafira/',
    },
    {
        id: 3,
        title: 'RTQOS',
        description: 'Custom operating system built from scratch with a GUI and working kernel.',
        tech: ['C', 'Assembly'],
        liveUrl: null,
        githubUrl: 'https://github.com/rusetiq/rtqos/',
    },
    {
        id: 4,
        title: 'DISHKPLATFORM',
        description: 'Comprehensive platform developed using the Django framework.',
        tech: ['Django'],
        liveUrl: null,
        githubUrl: 'https://github.com/rusetiq/dishkplatform/',
    },
];

export default function Projects() {
    const sectionRef = useRef(null);
    const pinWrapRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const pinWrap = pinWrapRef.current;
        const track = trackRef.current;
        if (!section || !pinWrap || !track) return;

        const isMobile = window.innerWidth <= 768;
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const introEls = section.querySelectorAll('.gsap-up');
            gsap.fromTo(introEls,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.9, ease: 'power3.out',
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: section.querySelector('.projects-intro'),
                        start: 'top 82%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            const totalWidth = track.scrollWidth - pinWrap.offsetWidth;

            gsap.to(track, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: pinWrap,
                    start: 'top top',
                    end: () => `+=${totalWidth + window.innerWidth * 0.4}`,
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="projects-section">
            <div className="projects-intro">
                <div className="section-label gsap-up">
                    <span className="section-number">02</span>
                    <span className="section-title-tag">Selected Work</span>
                </div>
                <h2 className="projects-heading gsap-up">
                    Things I've<br /><em>built</em>
                </h2>
            </div>

            <div ref={pinWrapRef} className="projects-pin-wrap">
                <div ref={trackRef} className="projects-track">
                    {projects.map((project) => (
                        <article key={project.id} className="project-card">
                            <div className="project-card-top">
                                <span className="project-index">0{project.id}</span>
                                <div className="project-tech-row">
                                    {project.tech.map(t => (
                                        <span key={t} className="project-tech-tag">{t}</span>
                                    ))}
                                </div>
                            </div>

                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>

                            <div className="project-card-footer">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link primary">
                                        Live
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </a>
                                )}
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                    Code
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </a>
                            </div>

                            <div className="project-card-accent" aria-hidden="true" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
