import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, } from "@tiptap/react";
import { faqComponent } from "../components/faq.js";
import { COLLAPSIBLE_NODE_NAME } from "./collapsible.js";
function FaqNodeView({ editor, getPos, node }) {
    return (_jsxs(NodeViewWrapper, { as: "section", "data-type": faqComponent.html.container.dataType, className: "faq-node", children: [_jsxs("div", { contentEditable: false, className: "faq-header", children: [_jsxs("div", { className: "faq-header-copy", children: [_jsx("span", { className: "faq-badge", children: faqComponent.name }), _jsx("span", { className: "faq-description", children: "Group multiple questions in one section." })] }), _jsxs("button", { type: "button", className: "inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted", contentEditable: false, onMouseDown: (event) => {
                            event.preventDefault();
                        }, onClick: () => {
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
                        }, children: [_jsx("span", { "aria-hidden": "true", children: "+" }), "Add question"] })] }), _jsx(NodeViewContent, { className: "faq-items" })] }));
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
    addNodeView() {
        return ReactNodeViewRenderer(FaqNodeView);
    },
    addCommands() {
        return {
            insertFaq: () => ({ commands }) => commands.insertContent({
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
