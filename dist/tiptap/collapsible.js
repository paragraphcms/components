import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, } from "@tiptap/react";
import { collapsibleComponent } from "../components/collapsible.js";
export const COLLAPSIBLE_NODE_NAME = collapsibleComponent.tiptap.node;
function CollapsibleNodeView({ node, updateAttributes, editor, getPos, }) {
    const open = Boolean(node.attrs.open);
    const variant = node.attrs.variant === "faq" ? "faq" : "default";
    const collapsiblePosition = typeof getPos === "function" ? getPos() : undefined;
    const inFaqContainer = variant === "faq" &&
        typeof collapsiblePosition === "number" &&
        editor.state.doc.resolve(collapsiblePosition).parent.type.name === "faq";
    const summary = typeof node.attrs.summary === "string" && node.attrs.summary.length > 0
        ? node.attrs.summary
        : variant === "faq"
            ? "Question"
            : "Toggle";
    return (_jsxs(NodeViewWrapper, { as: "details", "data-type": "collapsible", "data-variant": variant, open: open, className: "collapsible-node", children: [_jsxs("summary", { className: "collapsible-summary", onClick: (event) => {
                    event.preventDefault();
                    updateAttributes({ open: !open });
                }, children: [_jsx("span", { "aria-hidden": "true", className: `inline-flex w-4 shrink-0 justify-center text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`, children: "v" }), variant === "faq" && !inFaqContainer ? (_jsx("span", { contentEditable: false, className: "faq-badge", children: "FAQ" })) : null, _jsx("input", { value: summary, "aria-label": variant === "faq" ? "Question" : "Summary", className: `min-w-0 flex-1 bg-transparent text-sm font-medium outline-none ${variant === "faq" ? "faq-question" : ""}`, onClick: (event) => {
                            event.stopPropagation();
                        }, onChange: (event) => {
                            updateAttributes({ summary: event.target.value });
                        }, onKeyDown: (event) => {
                            event.stopPropagation();
                        } }), inFaqContainer ? (_jsx("button", { type: "button", "aria-label": "Remove question", className: "faq-item-remove inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted", contentEditable: false, onMouseDown: (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }, onClick: (event) => {
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
                        }, children: _jsx("span", { "aria-hidden": "true", children: "x" }) })) : null] }), _jsxs("div", { className: "collapsible-content", children: [variant === "faq" ? (_jsx("div", { contentEditable: false, className: "faq-answer-label", children: "Answer" })) : null, _jsx(NodeViewContent, { className: "collapsible-content-inner" })] })] }));
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
                    const variant = element.getAttribute("data-variant") === "faq" ||
                        element.getAttribute("data-type") === "faq-item"
                        ? "faq"
                        : "default";
                    return (summaryElement?.textContent?.trim() ||
                        (variant === "faq" ? "Question" : "Toggle"));
                },
            },
            variant: {
                default: "default",
                parseHTML: (element) => element.getAttribute("data-variant") === "faq" ||
                    element.getAttribute("data-type") === "faq-item"
                    ? "faq"
                    : "default",
                renderHTML: (attributes) => attributes.variant === "faq" ? { "data-variant": "faq" } : {},
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
        const variant = HTMLAttributes.variant === "faq" ? "faq" : "default";
        const summary = typeof HTMLAttributes.summary === "string" && HTMLAttributes.summary.length > 0
            ? HTMLAttributes.summary
            : variant === "faq"
                ? "Question"
                : "Toggle";
        const { open, summary: _summary, variant: _variant, ...restAttributes } = HTMLAttributes;
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
    addNodeView() {
        return ReactNodeViewRenderer(CollapsibleNodeView);
    },
    addCommands() {
        return {
            insertCollapsible: () => ({ commands }) => commands.insertContent({
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
