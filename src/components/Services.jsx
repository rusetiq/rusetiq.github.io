import { motion } from 'framer-motion';

const services = [
    {
        title: "AI Full-Stack SaaS",
        desc: "Next-gen applications powered by intelligent backends.",
        className: "md:col-span-2 md:row-span-2 min-h-[400px]",
        color: "bg-black border-2 border-white/20 hover:border-primary"
    },
    {
        title: "AI Agents",
        desc: "Autonomous worker bots that execute complex tasks 24/7.",
        className: "md:col-span-1 min-h-[250px]",
        color: "bg-black border-2 border-white/20 hover:border-primary"
    },
    {
        title: "RAG Pipelines",
        desc: "Retrieval-Augmented Generation for context-aware AI.",
        className: "md:col-span-1 min-h-[250px]",
        color: "bg-black border-2 border-white/20 hover:border-primary"
    },
    {
        title: "Video Solutions",
        desc: "Automated AI video generation and editing tools.",
        className: "md:col-span-2 min-h-[250px]",
        color: "bg-black border-2 border-white/20 hover:border-primary"
    },
    {
        title: "n8n Workflows",
        desc: "Advanced automation connecting your entire tech stack.",
        className: "md:col-span-1 min-h-[250px]",
        color: "bg-black border-2 border-white/20 hover:border-primary"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" } }
};

export default function Services() {
    return (
        <section className="relative z-10 py-32 px-4 md:px-12 bg-black border-t-2 border-white">

            {/* Header */}
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-2 border-white pb-8">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-6xl md:text-9xl font-black font-heading text-white mix-blend-difference mb-4">
                        SERVICES
                    </h2>
                    <p className="font-mono text-primary text-xl uppercase tracking-widest flex items-center gap-2">
                        <span className="w-4 h-4 bg-primary inline-block" />
                        Deploying Intelligence
                    </p>
                </motion.div>

                <div className="hidden md:block text-right">
                    <p className="font-mono text-xs text-gray-500">
                        V.2.0.4<br />Build: RELEASE_CANDIDATE
                    </p>
                </div>
            </div>

            {/* Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr"
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ scale: 0.98, transition: { duration: 0.1 } }}
                        className={`relative p-8 flex flex-col justify-between group overflow-hidden transition-all duration-300 ${service.color}`}
                    >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />

                        <div className="relative z-10">
                            <div className="text-right mb-12 opacity-50 font-mono text-xs group-hover:text-black">
                                {`0${index + 1}`}
                            </div>

                            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 group-hover:text-black transition-colors uppercase leading-none">
                                {service.title}
                            </h3>
                        </div>

                        <div className="relative z-10 border-t border-white/20 pt-6 mt-auto group-hover:border-black/20">
                            <p className="font-mono text-gray-400 text-sm group-hover:text-black/80 transition-colors">
                                {service.desc} // <span className="font-bold underline">EXECUTE</span>
                            </p>
                        </div>

                    </motion.div>
                ))}
            </motion.div>

        </section>
    );
}
