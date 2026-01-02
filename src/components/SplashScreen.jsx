import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return p + 2;
            });
        }, 40);

        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 1000);
        }, 2200);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        filter: 'blur(20px)',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Animated background gradient */}
                    <motion.div
                        className="splash-bg-gradient"
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <motion.div
                        className="splash-content"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Logo */}
                        <motion.div
                            className="splash-logo"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <div className="logo-container">
                                <motion.div
                                    className="logo-ring"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />
                                <img
                                    src="/logo.png"
                                    alt="Rusetiq Logo"
                                    className="logo-image"
                                />
                            </div>
                        </motion.div>

                        <motion.h1
                            className="splash-title"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            RUSETIQ
                        </motion.h1>

                        <motion.p
                            className="splash-subtitle"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            PORTFOLIO
                        </motion.p>

                        <motion.div
                            className="splash-loader-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="splash-loader-bg" />
                            <motion.div
                                className="splash-loader-fill"
                                style={{ width: `${progress}%` }}
                            />
                            <span className="splash-loader-text">{progress}%</span>
                        </motion.div>
                    </motion.div>

                    {/* Corner decorations */}
                    <div className="corner-decoration corner-tl">
                        <div className="corner-line corner-line-h" />
                        <div className="corner-line corner-line-v" />
                        <div className="corner-dot" />
                    </div>
                    <div className="corner-decoration corner-br">
                        <div className="corner-line corner-line-h" />
                        <div className="corner-line corner-line-v" />
                        <div className="corner-dot" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
