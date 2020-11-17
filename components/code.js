import { Prism } from "react-syntax-highlighter";

export default function Code({ language = "", children }) {
  return (
    <Prism
      language={language}>
      {children}
    </Prism>
  )
}
