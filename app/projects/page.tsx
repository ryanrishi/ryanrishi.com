import { Metadata } from 'next'

import ProjectsIndex from '.'

export const metadata: Metadata = {
  title: 'Projects | Ryan Rishi',
}

export default function Projects() {
  return <ProjectsIndex />
}
