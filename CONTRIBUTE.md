# Contributing to `@paragraphcms/components`

This package is the shared source of truth for Paragraph CMS editor components.

When you add a new component here, do not add everything into one file. Keep the same structure used by `collapsible` and `faq`: one metadata file per component and one Tiptap file per extension.

## What to Add

When adding a new component, update all relevant places below.

### 1. Add component metadata

Create a new file in:

```text
src/components/<component-id>.ts
```

Example:

```text
src/components/hero.ts
```

The file should export one `ParagraphComponent` object with:

- `id`
- `name`
- `description`
- `tiptap.node`
- optional `tiptap.item`
- optional `tiptap.variant`
- optional `tiptap.suggestion`
- `html.container`
- optional `html.item`

Use the existing files as reference:

- `src/components/collapsible.ts`
- `src/components/faq.ts`

### 2. Export the component from the root package

Update:

- `src/index.ts`
- `src/list.ts`

What to do:

- export the new component from `src/index.ts`
- add it to `paragraphComponents` in `src/list.ts`

If it should appear in account settings or component pickers, it must exist in `paragraphComponents`.

### 3. Add Tiptap support

If the component has its own Tiptap node or extension, create a new file in:

```text
src/tiptap/<component-id>.tsx
```

Example:

```text
src/tiptap/hero.tsx
```

Then update:

- `src/tiptap/index.ts`

What the extension usually needs:

- node name
- `parseHTML`
- `renderHTML`
- optional commands
- optional React node view

If the new component depends on another shared component, keep that relationship explicit. Example: `Faq` depends on `Collapsible`.

### 4. Reuse shared metadata inside the Tiptap extension

Do not duplicate ids, node names, `data-type`, or suggestion labels inside the extension if the metadata file already defines them.

The preferred pattern is:

- metadata in `src/components/<component>.ts`
- extension imports metadata from that file

That keeps frontend and parser aligned.

### 5. Update consumer projects

After adding a new shared component, check the places that consume this package.

Current consumers in this workspace:

- `paragraph-cms/packages/frontend`
- `parser`

Typical follow-up work:

- add the component to slash-menu suggestions in frontend
- register the Tiptap extension in frontend when enabled
- add parser support for HTML or Tiptap rendering if needed
- expose component selection in settings if it should be user-toggleable

### 6. Update documentation

Update:

- `README.md`

Add:

- the new component to the current component list
- import examples if new exports were added
- Tiptap usage examples if the extension is public

If the new component changes the expected contribution workflow, update this file too.

## File Checklist

For a standard new component, the expected diff usually includes:

```text
src/components/<component-id>.ts
src/index.ts
src/list.ts
src/tiptap/<component-id>.tsx
src/tiptap/index.ts
README.md
```

Sometimes it also includes consumer updates in:

```text
../paragraph-cms/packages/frontend/...
../parser/...
```

## Conventions

- Keep each component configuration in its own file.
- Keep each Tiptap extension in its own file.
- Prefer explicit exports over generated registries.
- Use shared metadata instead of repeating string literals in multiple projects.
- Do not introduce extra abstraction layers unless they remove real duplication.

## Verification

Before publishing or consuming the package in another project, verify:

```bash
npm pack --dry-run
```

And then verify the consumers that use the package, for example:

```bash
cd ../paragraph-cms/packages/frontend
bun run typecheck
bun run build

cd ../../../parser
bun run build
```
