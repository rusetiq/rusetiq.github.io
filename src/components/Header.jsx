import { motion } from 'framer-motion';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference pointer-events-none md:pointer-events-auto">
            <div className="flex justify-between items-center p-4 md:p-8">

                {/* Logo */}
                <motion.a
                    href="#"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative pointer-events-auto"
                >
                    <div className="bg-white px-4 py-2 skew-x-[-12deg] group-hover:bg-primary transition-colors">
                        <span className="block font-black font-heading text-xl skew-x-[12deg] text-black tracking-tighter uppercase">
                            RUSETIQ
                        </span>
                    </div>
                </motion.a>

                {/* Nav */}
                <nav className="hidden md:flex gap-8 pointer-events-auto bg-black/50 backdrop-blur-md px-8 py-2 border border-white/20 rounded-full">
                    {['Services', 'About', 'Contact'].map((item, i) => (
                        <a
                            key={i}
                            href={`#${item.toLowerCase()}`}
                            className="font-mono text-xs uppercase text-white hover:text-primary transition-colors tracking-widest relative group"
                        >
                            {`//0${i + 1}_${item}`}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <motion.a
                    href="#contact"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pointer-events-auto group overflow-hidden border border-white px-6 py-2 relative"
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 mix-blend-difference" />
                    <span className="relative font-mono text-xs font-bold text-white group-hover:text-black uppercase mix-blend-difference">
                        Start_Project
                    </span>
                </motion.a>
            </div>
        </header>
    );
}
