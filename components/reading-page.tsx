export function ReadingPage({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="shell reading-page">
      <aside className="reading-aside">
        EVOGRAPH / {index}
        <p>
          Keep the reasoning
          <br />
          behind your code.
        </p>
      </aside>
      <article className="prose">{children}</article>
    </main>
  );
}
