import Link from "next/link";
import type { Metadata } from "next";
import { CopyCommand } from "@/components/copy-command";

export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Evograph CLI",
            description:
              "A local CLI for linked problems, decisions, and changes in a repository-owned evolution graph.",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Windows, macOS, Linux",
            softwareVersion: "0.1.2",
            url: "https://evograph.app",
            downloadUrl: "https://www.npmjs.com/package/@evograph/cli",
            license: "https://github.com/evograph/cli/blob/main/LICENSE",
            author: {
              "@type": "Person",
              name: "Muhammad Atif",
              url: "https://github.com/acefolioDev",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero shell" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="small-rule" /> An evolution record for your
            repository
          </div>
          <h1 id="hero-heading">
            The code changed.
            <br />
            <span>Keep the why.</span>
          </h1>
          <p className="hero-description">
            Your commits tell you what happened. Evograph keeps the problems,
            decisions, and reasoning that got you there.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/docs">
              Read the quickstart <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/demo">
              Explore an example
            </Link>
          </div>
          <CopyCommand />
          <p className="hero-footnote">
            A local CLI. Plain files. Yours to keep.
            <br />
            Node.js 22.12+ recommended · Early release
          </p>
        </div>
        <div
          className="hero-diagram"
          aria-label="Example: a problem is solved by a decision, which is implemented by a change"
        >
          <div className="diagram-caption">
            <span>FIELD NOTE / 001</span>
            <span>The reasoning, connected</span>
          </div>
          <div className="graph-paper">
            <div className="diagram-path" aria-hidden="true">
              <svg viewBox="0 0 500 510" preserveAspectRatio="none">
                <path d="M105 65V148Q105 170 128 170H340Q365 170 365 195V300Q365 320 340 320H130Q105 320 105 345V450" />
                <path className="branch-path" d="M365 225H425V275" />
              </svg>
            </div>
            <div className="record record-problem">
              <div className="record-label">
                <span className="node-square" /> Problem <code>01</code>
              </div>
              <p>
                Why did we choose
                <br />
                this architecture?
              </p>
              <span className="record-meta">The commit doesn’t say.</span>
            </div>
            <div className="diagram-relation relation-one">solves</div>
            <div className="record record-decision">
              <div className="record-label">
                <span className="node-circle" /> Decision <code>02</code>
              </div>
              <p>
                Keep the context
                <br />
                with the code.
              </p>
              <span className="record-meta">
                Rationale. Alternatives. Tradeoffs.
              </span>
            </div>
            <div className="diagram-relation relation-two">implemented_by</div>
            <div className="record record-change">
              <div className="record-label">
                <span className="node-diamond" /> Change <code>03</code>
              </div>
              <p>
                A decision you can
                <br />
                trace to its outcome.
              </p>
              <span className="record-meta">Connected to the work.</span>
            </div>
            <span className="diagram-margin-note">
              A trail for the
              <br />
              next person.
              <br />
              Or the next agent.
            </span>
          </div>
          <div className="diagram-footer">
            <span>Problem → Decision → Change</span>
            <Link href="/demo">Follow the trail ↗</Link>
          </div>
        </div>
      </section>
      <div className="principles-strip">
        <div className="shell">
          <span>Lives in your repository</span>
          <span>Works alongside Git</span>
          <span>Context for coding agents</span>
          <span>Open source, ISC licensed</span>
        </div>
      </div>
      <section className="shell why-section">
        <div className="section-index">01 / THE MISSING RECORD</div>
        <div className="why-content">
          <h2>
            You inherited the code.
            <br />
            Where’s the reasoning?
          </h2>
          <div className="two-prose">
            <p>
              A rejected approach. A tradeoff made under pressure. The
              constraint behind an unusual implementation. These details rarely
              survive in the diff.
            </p>
            <p>
              Evograph gives them a place: small, typed records linked to the
              problem they solve and the changes they inform. Commit them with
              your project and pick up the thread later.
            </p>
          </div>
        </div>
      </section>
      <section className="workflow-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <div className="section-index">02 / A SMALL HABIT</div>
              <h2>
                Leave a trail.
                <br />
                Follow it next time.
              </h2>
            </div>
            <Link className="text-link" href="/docs">
              The five-minute quickstart ↗
            </Link>
          </div>
          <ol className="workflow-list">
            <li>
              <span className="step-number">01</span>
              <div>
                <h3>Name the problem.</h3>
                <p>
                  Write down what needs to change, while the context is fresh.
                </p>
              </div>
              <code>ecs create problem</code>
            </li>
            <li>
              <span className="step-number">02</span>
              <div>
                <h3>Record the decision.</h3>
                <p>
                  Keep the chosen approach, the alternatives, and your
                  rationale.
                </p>
              </div>
              <code>ecs create decision</code>
            </li>
            <li>
              <span className="step-number">03</span>
              <div>
                <h3>Connect the work.</h3>
                <p>
                  Link the decision to its problem and the changes that
                  implement it.
                </p>
              </div>
              <code>ecs link</code>
            </li>
            <li>
              <span className="step-number">04</span>
              <div>
                <h3>Pick up the thread.</h3>
                <p>
                  Read the graph yourself, or load its context into a coding
                  session.
                </p>
              </div>
              <code>ecs context</code>
            </li>
          </ol>
        </div>
      </section>
      <section className="shell agent-section">
        <div>
          <div className="section-index">03 / THE NEXT SESSION</div>
          <h2>
            Give your agent
            <br />
            some history.
          </h2>
          <p>
            A fresh chat shouldn’t have to rediscover every decision. Evograph
            can scaffold instructions that ask coding agents to read your graph
            at the start of a session and record decisions at the end.
          </p>
          <p className="muted">
            Instruction-based integration today. Follow-through depends on the
            agent; it isn’t enforced by hooks.
          </p>
          <Link className="text-link" href="/docs/agents">
            Set up your coding agent ↗
          </Link>
        </div>
        <div className="terminal">
          <div className="terminal-bar">
            <span>repo / terminal</span>
            <span>ecs context</span>
          </div>
          <pre>
            <span className="terminal-comment">$ ecs context</span>
            {"\n\n=== ECS CONTEXT ===\n\n"}
            <span className="terminal-green">## Problems</span>
            {"\n  Context disappears between sessions\n\n"}
            <span className="terminal-green">## Decisions</span>
            {
              "\n  Keep decisions with the repository\n  → Preserve the rationale, not just the diff\n\n"
            }
            <span className="terminal-green">## Recent decision graphs</span>
            {
              "\n  decision: Keep decisions with the repository\n    │ solves\n    ▼\n  problem: Context disappears between sessions\n\n=== END ECS CONTEXT ==="
            }
          </pre>
          <div className="terminal-note">
            Illustrative excerpt ·{" "}
            <Link href="/demo">See actual CLI output</Link>
          </div>
        </div>
      </section>
      <section className="shell closing-section">
        <div className="section-index">START WITH ONE DECISION</div>
        <h2>
          Make the next change
          <br />
          with the last one in mind.
        </h2>
        <div className="closing-bottom">
          <p>
            Install the CLI, open a repository,
            <br />
            and write down the reason.
          </p>
          <Link className="button button-primary" href="/docs">
            Start your first record <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
