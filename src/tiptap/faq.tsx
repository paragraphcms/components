import { Node, mergeAttributes } from "@tiptap/core";
import type { NodeViewRenderer } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type NodeViewProps,
} from "@tiptap/react";
import { faqComponent } from "../components/faq.js";
import { COLLAPSIBLE_NODE_NAME } from "./collapsible.js";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    faq: {
      insertFaq: () => ReturnType;
    };
  }
}

function FaqNodeView({ editor, getPos, node }: NodeViewProps) {
  return (
    <NodeViewWrapper
      as="section"
      data-type={faqComponent.html.container.dataType}
      className="faq-node"
    >
      <div contentEditable={false} className="faq-header">
        <div className="faq-header-copy">
          <span className="faq-badge">{faqComponent.name}</span>
          <span className="faq-description">
            Group multiple questions in one section.
          </span>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          contentEditable={false}
          onMouseDown={(event) => {
            event.preventDefault();
          }}
          onClick={() => {
            if (typeof getPos !== "function") {
              return;
            }

            const pos = getPos();

            if (typeof pos !== "number") {
              return;
            }

            editor
              .chain()
              .focus()
              .insertContentAt(pos + node.nodeSize - 1, {
                type: COLLAPSIBLE_NODE_NAME,
                attrs: {
                  open: true,
                  summary: "Question",
                  variant: faqComponent.tiptap.variant,
                },
                content: [
                  {
                    type: "paragraph",
                  },
                ],
              })
              .run();
          }}
        >
          <span aria-hidden="true">+</span>
          Add question
        </button>
      </div>

      <NodeViewContent className="faq-items" />
    </NodeViewWrapper>
  );
}

export const Faq = Node.create({
  name: faqComponent.tiptap.node,
  group: "block",
  content: `${COLLAPSIBLE_NODE_NAME}+`,
  defining: true,
  isolating: true,

  parseHTML() {
    return [
      {
        tag: `${faqComponent.html.container.tag}[data-type="${faqComponent.html.container.dataType}"]`,
      },
      {
        tag: `div[data-type="${faqComponent.html.container.dataType}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      faqComponent.html.container.tag,
      mergeAttributes(HTMLAttributes, {
        "data-type": faqComponent.html.container.dataType,
      }),
      0,
    ];
  },

  addNodeView(): NodeViewRenderer {
    return ReactNodeViewRenderer(FaqNodeView);
  },

  addCommands() {
    return {
      insertFaq:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: faqComponent.tiptap.node,
            content: [
              {
                type: COLLAPSIBLE_NODE_NAME,
                attrs: {
                  open: true,
                  summary: "Question",
                  variant: faqComponent.tiptap.variant,
                },
                content: [
                  {
                    type: "paragraph",
                  },
                ],
              },
            ],
          }),
    };
  },
});
