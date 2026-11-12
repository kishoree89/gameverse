import { motion } from 'framer-motion';
import { Gamepad2, Home, Search } from 'lucide-react';
import CustomButton from '../../components/common/CustomButton';
import FloatingOrbs from '../../components/common/FloatingOrbs';

export default function NotFound({ message = 'The level you’re looking for doesn’t exist, or it got deleted in the last patch.' }: { message?: string }) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 text-center">
      <div className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <FloatingOrbs />
      <div>
        <motion.div animate={{ y: [0, -16, 0], rotate: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="mx-auto mb-6 w-fit">
          <Gamepad2 className="h-16 w-16 text-cyber" />
        </motion.div>
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="relative font-display text-[7rem] leading-none font-black text-gradient sm:text-[11rem]"
        >
          404
          <motion.span
            aria-hidden
            className="absolute inset-0 text-cyber/40"
            animate={{ x: [0, -6, 4, 0], opacity: [0, 0.8, 0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, repeatDelay: 1.5 }}
          >
            404
          </motion.span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4 font-display text-2xl font-bold tracking-widest text-white">
          GAME OVER
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mx-auto mt-3 max-w-md text-muted">
          {message}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 flex flex-wrap justify-center gap-4">
          <CustomButton to="/" size="lg"><Home className="h-5 w-5" /> Respawn at Home</CustomButton>
          <CustomButton to="/explore" variant="ghost" size="lg"><Search className="h-5 w-5" /> Explore Games</CustomButton>
        </motion.div>
      </div>
    </section>
  );
}
