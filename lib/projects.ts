/* eslint-env node */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  name?: string;
  slug?: string;
  description?: string;
  image?: ProjectImage;
  permalink?: string;
  date?: string;
}

const projectsDir = join(process.cwd(), 'pages/projects');

export function getProjectSlugs() {
  return fs.readdirSync(projectsDir)
    .filter(p => p.endsWith('.md'))
}

export function getProjectBy(slug, fields = []) : Project {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(projectsDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const project = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      project[field] = realSlug;
    }

    if (field === 'content') {
      project[field] = content;
    }

    if (data[field]) {
      project[field] = data[field];
    }
  });

  return project;
}

export function getAllProjects(fields = []) : Project[] {
  const slugs = getProjectSlugs();
  return slugs
    .map(slug => getProjectBy(slug, fields))
    // sort projects by date in descending order
    .sort((project1, project2) => (project1.date > project2.date ? -1 : 1));
}
