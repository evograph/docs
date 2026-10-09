import Link from 'next/link';
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <main id="main" className="docs-layout"><aside className="docs-sidebar"><p>EVOGRAPH / DOCUMENTATION</p><nav aria-label="Documentation"><Link href="/docs">Quickstart</Link><Link href="/docs/cli">CLI reference</Link><Link href="/docs/agents">Coding agents</Link></nav><p className="docs-status">Published CLI: 0.1.2<br />Node.js 22.12+<br />Early release · ISC license</p></aside><article className="prose docs-prose">{children}</article></main>;
}
