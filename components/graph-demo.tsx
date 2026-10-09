'use client';

import { useState, useRef } from 'react';
import fixture from '@/data/demo.json';

type RecordEntry = (typeof fixture.records)[number];
const records = fixture.records.filter(r => r.header.type !== 'edge');
const edges = fixture.records.filter(r => r.header.type === 'edge');
const ordered = ['problem', 'decision', 'change'].map(type => records.find(r => r.header.type === type)!);
const title = (record: RecordEntry) => record.content.title ?? 'Add repository instructions';
const labels: Record<string, string> = { expectedOutcome: 'Expected outcome' };

export function GraphDemo() {
  const [selected, setSelected] = useState(ordered[1].id);
  const [panel, setPanel] = useState<'context' | 'source'>('context');
  const contextTab = useRef<HTMLButtonElement>(null);
  const sourceTab = useRef<HTMLButtonElement>(null);
  const active = records.find(r => r.id === selected)!;
  const relations = edges.filter(e => e.content.from === selected || e.content.to === selected);
  return <div className="demo-workspace">
    <div className="workspace-bar"><span>sample-repo / .evolution</span><span>3 records · 2 relationships · CLI {fixture.cliVersion}</span></div>
    <div className="workspace-body">
      <div className="graph-select"><p className="graph-select-label">01 / SELECT A RECORD</p><ol>
        {ordered.map((record, index) => <li key={record.id}>
          <button className="graph-node" aria-pressed={selected === record.id} onClick={() => setSelected(record.id)}>
            <span className="node-type"><span>{record.header.type}</span><code>{record.id.slice(0, 8)}</code></span>
            <span className="node-title">{title(record)}</span>
          </button>
          {index < 2 && <span className="edge-label">{index === 0 ? '← solves' : 'implemented_by →'}</span>}
        </li>)}
      </ol></div>
      <section className="record-detail" aria-label="Selected record" aria-live="polite">
        <p className="eyebrow">02 / {active.header.type} / {active.id.slice(0, 8)}</p>
        <h2>{title(active)}</h2>
        <dl>{Object.entries(active.content).filter(([key]) => key !== 'title').map(([key, value]) => value !== undefined && <div key={key}>
          <dt>{labels[key] ?? key}</dt><dd>{Array.isArray(value) ? <ul>{value.map((v, i) => <li key={i}>{typeof v === 'string' ? v : `${v.status} ${v.path}`}</li>)}</ul> : String(value)}</dd>
        </div>)}
        <dt>Follow a relationship</dt><dd>{relations.map(edge => {
          const outgoing = edge.content.from === selected;
          const related = records.find(r => r.id === (outgoing ? edge.content.to : edge.content.from))!;
          return <div key={edge.id}><button className="related-button" onClick={() => setSelected(related.id)}>
            {outgoing ? '→' : '←'} {edge.content.relation} · {title(related)}
          </button></div>;
        })}</dd></dl>
      </section>
    </div>
    <div className="workspace-tabs" role="tablist" aria-label="CLI output and source records" onKeyDown={event => {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        const next = event.key === 'Home' ? 'context' : event.key === 'End' ? 'source' : panel === 'context' ? 'source' : 'context';
        setPanel(next);
        (next === 'context' ? contextTab : sourceTab).current?.focus();
      }
    }}>
      <button ref={contextTab} id="context-tab" role="tab" tabIndex={panel === 'context' ? 0 : -1} aria-selected={panel === 'context'} aria-controls="output-panel" onClick={() => setPanel('context')}>$ ecs context</button>
      <button ref={sourceTab} id="source-tab" role="tab" tabIndex={panel === 'source' ? 0 : -1} aria-selected={panel === 'source'} aria-controls="output-panel" onClick={() => setPanel('source')}>Record JSON</button>
    </div>
    <div className="output-panel" id="output-panel" role="tabpanel" aria-labelledby={`${panel}-tab`} tabIndex={0}>
      <pre>{panel === 'context' ? fixture.context : JSON.stringify(active, null, 2)}</pre>
    </div>
  </div>;
}
