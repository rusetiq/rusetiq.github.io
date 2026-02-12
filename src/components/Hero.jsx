import { motion } from 'framer-motion';
import { useState } from 'react';

const GlitchText = ({ text }) => {
    return (
        <div className="relative inline-block group cursor-none">
            <span className="relative z-10 group-hover:text-primary transition-colors duration-100 mix-blend-difference">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-all duration-75 select-none">{text}</span>
            <span className="absolute top-0 left-0 -z-20 w-full h-full text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-75 select-none">{text}</span>
        </div>
    );
};

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center bg-transparent">

            {/* Background Marquee / Noise */}
            <div className="absolute top-1/4 -left-20 -rotate-12 opacity-10 whitespace-nowrap pointer-events-none select-none">
                <h1 className="text-[17vw] md:text-[20vw] font-black font-heading text-transparent text-stroke-orange leading-none">
                    MAXIMALIST CHAOS DESIGN SYSTEM
                </h1>
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-12 flex flex-col items-start">
                {/* Main Headline */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                >
                    <h1 className="text-[15vw] md:text-[11rem] font-display font-black leading-[0.85] tracking-tighter text-white mix-blend-exclusion break-words">
                        AARUSH<br />
                        <span className="italic font-serif text-transparent text-stroke hover:text-white transition-colors duration-300">DIWAKAR<span className="text-primary"></span></span>
                    </h1>
                </motion.div>

                {/* Subheadline + CTA */}
                <div className="mt-8 md:mt-12 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-xl"
                    >
                        <p className="font-mono text-sm md:text-lg text-gray-400 border-l-2 border-primary pl-4 md:pl-6 py-2">
                            BACKEND ENGINEERING. <span className="bg-primary text-black px-1 font-bold">CLEAN WEB.</span> EXPERIMENTAL AI.
                            <br />
                            SQUEEZING MAXIMUM PERFORMANCE FROM MINIMAL HARDWARE.
                        </p>
                    </motion.div>

                    <motion.a
                        href="#contact"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: 0.6 }}
                        className="group relative px-8 py-4 md:px-12 md:py-6 bg-black border-2 border-white hover:bg-primary hover:border-primary transition-all duration-300 w-full md:w-auto text-center"
                    >
                        <span className="relative z-10 font-heading font-black text-xl md:text-2xl uppercase text-white group-hover:text-black tracking-wide">
                            CONTACT ME -&gt;
                        </span>
                        {/* Brutalist Shadow */}
                        <div className="absolute top-2 left-2 w-full h-full bg-primary -z-10 group-hover:top-0 group-hover:left-0 transition-all duration-300" />
                    </motion.a>
                </div>
            </div>

            {/* Random Floating Elements */}
            <div className="absolute bottom-12 right-12 hidden md:block">
                <div className="font-mono text-xs text-right space-y-1 text-primary">
                    <p>COORD: 24.4512° N, 54.397° E</p>
                    <p>LAST UPDATED: 12/02/2026</p>
                    <p>MADE WITH 🩷 BY RUSETIQ</p>
                </div>
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute top-0 right-1/4 w-px h-full bg-white/10 pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-white/10 pointer-events-none" />

        </section>
    );
}
