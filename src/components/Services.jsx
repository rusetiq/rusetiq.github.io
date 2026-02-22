import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        num: '01',
        title: 'Backend & APIs',
        desc: 'Flask, Django, RESTful APIs, Gunicorn. Worker & thread optimization — getting the most out of every millisecond.',
    },
    {
        num: '02',
        title: 'Experimental AI',
        desc: 'NumPy-only LLMs with continuous learning and persistent state tracking. No frameworks, just pure math.',
    },
    {
        num: '03',
        title: 'Web Engineering',
        desc: 'Location-aware features, OCR pipelines, and clean data-driven interfaces built on React and Node.',
    },
];

const PaisleyMotif = () => (
    <svg className="paisley-motif" viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="55" rx="16" ry="28" stroke="#E8622A" strokeWidth="0.5" fill="rgba(232,98,42,0.03)" />
        <ellipse cx="40" cy="48" rx="8" ry="14" stroke="#C9922A" strokeWidth="0.5" fill="rgba(201,146,42,0.04)" />
        <circle cx="40" cy="30" r="4" stroke="#E8622A" strokeWidth="0.5" fill="rgba(232,98,42,0.06)" />
        <path d="M40 26 Q48 18 56 24 Q60 30 54 36 Q48 40 40 34" stroke="#C9922A" strokeWidth="0.4" fill="none" />
    </svg>
);

export default function Services() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const header = section.querySelector('.services-header');
            if (header) {
                gsap.fromTo(header,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.9, ease: 'power3.out',
                        scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' },
                    }
                );
            }

            const rows = section.querySelectorAll('.service-row');
            rows.forEach((row, i) => {
                gsap.fromTo(row,
                    { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        duration: 0.85, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 87%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} className="services-section">
            <div className="services-container">
                <div className="services-header">
                    <div className="services-header-left">
                        <div className="section-label">
                            <span className="section-number">03</span>
                            <span className="section-title-tag">Services</span>
                        </div>
                        <h2 className="services-heading">
                            What I<br /><em>do best</em>
                        </h2>
                    </div>
                    <PaisleyMotif />
                </div>

                <div className="services-ornament-line" aria-hidden="true" />

                <div className="services-list">
                    {services.map((service, i) => (
                        <div key={i} className="service-row">
                            <span className="service-num">{service.num}</span>
                            <div className="service-body">
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-desc">{service.desc}</p>
                            </div>
                            <svg className="service-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
