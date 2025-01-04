import markdownStyles from "./markdown-styles.module.css";

interface Props {
  content: string;
}

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div 
        className="prose prose-lg prose-blue mx-auto dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
