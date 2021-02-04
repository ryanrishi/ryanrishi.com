import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function Code({ language = "", children }) {
  return (
    <SyntaxHighlighter
      language={language}>
      {children}
    </SyntaxHighlighter>
  );
}
