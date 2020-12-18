import { Prism } from "react-syntax-highlighter";

export default function Code({ language = "", children }) {
  return (
    <code>{children}</code>
    // <Prism
    //   language={language}>
    //   {children}
    // </Prism>
  )
}
