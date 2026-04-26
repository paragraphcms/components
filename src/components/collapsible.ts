import type { ParagraphComponent } from "../types";

export const collapsibleComponent = {
  id: "collapsible",
  name: "Collapsible",
  description: "Expandable block for toggles, accordions, and inline disclosures.",
  markdownFormat: {
    mode: "markdown-with-html",
    description:
      "Use raw HTML inside markdown. This maps to the shared Paragraph collapsible block.",
    example: `<details data-type="collapsible" open>
  <summary>Shipping options</summary>
  <div>
    <p>Offer standard, express, and courier delivery with clear timing.</p>
  </div>
</details>`,
  },
  tiptap: {
    node: "collapsible",
    suggestion: {
      kind: "collapsible",
      label: "Collapsible",
      icon: "i-tabler-chevron-down",
    },
  },
  html: {
    container: {
      tag: "details",
      dataType: "collapsible",
    },
  },
} as const satisfies ParagraphComponent;
