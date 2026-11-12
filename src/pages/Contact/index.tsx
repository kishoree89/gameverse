import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import PageBanner from '../../components/common/PageBanner';
import Reveal from '../../components/common/Reveal';
import CustomButton from '../../components/common/CustomButton';
import { SOCIALS } from '../../components/layout/Footer';
import { useToast } from '../../hooks/useToast';
import { EMAIL_RE } from '../../utils/format';
import { IMG } from '../../utils/images';

type Field = 'name' | 'email' | 'subject' | 'message';
type Values = Record<Field, string>;
const EMPTY: Values = { name: '', email: '', subject: '', message: '' };

function validate(v: Values): Partial<Values> {
  const e: Partial<Values> = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Subject must be at least 3 characters.';
  if (v.message.trim().length < 20) e.message = `Message must be at least 20 characters (${v.message.trim().length}/20).`;
  return e;
}

const INFO = [
  { Icon: Mail, label: 'Email', value: 'hello@gameverse.gg', href: 'mailto:hello@gameverse.gg' },
  { Icon: Phone, label: 'Phone', value: '+91 80 0000 0000', href: 'tel:+918000000000' },
  { Icon: MapPin, label: 'Studio', value: '42 Pixel Avenue, Bengaluru, India' },
  { Icon: Clock, label: 'Support hours', value: 'Mon – Sat, 10:00 – 19:00 IST' },
];

export default function Contact() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const toast = useToast();
  const errors = validate(values);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const onBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length) {
      toast({ kind: 'error', title: 'Please fix the highlighted fields' });
      return;
    }
    setSending(true);
    // Frontend only: simulate a network round-trip.
    window.setTimeout(() => {
      setSending(false);
      setSentTo(values.name.trim());
      toast({ kind: 'success', title: 'Message sent!', message: 'We usually reply within 24 hours.' });
      setValues(EMPTY);
      setTouched({});
    }, 1200);
  };

  const field = (name: Field, label: string, props: { type?: string; textarea?: boolean; placeholder: string }) => {
    const err = touched[name] ? errors[name] : undefined;
    const common = {
      id: name,
      name,
      value: values[name],
      onChange,
      onBlur,
      placeholder: props.placeholder,
      'aria-invalid': !!err,
      'aria-describedby': err ? `${name}-error` : undefined,
      className: `input-gv ${err ? '!border-rose-500/70' : ''}`,
    };
    return (
      <div>
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-200">{label}</label>
        {props.textarea ? <textarea rows={6} {...common} /> : <input type={props.type ?? 'text'} {...common} />}
        <AnimatePresence>
          {err && (
            <motion.p id={`${name}-error`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-rose-400">
              {err}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <PageBanner
        eyebrow="Get in touch"
        title={<>Contact <span className="text-gradient">Us</span></>}
        subtitle="Questions, partnerships, press or feedback? Our team would love to hear from you."
        image={IMG.padPink}
      />

      <section className="container-gv">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-4">
            {INFO.map(({ Icon, label, value, href }) => (
              <div key={label} className="glass flex items-start gap-4 rounded-2xl p-5 transition hover:border-neon/40">
                <span className="animated-gradient grid h-11 w-11 shrink-0 place-items-center rounded-xl"><Icon className="h-5 w-5 text-white" /></span>
                <div>
                  <p className="text-xs text-muted">{label}</p>
                  {href ? <a href={href} className="font-semibold text-white hover:text-cyber">{value}</a> : <p className="font-semibold text-white">{value}</p>}
                </div>
              </div>
            ))}
            <div className="glass rounded-2xl p-5">
              <p className="mb-3 text-sm font-semibold text-white">Follow GameVerse</p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:-translate-y-0.5 hover:border-neon/50 hover:text-white">
                    <Icon className="h-4 w-4" /> {label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} noValidate className="glass space-y-5 rounded-3xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-white">Send us a message</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {field('name', 'Name', { placeholder: 'Your name' })}
                {field('email', 'Email', { type: 'email', placeholder: 'you@example.com' })}
              </div>
              {field('subject', 'Subject', { placeholder: 'What is this about?' })}
              {field('message', 'Message', { textarea: true, placeholder: 'Tell us more…' })}
              <CustomButton type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
                {sending ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</> : <><Send className="h-5 w-5" /> Send Message</>}
              </CustomButton>
            </form>
          </Reveal>
        </div>
      </section>

      <Dialog
        open={sentTo !== null}
        onClose={() => setSentTo(null)}
        slotProps={{ paper: { sx: { bgcolor: '#0a0f24', backgroundImage: 'none', border: '1px solid rgba(255,255,255,.1)', borderRadius: 4 } } }}
        aria-labelledby="sent-title"
      >
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="p-8 text-center sm:p-10">
          <motion.div initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.15, type: 'spring' }}>
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
          </motion.div>
          <h2 id="sent-title" className="mt-5 font-display text-2xl font-bold text-white">GG, {sentTo}!</h2>
          <p className="mt-2 text-muted">Your message has been received. Our team will get back to you within 24 hours.</p>
          <div className="mt-6"><CustomButton onClick={() => setSentTo(null)}>Back to the game</CustomButton></div>
        </motion.div>
      </Dialog>
    </>
  );
}
