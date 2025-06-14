export default function ProjectLayout(props) {
  console.log('ProjectLayout', props)

  return (
    <div className="prose dark:prose-invert max-w-none">
      {/* <h1>{project.name}</h1> */}
      {props.children}
    </div>
  )


  // {project.tags && (
  //   <div className="flex flex-row flex-wrap my-12 gap-4">
  //     {project.tags.map(tag => (
  //       <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
  //     ))}
  //   </div>
  // )}
}
