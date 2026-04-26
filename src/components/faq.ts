import type { ParagraphComponent } from "../types";

export const faqComponent = {
  id: "faq",
  name: "FAQ",
  description: "Group multiple questions and answers in one editor block.",
  markdownFormat: {
    mode: "markdown-with-html",
    description:
      "Use raw HTML inside markdown. The FAQ container wraps one or more faq-style collapsible items.",
    example: `<section data-type="faq">
  <details data-type="collapsible" data-variant="faq" open>
    <summary>What does Paragraph CMS do?</summary>
    <div>
      <p>It helps teams create, manage, and publish structured content.</p>
    </div>
  </details>
  <details data-type="collapsible" data-variant="faq" open>
    <summary>Can I localize page content?</summary>
    <div>
      <p>Yes. You can maintain language variants and translate editorial content.</p>
    </div>
  </details>
</section>`,
  },
  tiptap: {
    node: "faq",
    item: "collapsible",
    variant: "faq",
    suggestion: {
      kind: "faq",
      label: "FAQ",
      icon: "i-tabler-message-question",
    },
  },
  html: {
    container: {
      tag: "section",
      dataType: "faq",
    },
    item: {
      tag: "details",
      dataType: "collapsible",
      variant: "faq",
    },
  },
} as const satisfies ParagraphComponent;
