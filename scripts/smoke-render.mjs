// Smoke test: server-renders every route (waiting for lazy pages) and fails on
// render errors or React warnings. Run: node scripts/smoke-render.mjs
import { createServer } from 'vite';

const ROUTES = [
  ['/', 'ENTER'],
  ['/explore', 'Explore Games'],
  ['/explore?category=racing', 'Racing Games'],
  ['/games/neon-requiem', 'System Requirements'],
  ['/games/does-not-exist', 'GAME OVER'],
  ['/categories', 'Choose Your Arena'],
  ['/top-games', 'Top Games'],
  ['/news', 'Featured Stories'],
  ['/news/arena-legends-worlds', 'More Stories'],
  ['/community', 'Discussions'],
  ['/about', 'Meet the Team'],
  ['/contact', 'Send us a message'],
  ['/some/missing/page', 'GAME OVER'],
];

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const problems = [];
const origError = console.error;
console.error = (...a) => problems.push(a.map(String).join(' ').slice(0, 300));

try {
  const { render } = await vite.ssrLoadModule('/scripts/smoke-entry.tsx');
  for (const [url, expect] of ROUTES) {
    const before = problems.length;
    let html = '';
    try {
      html = await render(url);
    } catch (e) {
      problems.push(`${url}: threw ${e?.stack ?? e}`);
    }
    const ok = html.includes(expect) && problems.length === before;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${url}${html.includes(expect) ? '' : `  (missing "${expect}")`}`);
    if (!html.includes(expect)) problems.push(`${url}: missing text "${expect}"`);
  }
} finally {
  console.error = origError;
  await vite.close();
}
if (problems.length) {
  console.log('\nProblems:\n' + problems.join('\n'));
  process.exit(1);
}
console.log('\nAll routes rendered cleanly.');
