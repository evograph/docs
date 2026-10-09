import type { Metadata } from 'next';
import Link from 'next/link';
import { GraphDemo } from '@/components/graph-demo';

export const metadata: Metadata = {
  title: 'Explore the graph', description: 'Follow a real Evograph problem, decision, and change. Inspect the records and actual CLI context output.',
  alternates: { canonical: '/demo' },
};
export default function Demo() {
  return <main id="main" className="shell">
    <header className="page-heading demo-intro"><div><p className="eyebrow"><span className="small-rule" />A REPOSITORY, WITH ITS REASONS</p>
      <h1>Follow the decision.</h1><p>Start with a problem. See the choice it led to, then follow the work that implements it. Select a record to look inside.</p></div>
      <p>PUBLIC SAMPLE / READ ONLY<br />No account. No repository upload.</p>
    </header>
    <GraphDemo />
    <div className="demo-bottom"><section><h2>Real records. A sample story.</h2><p>These five objects were generated with the published CLI, version 0.1.2. The problem and decision use <code>ecs close-session</code>; the sample worktree change uses the same domain APIs as the CLI’s interactive Git linking flow. Timestamps are normalized for reproducibility.</p><p>The panel shows actual <code>ecs context</code> output. The browser selects existing records and follows their edges locally. It does not run the CLI or an AI model.</p><a className="text-link" href="https://github.com/evograph/docs/blob/main/scripts/generate-demo.mjs">Inspect the generator ↗</a></section>
      <section><h2>Make a record of your own.</h2><p>The CLI stores your graph in your repository’s <code>.evolution/</code> directory. Record one decision, link it to its problem, and load it before your next coding session.</p><Link href="/docs" className="button button-primary">Open the quickstart <span>↗</span></Link></section></div>
  </main>;
}
