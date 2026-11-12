import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Heart, Info, X, XCircle } from 'lucide-react';

type ToastKind = 'success' | 'error' | 'info' | 'favorite';
interface Toast {
  id: number;
  kind: ToastKind;
  title: string;
  message?: string;
}

const ICONS = { success: CheckCircle2, error: XCircle, info: Info, favorite: Heart };
const COLORS: Record<ToastKind, string> = {
  success: 'text-emerald-400',
  error: 'text-rose-400',
  info: 'text-cyber',
  favorite: 'text-pink-400',
};

const ToastContext = createContext<((t: Omit<Toast, 'id'>) => void) | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const show = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = nextId++;
      setToasts((list) => [...list.slice(-2), { ...t, id }]);
      window.setTimeout(() => dismiss(id), 3500);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 left-4 z-[1500] flex flex-col items-end gap-3 sm:left-auto"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.kind];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.95 }}
                className="glass pointer-events-auto relative flex overflow-hidden w-full max-w-sm items-start gap-3 rounded-2xl bg-navy/80 p-4 shadow-2xl shadow-neon/20"
                role="status"
              >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${COLORS[t.kind]}`} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{t.title}</p>
                  {t.message && <p className="mt-0.5 text-sm text-muted">{t.message}</p>}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-lg p-1 text-muted transition hover:bg-white/10 hover:text-white"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-neon to-cyber"
                  initial={{ width: '100%' }}
                  animate={{ width: 0 }}
                  transition={{ duration: 3.5, ease: 'linear' }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
