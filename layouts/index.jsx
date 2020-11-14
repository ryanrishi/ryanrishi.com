const Index = ({ children, frontMatter }) => {
  const { title, snippet } = frontMatter;

  return (
    <div>
      <h1>{title}</h1>
      <p>{snippet}</p>
      <section>{children}</section>
    </div>
)}
export default Index;
//  ({ title, snippet }) => ({ children }) => (
//   )
