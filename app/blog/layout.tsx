import { FancyH1 } from "@/components/headings";

export default function BlogLayout({ children }) {
  return (
    <>
      <FancyH1>Blog</FancyH1>
      {children}
    </>
  )
}
