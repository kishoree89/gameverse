import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

export default function LoadingScreen({ fullscreen = true }: { fullscreen?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={`${fullscreen ? 'fixed inset-0 z-[2000]' : 'min-h-[60vh]'} grid place-items-center bg-void`}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative grid h-24 w-24 place-items-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon border-r-cyber"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
          <motion.span
            className="absolute inset-3 rounded-full border-2 border-transparent border-b-electric"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
          />
          <Gamepad2 className="h-8 w-8 text-white" />
        </div>
        <p className="font-display text-sm tracking-[0.4em] text-gradient">LOADING</p>
      </div>
    </motion.div>
  );
}
