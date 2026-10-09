import Link from 'next/link';
import { Mark } from './brand';
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><Link className="brand" href="/"><Mark/><span>evograph</span></Link><p>Code changes.<br/>Keep the reasoning.</p><nav aria-label="Footer navigation"><a href="https://github.com/evograph/cli">Source code</a><Link href="/contact">Get in touch</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div><div className="footer-bottom"><span>© 2026 Muhammad Atif</span><span>Open source CLI · ISC licensed · Early release</span><a href="#top">Back to top ↑</a></div></footer>;
}
