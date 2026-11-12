import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import FloatingOrbs from './FloatingOrbs';

interface Props {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  image: string;
  children?: ReactNode;
}

export default function PageBanner({ eyebrow, title, subtitle, image, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        <SmartImage src={image} alt="" width={1920} height={800} priority className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void/70 via-void/80 to-void" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" />
      <FloatingOrbs />
      <div className="container-gv text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-xs font-semibold tracking-[0.4em] text-cyber uppercase"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-display text-4xl font-black text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg"
        >
          {subtitle}
        </motion.p>
        {children && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
