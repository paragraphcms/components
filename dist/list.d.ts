export declare const paragraphComponents: readonly [{
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
}, {
    readonly id: "faq";
    readonly name: "FAQ";
    readonly description: "Group multiple questions and answers in one editor block.";
    readonly markdownFormat: {
        readonly mode: "markdown-with-html";
        readonly description: "Use raw HTML inside markdown. The FAQ container wraps one or more faq-style collapsible items.";
        readonly example: "<section data-type=\"faq\">\n  <details data-type=\"collapsible\" data-variant=\"faq\" open>\n    <summary>What does Paragraph CMS do?</summary>\n    <div>\n      <p>It helps teams create, manage, and publish structured content.</p>\n    </div>\n  </details>\n  <details data-type=\"collapsible\" data-variant=\"faq\" open>\n    <summary>Can I localize page content?</summary>\n    <div>\n      <p>Yes. You can maintain language variants and translate editorial content.</p>\n    </div>\n  </details>\n</section>";
    };
    readonly tiptap: {
        readonly node: "faq";
        readonly item: "collapsible";
        readonly variant: "faq";
        readonly suggestion: {
            readonly kind: "faq";
            readonly label: "FAQ";
            readonly icon: "i-tabler-message-question";
        };
    };
    readonly html: {
        readonly container: {
            readonly tag: "section";
            readonly dataType: "faq";
        };
        readonly item: {
            readonly tag: "details";
            readonly dataType: "collapsible";
            readonly variant: "faq";
        };
    };
}];
