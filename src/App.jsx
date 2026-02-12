import { useEffect, useState } from 'react';
import BackgroundShader from './components/BackgroundShader';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="text-white selection:bg-primary selection:text-black min-h-screen overflow-x-hidden">

      {/* Scroll Progress Bar for Top and Bottom */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-primary origin-right z-[60]"
        style={{ scaleX }}
      />

      {/* Background Shader */}
      <BackgroundShader />

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[40] opacity-[0.05] bg-repeat mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"1\"/%3E%3C/svg%3E')" }} />

      <Header />

      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <Services />
        <WhyUs />
      </main>

      <Footer />
    </div>
  );
}

export default App;
