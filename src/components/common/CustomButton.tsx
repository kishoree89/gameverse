import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'outline' | 'ghost';

const VARIANTS: Record<Variant, string> = {
  primary:
    'animated-gradient text-white shadow-lg shadow-neon/30 hover:shadow-cyber/40',
  outline: 'border border-cyber/50 text-cyber hover:bg-cyber/10',
  ghost: 'glass text-white hover:bg-white/10',
};

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'style'> {
  children: ReactNode;
  variant?: Variant;
  to?: string;
  size?: 'md' | 'lg';
}

export default function CustomButton({ children, variant = 'primary', to, size = 'md', className = '', ...rest }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-[box-shadow,background-color] disabled:cursor-not-allowed disabled:opacity-60 ${
    size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-sm'
  } ${VARIANTS[variant]} ${className}`;
  const motionProps = { whileHover: { scale: 1.04, y: -2 }, whileTap: { scale: 0.97 } };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={to} className={cls}>
          {children}
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.button {...motionProps} className={cls} {...rest}>
      {children}
    </motion.button>
  );
}
