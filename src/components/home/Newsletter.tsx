import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import CustomButton from '../common/CustomButton';
import Reveal from '../common/Reveal';
import { useToast } from '../../hooks/useToast';
import { EMAIL_RE } from '../../utils/format';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const toast = useToast();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setDone(true);
    toast({ kind: 'success', title: 'You’re subscribed!', message: `Weekly drops will land in ${email.trim()}.` });
    setEmail('');
  };

  return (
    <section className="container-gv py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-14">
          <div className="animated-gradient absolute inset-0 -z-10 opacity-25" />
          <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
          <div className="mx-auto max-w-2xl text-center">
            <Mail className="mx-auto mb-5 h-12 w-12 text-cyber" />
            <h2 className="font-display text-2xl font-bold text-white sm:text-4xl">Never Miss a Drop</h2>
            <p className="mt-3 text-slate-300">Release dates, exclusive deals and esports highlights, delivered every Friday. No spam, ever.</p>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 flex flex-col items-center gap-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  <p className="font-semibold text-white">Thanks for subscribing. See you on Friday!</p>
                  <button onClick={() => setDone(false)} className="text-sm text-cyber underline-offset-4 hover:underline">Subscribe another email</button>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={submit} noValidate className="mt-8">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={!!error}
                      aria-describedby={error ? 'newsletter-error' : undefined}
                      className="input-gv flex-1"
                    />
                    <CustomButton type="submit">
                      Subscribe <Send className="h-4 w-4" />
                    </CustomButton>
                  </div>
                  {error && <p id="newsletter-error" className="mt-2 text-left text-sm text-rose-400">{error}</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
