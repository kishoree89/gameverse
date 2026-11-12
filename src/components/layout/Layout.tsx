import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import LoadingScreen from '../common/LoadingScreen';

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  // Disable browser scroll restoration; we reset to top after each page exit animation.
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[2000] focus:rounded-lg focus:bg-neon focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Suspense fallback={<LoadingScreen fullscreen={false} />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </>
  );
}
