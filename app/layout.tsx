import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const description = 'Keep the reasoning behind your code. Evograph records linked problems, decisions, and changes alongside your repository, ready for your next coding session.';
const isPreview = process.env.VERCEL_ENV !== 'production';
export const metadata: Metadata = {
  metadataBase: new URL('https://evograph.app'),
  title: { default: 'Evograph — Keep the reasoning behind your code', template: '%s · Evograph' },
  description,
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { type: 'website', siteName: 'Evograph', title: 'Evograph — Keep the reasoning behind your code', description, images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Evograph: Keep the reasoning behind your code' }] },
  twitter: { card: 'summary_large_image', title: 'Evograph — Keep the reasoning behind your code', description, images: ['/opengraph-image'] },
  icons: { icon: '/icon.svg', apple: '/apple-icon' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top"><a className="skip-link" href="#main">Skip to content</a><Navigation/>{children}<Footer/></body></html>;
}
