"use client";
import { useState } from "react";
export function CopyCommand({
  command = "npm install -g @evograph/cli",
}: {
  command?: string;
}) {
  const [state, setState] = useState("Copy");
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setState("Copied");
    } catch {
      setState("Select to copy");
    }
    setTimeout(() => setState("Copy"), 2500);
  }
  return (
    <div className="copy-command">
      <span aria-hidden="true">$</span>
      <code>{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy command: ${command}`}
      >
        <span aria-live="polite">{state}</span>
      </button>
    </div>
  );
}
