import ReactPlaceholder from "react-placeholder";
import Layout from "../components/layout";
import Link from "next/Link";
import { getAllProjects } from '../lib/projects';

export default function ProjectsIndex({ projects }) {
  return (
    <Layout>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li><Link href={project.permalink}>{project.name}</Link>&mdash; {project.blurb}</li>
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
};
