export type ParagraphComponentSuggestion = {
  kind: string;
  label: string;
  icon?: string;
};

export type ParagraphComponentMarkdownFormat = {
  mode: "markdown-with-html";
  description: string;
  example: string;
};

export type ParagraphComponent = {
  id: string;
  name: string;
  description: string;
  markdownFormat?: ParagraphComponentMarkdownFormat;
  tiptap: {
    node: string;
    item?: string;
    variant?: string;
    suggestion?: ParagraphComponentSuggestion;
  };
  html: {
    container: {
      tag: string;
      dataType?: string;
    };
    item?: {
      tag: string;
      dataType?: string;
      variant?: string;
    };
  };
};
