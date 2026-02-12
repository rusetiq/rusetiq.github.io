import { motion } from 'framer-motion';

const marqueeVariants = {
    animate: {
        x: [0, -1000],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
            },
        },
    },
};

export default function Footer() {
    return (
        <footer id="contact" className="relative bg-black text-white pt-24 pb-12 overflow-hidden border-t-8 border-primary">

            {/* Massive Marquee */}
            <div className="relative py-8 bg-primary -rotate-2 scale-110 mb-24 border-y-4 border-black">
                <div className="flex overflow-hidden whitespace-nowrap">
                    <motion.div
                        className="flex gap-4 items-center"
                        variants={marqueeVariants}
                        animate="animate"
                    >
                        {[...Array(8)].map((_, i) => (
                            <span key={i} className="text-8xl md:text-[10rem] font-black font-heading text-black uppercase leading-none px-4">
                                LET'S BUILD THE FUTURE —
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">

                {/* Contact Left */}
                <div>
                    <h3 className="text-sm font-mono text-gray-500 mb-8 uppercase tracking-widest border-b border-gray-800 pb-2">Initiate Contact</h3>
                    <a href="mailto:aarush.uae@gmail.com" className="block text-4xl md:text-6xl font-bold font-heading hover:text-primary transition-colors break-words">
                        aarush.uae@gmail.com
                    </a>
                    <div className="mt-8 flex gap-4">
                        <a href="#" className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors font-mono uppercase text-sm">Twitter_X</a>
                        <a href="#" className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors font-mono uppercase text-sm">LinkedIn</a>
                        <a href="https://instagram.com/rusetiq" className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors font-mono uppercase text-sm">Instagram</a>
                    </div>
                </div>

                {/* Info Right */}
                <div className="flex flex-col justify-end items-end text-right">
                    <p className="text-8xl font-black font-heading text-primary opacity-20 select-none">
                        RW/24
                    </p>
                    <p className="font-mono text-gray-500 max-w-sm mt-4">
                        Rusetiq Agency defines the cutting edge of AI implementation.
                        We don't follow trends; we engineer the systems that set them.
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto px-4 md:px-12 flex justify-between items-end border-t border-gray-900 pt-8">
                <div>
                    <h1 className="text-[12vw] font-black font-display leading-[0.75] text-white select-none pointer-events-none mix-blend-exclusion">
                        RUSETIQ
                    </h1>
                </div>
                <div className="hidden md:block pb-2">
                    <p className="font-mono text-xs text-gray-600 uppercase">
                        © {new Date().getFullYear()} Rusetiq Systems.<br />All Rights Reserved.
                    </p>
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </footer>
    );
}
