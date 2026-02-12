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
                    className="group relative pointer-events-auto z-50"
                >
                    <div className="bg-white px-4 py-2 skew-x-[-12deg] group-hover:bg-primary transition-colors">
                        <span className="block font-black font-heading text-xl skew-x-[12deg] text-black tracking-tighter uppercase">
                            RUSETIQ
                        </span>
                    </div>
                </motion.a>

            </div>
        </header>
    );
}
