import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
const fixture = JSON.parse(
  readFileSync(new URL("../data/demo.json", import.meta.url), "utf8"),
);

test("public records preserve the CLI content hashes and schema", () => {
  for (const record of fixture.records) {
    const hash = createHash("sha256")
      .update(
        JSON.stringify({ header: record.header, content: record.content }),
      )
      .digest("hex");
    assert.equal(record.id, hash);
    assert.equal(record.header.schemaVersion, 1);
    assert.deepEqual(record.metadata.author, { name: "Evograph sample" });
  }
});
test("sample graph has valid endpoints and both directions of the decision trail", () => {
  const ids = new Set(fixture.records.map((r) => r.id));
  const edges = fixture.records.filter((r) => r.header.type === "edge");
  assert.deepEqual(edges.map((e) => e.content.relation).sort(), [
    "implemented_by",
    "solves",
  ]);
  for (const edge of edges) {
    assert.ok(ids.has(edge.content.from));
    assert.ok(ids.has(edge.content.to));
  }
  assert.match(fixture.context, /Keep decisions with the repository/);
  assert.match(fixture.context, /implemented_by/);
  assert.equal(
    fixture.records.find((r) => r.header.type === "change").content.files[0]
      .path,
    "AGENTS.md",
  );
  assert.doesNotMatch(
    JSON.stringify(fixture),
    /\/Users\/|author-email|dev\.muhammad|unitedsol/,
  );
});
