import { Node } from "@tiptap/core";
export declare const COLLAPSIBLE_NODE_NAME: "collapsible";
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        collapsible: {
            insertCollapsible: () => ReturnType;
        };
    }
}
export declare const Collapsible: Node<any, any>;
