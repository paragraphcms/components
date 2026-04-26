# @paragraphcms/components

Shared Paragraph CMS component metadata and Tiptap extensions.

`@paragraphcms/components` gives you two things:

- a shared list of Paragraph editor components with `id`, `name`, and `description`
- a shared markdown-compatible HTML contract for AI and content pipelines through `markdownFormat`
- Tiptap extensions you can install in your editor without copying component definitions across projects

It is designed to be reused by apps such as `@paragraphcms/frontend` and libraries such as `@paragraphcms/parser`.

## Quick Start

Install the package together with the Tiptap peer dependencies you already use in your editor:

```bash
npm install @paragraphcms/components @tiptap/core @tiptap/react react react-dom
```

Current shared components:

- `collapsible`
- `faq`

## Table of Contents

- [Installation](#installation)
- [Component List](#component-list)
- [Markdown Format](#markdown-format)
- [Using with Tiptap](#using-with-tiptap)
- [Conditional Component Setup](#conditional-component-setup)
- [Exports](#exports)
- [Notes](#notes)
- [License](#license)

## Installation

Install from npm:

```bash
npm install @paragraphcms/components

# Alternative package managers
pnpm add @paragraphcms/components
yarn add @paragraphcms/components
```

Tiptap usage also requires:

```bash
npm install @tiptap/core @tiptap/react react react-dom
```

## Component List

Import the shared component registry:

```ts
import { paragraphComponents } from "@paragraphcms/components";

console.log(paragraphComponents);
```

Example:

```ts
import { paragraphComponents } from "@paragraphcms/components";

const simplifiedList = paragraphComponents.map((component) => ({
  id: component.id,
  name: component.name,
  description: component.description,
  markdownFormat: component.markdownFormat,
}));
```

If you want a single component definition:

```ts
import {
  collapsibleComponent,
  faqComponent,
} from "@paragraphcms/components";

console.log(collapsibleComponent.id); // "collapsible"
console.log(faqComponent.id); // "faq"
```

## Markdown Format

Each shared component can expose a `markdownFormat` field. This is the
recommended string contract when content is authored as markdown and still
needs to preserve Paragraph custom blocks.

The current mode is `markdown-with-html`, which means:

- the surrounding document can stay normal markdown
- custom Paragraph blocks should be embedded as raw HTML
- the raw HTML shape should match the shared component metadata in this package

Example:

```ts
import { collapsibleComponent, faqComponent } from "@paragraphcms/components";

console.log(collapsibleComponent.markdownFormat?.mode);
console.log(collapsibleComponent.markdownFormat?.example);
console.log(faqComponent.markdownFormat?.example);
```

`collapsibleComponent.markdownFormat?.example`:

```html
<details data-type="collapsible" open>
  <summary>Shipping options</summary>
  <div>
    <p>Offer standard, express, and courier delivery with clear timing.</p>
  </div>
</details>
```

`faqComponent.markdownFormat?.example`:

```html
<section data-type="faq">
  <details data-type="collapsible" data-variant="faq" open>
    <summary>What does Paragraph CMS do?</summary>
    <div>
      <p>It helps teams create, manage, and publish structured content.</p>
    </div>
  </details>
</section>
```

This package intentionally documents the shared contract, but does not ship a
full markdown parser for custom blocks by itself. Consumers can use the
metadata here to keep AI prompts, backend parsing, and frontend rendering in
sync.

## Using with Tiptap

Import the Tiptap extensions from the `./tiptap` subpath:

```tsx
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { Collapsible, Faq } from "@paragraphcms/components/tiptap";

export function MyEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Collapsible, Faq],
    content: {
      type: "doc",
      content: [],
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}
```

Insert a collapsible block:

```ts
editor.chain().focus().insertCollapsible().run();
```

Insert an FAQ block:

```ts
editor.chain().focus().insertFaq().run();
```

## Conditional Component Setup

If users can enable or disable components, use the shared metadata as the source of truth:

```tsx
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import {
  collapsibleComponent,
  faqComponent,
} from "@paragraphcms/components";
import { Collapsible, Faq } from "@paragraphcms/components/tiptap";

const enabledComponentIds = ["collapsible", "faq"];

const extensions = [
  StarterKit,
  ...(enabledComponentIds.includes(collapsibleComponent.id)
    ? [Collapsible]
    : []),
  ...(enabledComponentIds.includes(faqComponent.id) ? [Faq] : []),
];

const editor = useEditor({
  immediatelyRender: false,
  extensions,
});
```

Use the same registry to build slash-menu items or settings UI:

```ts
import {
  collapsibleComponent,
  faqComponent,
  paragraphComponents,
} from "@paragraphcms/components";

const enabledComponentIds = paragraphComponents.map(({ id }) => id);

const slashItems = [
  ...(enabledComponentIds.includes(collapsibleComponent.id) &&
  collapsibleComponent.tiptap.suggestion
    ? [collapsibleComponent.tiptap.suggestion]
    : []),
  ...(enabledComponentIds.includes(faqComponent.id) &&
  faqComponent.tiptap.suggestion
    ? [faqComponent.tiptap.suggestion]
    : []),
];
```

## Exports

Root exports:

```ts
import {
  collapsibleComponent,
  faqComponent,
  paragraphComponents,
} from "@paragraphcms/components";
```

Tiptap exports:

```ts
import { Collapsible, Faq } from "@paragraphcms/components/tiptap";
```

## Notes

- `Faq` should be registered together with `Collapsible`.
- `markdownFormat` documents the shared raw HTML contract that can be embedded inside markdown.
- The package currently ships source files from `src/**`, so it is meant for projects that already compile TypeScript.
- Scoped npm packages such as `@paragraphcms/components` must be published with public access. This package sets `"publishConfig": { "access": "public" }`.

## License

MIT
