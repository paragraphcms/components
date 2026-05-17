export declare const collapsibleComponent: {
    readonly id: "collapsible";
    readonly name: "Collapsible";
    readonly description: "Expandable block for toggles, accordions, and inline disclosures.";
    readonly markdownFormat: {
        readonly mode: "markdown-with-html";
        readonly description: "Use raw HTML inside markdown. This maps to the shared Paragraph collapsible block.";
        readonly example: "<details data-type=\"collapsible\" open>\n  <summary>Shipping options</summary>\n  <div>\n    <p>Offer standard, express, and courier delivery with clear timing.</p>\n  </div>\n</details>";
    };
    readonly tiptap: {
        readonly node: "collapsible";
        readonly suggestion: {
            readonly kind: "collapsible";
            readonly label: "Collapsible";
            readonly icon: "i-tabler-chevron-down";
        };
    };
    readonly html: {
        readonly container: {
            readonly tag: "details";
            readonly dataType: "collapsible";
        };
    };
};
