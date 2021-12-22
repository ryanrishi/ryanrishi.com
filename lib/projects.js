/* eslint-env node */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const projectsDir = join(process.cwd(), 'pages/projects');

export function getProjectSlugs() {
  return fs.readdirSync(projectsDir)
    .filter(p => p.endsWith('.md'))
}

export function getProjectBy(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(projectsDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }

    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllProjects(fields = []) {
  const slugs = getProjectSlugs();
  return slugs
    .map(slug => getProjectBy(slug, fields))
    // sort projects by date in descending order
    .sort((project1, project2) => (project1.date > project2.date ? '-1' : '1'));
}
