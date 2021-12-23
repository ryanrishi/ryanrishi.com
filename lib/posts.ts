/* eslint-env node */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface PostFrontMatter {
  title: string;
  description: string;
  image?: string;
  date: Date;
  layout: string;
  tags: string[]
}

export interface Post {
  title: string;
  slug: string;
  description: string;
  image?: string;  // TODO make image type w/ src, alt, height, width
  date: Date;
  layout: string;
  tags: string[];
  content: string;
}

const postsDirectory = join(process.cwd(), 'pages/blog');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
    .filter(p => p.endsWith('.md'))
}

export function getPostBySlug(slug: string) : Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents) as unknown as { content: string, data: PostFrontMatter };

  console.log({ data })

  return {
    title: data.title,
    description: data.description,
    slug,
    image: data.image || null,
    date: data.date,
    layout: data.layout,
    tags: data.tags,
    content
  }
}

export function getAllPosts() : Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map(slug => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
