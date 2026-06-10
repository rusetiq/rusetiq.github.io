import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: 'DISHKV2',
        description: 'Real-time, interactive LeetCode-style hackathon platform built with Python and Django.',
        tech: ['Python', 'Django'],
        liveUrl: null,
        githubUrl: 'https://github.com/rusetiq/dishkv2',
    },
    {
        id: 2,
        title: 'RTQOS',
        description: 'Custom operating system built from scratch with a GUI and working kernel.',
        tech: ['C', 'Assembly'],
        liveUrl: null,
        githubUrl: 'https://github.com/rusetiq/rtqos/',
    },
    {
        id: 3,
        title: 'RTQCODE',
        description: 'AI coding assistant in your terminal, built with python.',
        tech: ['Python', 'AI'],
        liveUrl: null,
        githubUrl: 'https://github.com/rusetiq/rtqcode/',
    },
    {
        id: 4,
        title: 'NAFIRA',
        description: 'Full-stack application with React frontend and Node.js backend.',
        tech: ['React', 'Node.js'],
        liveUrl: 'https://nafira.vercel.app/',
        githubUrl: 'https://github.com/rusetiq/nafira/',
    },
];

export default function Projects() {
    const sectionRef = useRef(null);
    const pinWrapRef = useRef(null);
    const cardRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const pinWrap = pinWrapRef.current;
        if (!section || !pinWrap) return;

        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            cardRefs.current.forEach(c => c && c.classList.add('is-active'));
            return;
        }

        const total = projects.length;
        const stepSize = window.innerHeight * 0.85;

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

            ScrollTrigger.create({
                trigger: pinWrap,
                start: 'top top',
                end: () => `+=${stepSize * total}`,
                pin: true,
                anticipatePin: 1,
                scrub: false,
                onUpdate: (self) => {
                    const raw = self.progress * total;
                    const idx = Math.min(Math.floor(raw + 0.15), total - 1);
                    setActiveIndex(idx);

                    cardRefs.current.forEach((card, i) => {
                        if (!card) return;
                        if (i === idx) {
                            card.classList.add('is-active');
                        } else {
                            card.classList.remove('is-active');
                        }
                    });
                },
            });

            if (cardRefs.current[0]) {
                cardRefs.current[0].classList.add('is-active');
            }
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
                <div className="projects-track">
                    {projects.map((project, i) => (
                        <article
                            key={project.id}
                            ref={el => cardRefs.current[i] = el}
                            className="project-card"
                        >
                            <div className="project-card-top">
                                <div className="project-tech-row">
                                    {project.tech.map(t => (
                                        <span key={t} className="project-tech-tag">{t}</span>
                                    ))}
                                </div>
                                <span className="project-index">0{project.id}</span>
                            </div>

                            <h3 className="project-title">{project.title}</h3>
                            <div className="project-title-rule" aria-hidden="true" />
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

                <div className="projects-counter" aria-hidden="true">
                    {projects.map((_, i) => (
                        <div
                            key={i}
                            className={`projects-counter-dot${i === activeIndex ? ' active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
