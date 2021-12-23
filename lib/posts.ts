/* eslint-env node */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface Post {
  title?: string;
  slug?: string;
  description?: string;
  image?: string;  // TODO make image type w/ src, alt, height, width
  date?: Date;
  layout?: string;
  tags?: string[];
}

const postsDirectory = join(process.cwd(), 'pages/blog');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
    .filter(p => p.endsWith('.md'))
}

export function getPostBySlug(slug, fields = []) : Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
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

export function getAllPosts(fields = []) : Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map(slug => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
