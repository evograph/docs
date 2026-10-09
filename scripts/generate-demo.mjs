import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Generate the public example with the published CLI. Never read the host repo's graph.
const root = fileURLToPath(new URL('../', import.meta.url));
const cliRoot = resolve(root, 'node_modules/@evograph/cli');
const cli = join(cliRoot, 'bin/ecs.js');
const scratch = mkdtempSync(join(tmpdir(), 'evograph-public-example-'));
const originalCwd = process.cwd();
const run = (...args) => execFileSync(process.execPath, [cli, ...args], {
  cwd: scratch, encoding: 'utf8',
  env: { ...process.env, GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_SYSTEM: '/dev/null' },
});
try {
  run('init', '--agents', 'codex');
  run('close-session',
    '--problem-title', 'Context disappears between sessions',
    '--problem-description', 'A new developer or coding agent can read the diff but cannot recover the constraints and rejected approaches behind it.',
    '--severity', 'medium',
    '--decision-title', 'Keep decisions with the repository',
    '--chosen', 'Store a small, linked evolution graph in .evolution/',
    '--rationale', 'The reasoning should travel with the code, remain readable without a hosted service, and be available at the start of the next session.',
    '--alternatives', 'Leave the rationale in chat history,Maintain a separate hosted knowledge base',
    '--status', 'in-progress',
    '--expected-outcome', 'The next session can follow the original problem and chosen approach before making a change.',
    '--author', 'Evograph sample');
  process.chdir(scratch);
  const load = (path) => import(pathToFileURL(join(cliRoot, 'dist', path)).href);
  const { ObjectRepository } = await load('features/objects/object.repository.js');
  const { GraphRepository } = await load('features/graph/graph.repository.js');
  const { Change } = await load('features/objects/change/Change.js');
  const repository = new ObjectRepository();
  const decision = repository.listByType('decision')[0];
  const meta = { createdAt: '2026-10-09T00:00:00.000Z', author: { name: 'Evograph sample' } };
  // Same domain object used by the interactive CLI's Git worktree linking flow.
  // This is explicitly a sample worktree, not a fabricated production commit.
  const change = repository.save(new Change({ kind: 'worktree', files: [{ path: 'AGENTS.md', status: '??' }] }, meta));
  new GraphRepository().link(decision.id, change.id, 'implemented_by', meta);
  const records = repository.list().sort().map(id => {
    const record = repository.load(id).toJSON();
    record.metadata.createdAt = meta.createdAt;
    return { id, ...record };
  });
  const fixture = {
    cliVersion: JSON.parse(readFileSync(join(cliRoot, 'package.json'), 'utf8')).version,
    provenance: 'Published @evograph/cli; close-session plus the CLI Change and GraphRepository domain APIs for a sample worktree.',
    records,
    context: run('context').replaceAll(/\x1b\[[0-9;]*m/g, ''),
  };
  writeFileSync(join(root, 'data/demo.json'), JSON.stringify(fixture, null, 2) + '\n');
  console.log(`Generated ${records.length} real records with CLI ${fixture.cliVersion}.`);
} finally {
  process.chdir(originalCwd);
  rmSync(scratch, { recursive: true, force: true });
}
