import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(interval); return 100; }
                return p + 2;
            });
        }, 40);

        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 900);
        }, 2300);

        return () => { clearTimeout(timer); clearInterval(interval); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(14px)', transition: { duration: 0.7 } }}
                >
                    <div className="splash-bg" />

                    <motion.div
                        className="splash-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="splash-mandala">
                            <div className="mandala-wrap">
                                <div className="mandala-ring ring-1" />
                                <div className="mandala-ring ring-2" />
                                <div className="mandala-ring ring-3" />
                                <svg className="mandala-svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                                    <circle cx="60" cy="60" r="20" stroke="#C9922A" strokeWidth="0.5" fill="none" />
                                    {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                                        <line key={i}
                                            x1={60 + 20 * Math.cos(a * Math.PI / 180)}
                                            y1={60 + 20 * Math.sin(a * Math.PI / 180)}
                                            x2={60 + 28 * Math.cos(a * Math.PI / 180)}
                                            y2={60 + 28 * Math.sin(a * Math.PI / 180)}
                                            stroke="#E8622A" strokeWidth="0.5" />
                                    ))}
                                    <circle cx="60" cy="60" r="6" stroke="#E8622A" strokeWidth="0.7" fill="rgba(232,98,42,0.12)" />
                                    <circle cx="60" cy="60" r="2" fill="#E8622A" />
                                </svg>
                            </div>
                        </div>

                        <motion.h1
                            className="splash-name"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            rusetiq
                        </motion.h1>

                        <motion.p
                            className="splash-sub"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                        >
                            Portfolio
                        </motion.p>

                        <motion.div
                            className="splash-bar-wrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                        >
                            <div className="splash-bar-bg">
                                <div className="splash-bar-fill" style={{ width: `${progress}%` }} />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
