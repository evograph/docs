import type { Metadata } from "next";
import { ReadingPage } from "@/components/reading-page";
export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for the Evograph website and early-stage developer tool.",
  alternates: { canonical: "/terms" },
};
export default function Page() {
  return (
    <ReadingPage index="TERMS">
      <h1>Using Evograph.</h1>
      <p>
        Updated 9 October 2026. This website is provided by Muhammad Atif to
        explain Evograph and let you explore a public sample.
      </p>
      <h2>An early-stage tool</h2>
      <p>
        Features and documentation may change. Verify commands and review the
        records generated in your own repository. Keep backups of important
        work. The public demo is illustrative sample data and is not a hosted
        repository workspace.
      </p>
      <h2>Open-source software</h2>
      <p>
        The CLI is distributed under the{" "}
        <a href="https://github.com/evograph/cli/blob/main/LICENSE">
          ISC license
        </a>
        . That license governs use, redistribution, and warranties for the
        software. Third-party dependencies retain their own licenses. The
        Evograph name and visual identity identify this project.
      </p>
      <h2>No service commitment</h2>
      <p>
        The website does not sell subscriptions or provide a paid service
        agreement. There is no uptime or support response guarantee. Future
        commercial services, if introduced, will have their own published terms
        and pricing.
      </p>
      <h2>Your records</h2>
      <p>
        You are responsible for the information you put into your repository and
        share through other tools. Avoid storing credentials or sensitive
        personal information in graph records. Evaluate recorded reasoning
        against the current code and requirements before acting on it.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href="mailto:dev.muhammad.atif@gmail.com">
          dev.muhammad.atif@gmail.com
        </a>
        .
      </p>
    </ReadingPage>
  );
}
