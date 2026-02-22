import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';

import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>

      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <div style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <motion.div
          className="fixed top-0 left-0 right-0 h-[1px] origin-left z-[60]"
          style={{ scaleX, background: 'linear-gradient(90deg,#E8622A,#C9852A)' }}
        />
        <div
          className="fixed inset-0 pointer-events-none z-[40] opacity-[0.02] bg-repeat"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')" }}
        />
        <Navbar />
        <main className="relative w-full overflow-hidden">
          <Hero />
          <About />
          <Projects />
          <Services />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
