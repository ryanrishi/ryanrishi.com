import Link from 'next/link';
import Layout from '../components/layout';
import Head from '../components/head';
import { getAllProjects } from '../lib/projects';

export default function ProjectsIndex({ projects }) {
  return (
    <Layout>
      <Head title="Projects" />
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.permalink}>
            <Link href={project.permalink}>{project.name}</Link>
            &mdash;&nbsp;
            {project.blurb}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const projects = getAllProjects(['name', 'blurb', 'permalink', 'date']);

  return {
    props: { projects }
  };
}
