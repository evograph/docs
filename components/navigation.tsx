'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Mark } from './brand';

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="header-inner"><Link className="brand" href="/" aria-label="Evograph home" onClick={() => setOpen(false)}><Mark/><span>evograph</span></Link><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button><nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">{[['/demo','Explore the graph'],['/docs','Documentation'],['/about','About']].map(([href,label]) => <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}<a className="nav-source" href="https://github.com/evograph/cli">GitHub <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M5 3h8v8M13 3 3 13" stroke="currentColor" strokeWidth="1.4"/></svg></a></nav></div></header>;
}
