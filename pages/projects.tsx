import { animated, useSpringRef, useTransition } from 'react-spring';
import Image from 'next/image';
import Link from '../components/link';
import Layout from '../components/layout';
import Head from '../components/head';
import { H1, H3 } from '../components/headings';
import { getAllProjects, Project } from '../lib/projects';
import { GetStaticProps } from 'next';

interface ProjectsProps {
  projects: Project[];
}

const ProjectItem = ({ project, style }) => {
  const { name: title, description, permalink: href, image } = project;

  return (
    <animated.li
      className="border rounded shadow"
      style={{ ...style }}
    >
      <div
        className="flex items-center justify-center"
      >
        <Link
          href={href}
        >
          <Image
            className="object-cover transition duration-500 ease-in-out transform hover:scale-105 w-full h-full rounded-t"
            src={image?.src || 'https://via.placeholder.com/400'}
            width="1600"
            height="1600"
          />
        </Link>
      </div>
      <div
        className="p-4"
      >
        <H3>
          <Link
            href={href}
            invert
          >
            {title}
          </Link>
        </H3>
        {description}
      </div>
    </animated.li>
  );
};

export default function ProjectsIndex({ projects } : ProjectsProps) {
  const transApi = useSpringRef();
  const transition = useTransition(projects, {
    ref: transApi,
    trail: 400 / projects.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 }
  });

  return (
    <Layout>
      <Head title="Projects" />
      <H1>Projects</H1>
      <ul
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {transition((style, project) => (
          <ProjectItem
            project={project}
            style={style}
          />
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const projects = getAllProjects(['name', 'description', 'permalink', 'date', 'image']);

  return {
    props: { projects }
  };
}
