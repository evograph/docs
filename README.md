# Evograph website

Next.js product site, MDX documentation, and a public graph explorer for [Evograph](https://github.com/evograph/cli).

## Develop

Use Node.js 22.12+ (CI uses Node 22 and 24).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Before submitting changes:

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

## Architecture

App Router pages are prerendered. Documentation lives in app/docs as MDX. components/graph-demo.tsx performs local selection and traversal over data/demo.json; no user repository content is accepted. The two client components beyond navigation are the clipboard button and demo. Fonts are bundled locally through Fontsource; no runtime font CDN call is needed.

The site has no application database, authentication, analytics integration, forms backend, or AI API dependency. No application secrets or custom environment variables are required. Vercel sets VERCEL_ENV; only production permits indexing. Preview noindex is a crawler instruction, not an access-control boundary. Keep previews free of confidential content.

## Public sample provenance

`npm run generate:demo` uses pinned published @evograph/cli 0.1.2 in a temporary directory. It runs init and close-session, then uses the actual CLI domain APIs to attach a sample worktree Change. It exports records and actual ecs context output. Creation times are normalized; hashes exclude metadata. It does not read the maintainer's local graph or Git author configuration. Tests validate hashes, graph endpoints, context, and absence of host identifiers.

Commit the generated data/demo.json. The website build does not need the CLI or run it in a server function.

## Brand

`npm run generate:brand` exports original SVG lockups, icons, and an outlined SVG/PNG social image to public/brand. Fontkit converts glyphs to paths so the exported vectors do not depend on installed fonts. See public/brand/README.md for usage. Generated assets are committed; deployment does not regenerate them.

## Deploy to Vercel

Import evograph/docs, framework Next.js, root ./, build npm run build, install npm ci, Node 22.x. No custom output directory or application environment variables. Use an approved account plan for the intended use; do not assume Hobby permits commercial activity. Review a preview before production promotion and custom-domain cutover. Set the production branch deliberately to avoid unintended production releases.

Add evograph.app and redirect www.evograph.app to the apex using the values Vercel displays for this project. Preserve email and unrelated DNS. Verify TLS and all routes after cutover. Revert DNS from the saved inventory and restore the previous deployment if necessary. The private launch dossier belongs outside this public repository.

## Dependency maintenance

The lockfile is committed. Runtime audit currently reports zero known advisories (9 October 2026). A braces stack-exhaustion advisory remains in the development-only Next.js lint toolchain; npm's offered automatic fix downgrades Next.js lint configuration across major versions and was not applied. Avoid untrusted custom glob patterns in lint configuration. Reassess upstream fixes before future dependency updates. This is not a claim that the application has no possible vulnerabilities.

GitHub workflows check lint, types, sample integrity, and production build. Dependency update automation should open PRs rather than write to main. Use Muhammad Atif's verified GitHub identity for maintainer commits; do not rewrite prior authorship.
