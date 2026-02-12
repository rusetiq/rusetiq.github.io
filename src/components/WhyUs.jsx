import { motion } from 'framer-motion';

export default function WhyUs() {
    return (
        <section className="relative z-10 py-32 bg-primary overflow-hidden">
            {/* Massive background text */}
            <div className="absolute top-0 right-0 pointer-events-none opacity-10">
                <h1 className="text-[40vw] font-black font-heading leading-none text-black select-none -translate-y-1/3">
                    VS
                </h1>
            </div>

            <div className="relative container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black bg-white">

                {/* Legacy / Old Way */}
                <div className="p-12 md:p-24 bg-gray-100 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-black relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30 pointer-events-none" />

                    <div className="relative z-10">
                        <h3 className="text-xl font-mono text-gray-500 mb-2 uppercase tracking-widest line-through decoration-red-600 decoration-2">Legacy Operations</h3>
                        <h2 className="text-5xl md:text-7xl font-black font-heading text-gray-400 mb-12 opacity-50 group-hover:opacity-100 transition-opacity">
                            THE OLD<br />WORLD
                        </h2>

                        <ul className="space-y-6 font-mono text-gray-500">
                            <li className="flex items-center gap-4 group-hover:text-red-600 transition-colors">
                                <span className="text-2xl">×</span> STATIC DELIVERABLES
                            </li>
                            <li className="flex items-center gap-4 group-hover:text-red-600 transition-colors">
                                <span className="text-2xl">×</span> HUMAN BOTTLENECKS
                            </li>
                            <li className="flex items-center gap-4 group-hover:text-red-600 transition-colors">
                                <span className="text-2xl">×</span> 9-5 AVAILABILITY
                            </li>
                        </ul>
                    </div>

                    <div className="mt-12 opacity-20">
                        <p className="font-mono text-xs text-justify break-all">
                            ERROR_404_INNOVATION_NOT_FOUND_SYSTEM_FAILURE_RETRY_ABORT_FAIL_FAIL_FAIL_FAIL_FAIL
                        </p>
                    </div>
                </div>

                {/* AI / Your Way */}
                <div className="p-12 md:p-24 bg-black text-white flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

                    <div className="relative z-10">
                        <h3 className="text-xl font-mono text-primary mb-2 uppercase tracking-widest group-hover:text-black">Next Gen Protocol</h3>
                        <h2 className="text-5xl md:text-7xl font-black font-heading text-white mb-12 group-hover:text-black transition-colors">
                            AI FIRST<br />SYSTEMS
                        </h2>

                        <ul className="space-y-6 font-mono">
                            <li className="flex items-center gap-4 group-hover:text-black transition-colors">
                                <span className="text-primary text-2xl group-hover:text-black">●</span> SELF-LEARNING
                            </li>
                            <li className="flex items-center gap-4 group-hover:text-black transition-colors">
                                <span className="text-primary text-2xl group-hover:text-black">●</span> AUTONOMOUS AGENTS
                            </li>
                            <li className="flex items-center gap-4 group-hover:text-black transition-colors">
                                <span className="text-primary text-2xl group-hover:text-black">●</span> INFINITE SCALE
                            </li>
                        </ul>
                    </div>

                    <div className="mt-12 group-hover:text-black transition-colors">
                        <div className="w-full h-2 bg-white/20 overflow-hidden relative">
                            <div className="absolute top-0 left-0 h-full w-full bg-primary group-hover:bg-black animate-progress-indeterminate" />
                        </div>
                        <p className="font-mono text-xs mt-2 text-right">OPTIMIZATION: 100%</p>
                    </div>
                </div>

            </div>
        </section>
    );
}

// Add custom keyframe animation in index.css if needed, or stick to simple
