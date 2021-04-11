import Link from '../components/link';
import Layout from '../components/layout';
import Head from '../components/head';
import { H1 } from '../components/headings';
import { getAllProjects } from '../lib/projects';

const ProjectItem = ({ title, description, href }) => (
  <li className="pb-2">
    <Link href={href}>{title}</Link>&mdash;&nbsp;{description}
  </li>
)

export default function ProjectsIndex({ projects }) {
  return (
    <Layout>
      <Head title="Projects" />
      <H1>Projects</H1>
      <ul className="list-disc list-outside px-4">
        {projects.map((project) => (
          <ProjectItem
            key={project.permalink}
            href={project.permalink}
            description={project.description}
            title={project.name}
          />
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const projects = getAllProjects(['name', 'description', 'permalink', 'date']);

  return {
    props: { projects }
  };
}
