import type { ReactNode } from 'react';
import { Info, Settings, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../../components/common/PageBanner';
import { IMG } from '../../utils/images';

// Test page for the InclusifyX widget: every section names the widget features it exercises.
// Items marked "intentional issue" are deliberately inaccessible so the widget's scan report has something to find.

function Block({ id, title, tests, children }: { id: string; title: string; tests: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="glass mb-10 rounded-2xl p-6 sm:p-8">
      <h2 id={`${id}-h`} className="font-display text-2xl font-bold text-white">{title}</h2>
      <p className="mt-1 mb-6 text-xs tracking-wide text-cyber uppercase">Tests: {tests}</p>
      {children}
    </section>
  );
}

const SWATCHES = [
  ['Red', '#e53935'], ['Green', '#43a047'], ['Blue', '#1e88e5'], ['Yellow', '#fdd835'],
  ['Orange', '#fb8c00'], ['Purple', '#8e24aa'], ['Cyan', '#00acc1'], ['Pink', '#d81b60'],
];

export default function PluginTest() {
  return (
    <>
      <PageBanner
        eyebrow="InclusifyX"
        title={<>Plugin <span className="text-gradient">Test Lab</span></>}
        subtitle="One page with content for every accessibility feature of the widget. Open the widget (bottom-right) and try each feature on the matching section."
        image={IMG.circuitGlow}
      />

      <div className="container-gv grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Test sections" className="hidden lg:block">
          <ul className="sticky top-28 space-y-2 text-sm text-slate-300">
            {[['text', 'Reading text'], ['links', 'Links'], ['colors', 'Colours & contrast'], ['images', 'Images'], ['tooltips', 'Tooltips'],
              ['motion', 'Animations'], ['media', 'Sound & video'], ['form', 'Form'], ['table', 'Table & lists'], ['issues', 'Scan issues']].map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:text-cyber">{label}</a></li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 text-slate-300">
          <Block id="text" title="Reading text" tests="Font size, Readable font, Dyslexia font, Line height, Text spacing, Text align, Read Mode, Read Aloud, Reading Guide, Reading Mask, Reading Focus, Text Magnifier, Dictionary, Translation, Highlight Headings, Page Structure">
            <h3 className="text-xl font-semibold text-white">Heading level 3: The history of video games</h3>
            <p className="mt-3 leading-relaxed">
              Video games began in research laboratories in the 1950s, when scientists built simple interactive programs to demonstrate the capabilities of early computers.
              The commercial arcade era arrived in the 1970s, and home consoles soon followed, bringing interactive entertainment into living rooms around the world.
            </p>
            <h4 className="mt-6 text-lg font-semibold text-white">Heading level 4: Why accessibility matters</h4>
            <p className="mt-3 leading-relaxed">
              Accessibility ensures that players with visual, auditory, motor or cognitive impairments can enjoy games equally. Ubiquitous features such as subtitles,
              remappable controls and adjustable difficulty demonstrate that inclusive design benefits everyone. Select a difficult word like
              <strong> ubiquitous</strong>, <strong>ephemeral</strong> or <strong>meticulous</strong> to test the dictionary.
            </p>
            <h5 className="mt-6 font-semibold text-white">Heading level 5: A longer paragraph for reading tools</h5>
            <p className="mt-3 leading-relaxed">
              Modern game studios employ dedicated accessibility specialists who audit menus, typography and colour palettes long before release. They verify that text remains
              legible at large sizes, that information is never conveyed by colour alone, and that every action can be completed with a keyboard, a controller or assistive
              switches. When these practices are followed from the very first prototype, the finished game reaches a much wider audience and receives fewer complaints after launch.
            </p>
            <blockquote className="mt-6 border-l-4 border-neon pl-4 italic">“Games are for everyone. Design them that way.” — An accessibility designer</blockquote>
          </Block>

          <Block id="links" title="Links" tests="Highlight Links, Underline Links, Keyboard Navigation, Voice Navigation, Large Cursor">
            <p className="leading-relaxed">
              Read our <Link to="/about" className="text-cyber">about page</Link>, browse the <Link to="/explore" className="text-cyber">game catalogue</Link>,
              or visit the <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noreferrer" className="text-cyber">WCAG guidelines (external)</a>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/top-games" className="rounded-lg bg-neon px-4 py-2 font-semibold text-white">Top games</Link>
              <Link to="/news" className="rounded-lg border border-white/20 px-4 py-2 text-white">Latest news</Link>
              <button type="button" className="rounded-lg border border-white/20 px-4 py-2 text-white">A plain button</button>
            </div>
          </Block>

          <Block id="colors" title="Colours & contrast" tests="Dark/Light/Smart contrast, Invert, Monochrome, Sepia, Saturation, Low saturation, Colour-blind filters (protanopia, deuteranopia, tritanopia…)">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SWATCHES.map(([name, hex]) => (
                <div key={name} className="flex h-20 items-end rounded-xl p-2 text-sm font-semibold text-white" style={{ background: hex }}>{name}</div>
              ))}
            </div>
            <div className="mt-5 h-10 rounded-xl" style={{ background: 'linear-gradient(90deg,#e53935,#fdd835,#43a047,#1e88e5,#8e24aa)' }} aria-hidden="true" />
            <p className="mt-5">Status: <span style={{ color: '#43a047' }}>● Online</span> · <span style={{ color: '#e53935' }}>● Offline</span> (colour only — compare under colour-blind filters)</p>
            <p className="mt-3 rounded-lg bg-white p-3" style={{ color: '#b0b0b0' }}>Low-contrast text (light grey on white) — Smart Contrast should fix this.</p>
          </Block>

          <Block id="images" title="Images" tests="Hide Images, Tooltips (alt text), Screen Reader Aid">
            <div className="grid gap-4 sm:grid-cols-3">
              <figure>
                <img src={IMG.vrHeadset} alt="Person wearing a VR headset in neon light" className="aspect-video w-full rounded-xl object-cover" />
                <figcaption className="mt-2 text-sm">With alt text</figcaption>
              </figure>
              <figure>
                <img src={IMG.retroConsoles} alt="" className="aspect-video w-full rounded-xl object-cover" />
                <figcaption className="mt-2 text-sm">Decorative (empty alt)</figcaption>
              </figure>
              <figure>
                <img src={IMG.padPink} className="aspect-video w-full rounded-xl object-cover" />
                <figcaption className="mt-2 text-sm">Missing alt (intentional issue)</figcaption>
              </figure>
            </div>
          </Block>

          <Block id="tooltips" title="Tooltips" tests="Tooltips, Screen Reader Aid">
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" aria-label="Settings" title="Settings" className="rounded-full border border-white/20 p-3 text-white"><Settings className="h-5 w-5" /></button>
              <button type="button" aria-label="Volume" title="Volume" className="rounded-full border border-white/20 p-3 text-white"><Volume2 className="h-5 w-5" /></button>
              <span title="This is a title tooltip" className="inline-flex items-center gap-1 underline decoration-dotted"><Info className="h-4 w-4" /> Hover me</span>
              <p><abbr title="Massively Multiplayer Online Role-Playing Game">MMORPG</abbr> and <abbr title="Frames Per Second">FPS</abbr> are common abbreviations.</p>
            </div>
          </Block>

          <Block id="motion" title="Animations" tests="Pause Animations, Seizure Safe, Animation Speed, ADHD mode">
            <div className="flex flex-wrap items-center gap-8">
              <div className="h-14 w-14 animate-spin rounded-lg border-4 border-cyber border-t-transparent" role="img" aria-label="Spinning loader" />
              <div className="h-14 w-14 animate-pulse rounded-full bg-neon" role="img" aria-label="Pulsing dot" />
              <div className="h-14 w-14 animate-bounce rounded-full bg-amber-400" role="img" aria-label="Bouncing ball" />
              <div className="animate-ping h-4 w-4 rounded-full bg-rose-500" role="img" aria-label="Ping indicator" />
            </div>
          </Block>

          <Block id="media" title="Sound & video" tests="Stop Sounds (Mute), Pause Animations">
            <p className="mb-3">Press play on the tone, then turn on <em>Stop Sounds</em> in the widget.</p>
            <audio controls loop src="/media/test-tone.wav" className="w-full max-w-md">Your browser does not support audio.</audio>
            <video controls loop muted={false} playsInline className="mt-5 w-full max-w-md rounded-xl"
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm">
              Your browser does not support video.
            </video>
          </Block>

          <Block id="form" title="Form" tests="Talk & Type (voice input), Keyboard Navigation, Voice Navigation, Large Cursor, Motor-impaired mode">
            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted (test only)'); }} className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">Your name<input className="input-gv" name="name" placeholder="Type or use Talk & Type" /></label>
              <label className="grid gap-1 text-sm">Email<input className="input-gv" type="email" name="email" placeholder="you@example.com" /></label>
              <label className="grid gap-1 text-sm">Favourite genre
                <select className="input-gv" name="genre"><option>Action</option><option>RPG</option><option>Strategy</option><option>Puzzle</option></select>
              </label>
              <fieldset className="grid gap-1 text-sm">
                <legend>Platform</legend>
                <label className="flex gap-2"><input type="radio" name="platform" defaultChecked /> PC</label>
                <label className="flex gap-2"><input type="radio" name="platform" /> Console</label>
              </fieldset>
              <label className="grid gap-1 text-sm sm:col-span-2">Message<textarea className="input-gv" rows={4} name="message" placeholder="Dictate a message…" /></label>
              <label className="flex gap-2 text-sm sm:col-span-2"><input type="checkbox" name="news" /> Send me the newsletter</label>
              <div className="sm:col-span-2"><button type="submit" className="rounded-lg bg-neon px-5 py-2 font-semibold text-white">Submit</button></div>
            </form>
          </Block>

          <Block id="table" title="Table & lists" tests="Read Mode, Page Structure, Screen Reader Aid, Text spacing">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="mb-2 text-left text-white">Top games this week</caption>
                <thead><tr className="border-b border-white/20"><th scope="col" className="py-2">Rank</th><th scope="col">Game</th><th scope="col">Genre</th><th scope="col">Rating</th></tr></thead>
                <tbody>
                  {[['1', 'Skyward Expanse', 'Adventure', '4.9'], ['2', 'Neon Requiem', 'RPG', '4.8'], ['3', 'Velocity Rush X', 'Racing', '4.7']].map((r) => (
                    <tr key={r[0]} className="border-b border-white/10">{r.map((c, i) => <td key={i} className="py-2">{c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <ul className="list-disc pl-5"><li>Subtitles</li><li>Remappable controls</li><li>Colour-blind modes</li></ul>
              <ol className="list-decimal pl-5"><li>Open the widget</li><li>Pick a feature</li><li>Check this page</li></ol>
            </div>
          </Block>

          <Block id="issues" title="Scan issues (intentional)" tests="Widget scan report / dashboard compliance score">
            <p className="mb-4">These elements break accessibility rules on purpose, so the scanner has something to report.</p>
            <div className="flex flex-wrap items-center gap-4">
              <input className="input-gv max-w-xs" placeholder="Input without a label" />
              <button type="button" className="rounded-lg border border-white/20 p-3"><Settings className="h-5 w-5 text-white" /></button>
              <a href="#issues" className="text-cyber">click here</a>
              <span style={{ color: '#777', background: '#666' }} className="rounded px-2 py-1">Very low contrast</span>
            </div>
          </Block>
        </main>
      </div>
    </>
  );
}
