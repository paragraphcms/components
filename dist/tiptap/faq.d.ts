import { Node } from "@tiptap/core";
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        faq: {
            insertFaq: () => ReturnType;
        };
    }
}
export declare const Faq: Node<any, any>;
