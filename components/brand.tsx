export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 7v13c0 8 6 12 14 12h8M9 20c0-8 6-12 14-12h8"
        stroke="currentColor"
        strokeWidth="2.8"
      />
      <path d="M22 20h9" stroke="currentColor" strokeWidth="2.8" />
      <circle cx="9" cy="7" r="3.5" fill="currentColor" />
      <circle cx="31" cy="8" r="3.5" fill="currentColor" />
      <circle cx="31" cy="20" r="3.5" fill="currentColor" />
      <circle cx="31" cy="32" r="3.5" fill="currentColor" />
    </svg>
  );
}
