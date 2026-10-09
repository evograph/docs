"use client";
import Link from "next/link";
export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main id="main" className="shell not-found">
      <p className="eyebrow">THE TRAIL COULDN’T LOAD</p>
      <h1>Let’s try that again.</h1>
      <p>The page couldn’t finish loading. Retry, or return to the homepage.</p>
      <div className="hero-actions">
        <button className="button button-primary" onClick={retry}>
          Try again
        </button>
        <Link className="text-link" href="/">
          Back to Evograph
        </Link>
      </div>
    </main>
  );
}
