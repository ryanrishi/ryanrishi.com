import { animated, useSpringRef, useTransition } from 'react-spring';
import Link from '../components/link';
import Layout from '../components/layout';
import Head from '../components/head';
import { H1, H3 } from '../components/headings';
import { getAllProjects } from '../lib/projects';

const ProjectItem = ({ title, description, href, style }) => (
  <animated.div
    className="border rounded p-4"
    style={{ ...style }}
  >
    <H3>
      <Link
        href={href}
      >
        {title}
      </Link>
    </H3>
    {description}
  </animated.div>
);

export default function ProjectsIndex({ projects }) {
  const transApi = useSpringRef();
  const transition = useTransition(projects, {
    ref: transApi,
    trail: 500 / projects.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 }
  });

  return (
    <Layout>
      <Head title="Projects" />
      <H1>Projects</H1>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {transition((style, project) => (
          <ProjectItem
            title={project.name}
            description={project.description}
            href={project.permalink}
            style={style}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const projects = getAllProjects(['name', 'description', 'permalink', 'date']);

  return {
    props: { projects }
  };
}
