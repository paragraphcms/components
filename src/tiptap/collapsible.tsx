import { Node, mergeAttributes } from "@tiptap/core";
import type { NodeViewRenderer } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type NodeViewProps,
} from "@tiptap/react";
import { collapsibleComponent } from "../components/collapsible.js";

export const COLLAPSIBLE_NODE_NAME = collapsibleComponent.tiptap.node;

type CollapsibleVariant = "default" | "faq";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    collapsible: {
      insertCollapsible: () => ReturnType;
    };
  }
}

function CollapsibleNodeView({
  node,
  updateAttributes,
  editor,
  getPos,
}: NodeViewProps) {
  const open = Boolean(node.attrs.open);
  const variant: CollapsibleVariant =
    node.attrs.variant === "faq" ? "faq" : "default";
  const collapsiblePosition = typeof getPos === "function" ? getPos() : undefined;
  const inFaqContainer =
    variant === "faq" &&
    typeof collapsiblePosition === "number" &&
    editor.state.doc.resolve(collapsiblePosition).parent.type.name === "faq";
  const summary =
    typeof node.attrs.summary === "string" && node.attrs.summary.length > 0
      ? node.attrs.summary
      : variant === "faq"
        ? "Question"
        : "Toggle";

  return (
    <NodeViewWrapper
      as="details"
      data-type="collapsible"
      data-variant={variant}
      open={open}
      className="collapsible-node"
    >
      <summary
        className="collapsible-summary"
        onClick={(event) => {
          event.preventDefault();
          updateAttributes({ open: !open });
        }}
      >
        <span
          aria-hidden="true"
          className={`inline-flex w-4 shrink-0 justify-center text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          v
        </span>
        {variant === "faq" && !inFaqContainer ? (
          <span contentEditable={false} className="faq-badge">
            FAQ
          </span>
        ) : null}
        <input
          value={summary}
          aria-label={variant === "faq" ? "Question" : "Summary"}
          className={`min-w-0 flex-1 bg-transparent text-sm font-medium outline-none ${
            variant === "faq" ? "faq-question" : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onChange={(event) => {
            updateAttributes({ summary: event.target.value });
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
        />
        {inFaqContainer ? (
          <button
            type="button"
            aria-label="Remove question"
            className="faq-item-remove inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
            contentEditable={false}
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              if (typeof getPos !== "function") {
                return;
              }

              const pos = getPos();

              if (typeof pos !== "number") {
                return;
              }

              const $pos = editor.state.doc.resolve(pos);
              const parent = $pos.parent;

              if (parent.type.name === "faq" && parent.childCount === 1) {
                const parentPos = pos - $pos.parentOffset - 1;

                if (parentPos < 0) {
                  return;
                }

                editor
                  .chain()
                  .focus()
                  .deleteRange({ from: parentPos, to: parentPos + parent.nodeSize })
                  .run();
                return;
              }

              editor
                .chain()
                .focus()
                .deleteRange({ from: pos, to: pos + node.nodeSize })
                .run();
            }}
          >
            <span aria-hidden="true">x</span>
          </button>
        ) : null}
      </summary>

      <div className="collapsible-content">
        {variant === "faq" ? (
          <div contentEditable={false} className="faq-answer-label">
            Answer
          </div>
        ) : null}
        <NodeViewContent className="collapsible-content-inner" />
      </div>
    </NodeViewWrapper>
  );
}

export const Collapsible = Node.create({
  name: collapsibleComponent.tiptap.node,
  group: "block",
  content: "block+",
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      open: {
        default: true,
        parseHTML: (element) => element.hasAttribute("open"),
        renderHTML: (attributes) => (attributes.open ? { open: "open" } : {}),
      },
      summary: {
        default: "Toggle",
        parseHTML: (element) => {
          const summaryElement = element.querySelector("summary");
          const variant =
            element.getAttribute("data-variant") === "faq" ||
            element.getAttribute("data-type") === "faq-item"
              ? "faq"
              : "default";

          return (
            summaryElement?.textContent?.trim() ||
            (variant === "faq" ? "Question" : "Toggle")
          );
        },
      },
      variant: {
        default: "default",
        parseHTML: (element) =>
          element.getAttribute("data-variant") === "faq" ||
          element.getAttribute("data-type") === "faq-item"
            ? "faq"
            : "default",
        renderHTML: (attributes) =>
          attributes.variant === "faq" ? { "data-variant": "faq" } : {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `${collapsibleComponent.html.container.tag}[data-type="${collapsibleComponent.html.container.dataType}"]`,
      },
      {
        tag: 'details[data-type="faq-item"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const variant: CollapsibleVariant =
      HTMLAttributes.variant === "faq" ? "faq" : "default";
    const summary =
      typeof HTMLAttributes.summary === "string" && HTMLAttributes.summary.length > 0
        ? HTMLAttributes.summary
        : variant === "faq"
          ? "Question"
          : "Toggle";
    const { open, summary: _summary, variant: _variant, ...restAttributes } =
      HTMLAttributes;

    return [
      "details",
      mergeAttributes(restAttributes, {
        "data-type": collapsibleComponent.html.container.dataType,
        ...(variant === "faq" ? { "data-variant": "faq" } : {}),
        ...(open ? { open: "open" } : {}),
      }),
      ["summary", summary],
      ["div", 0],
    ];
  },

  addNodeView(): NodeViewRenderer {
    return ReactNodeViewRenderer(CollapsibleNodeView);
  },

  addCommands() {
    return {
      insertCollapsible:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: COLLAPSIBLE_NODE_NAME,
            attrs: {
              open: true,
              summary: "Toggle",
              variant: "default",
            },
            content: [
              {
                type: "paragraph",
              },
            ],
          }),
    };
  },
});
