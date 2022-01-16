/* eslint-env node */
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

export interface Post {
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
  date: Date;
  layout: string;
  tags: string[];
}

const postsDirectory = join(process.cwd(), 'pages', 'blog')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
    .filter(p => p.endsWith('.md'))
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents) as unknown as { content: string, data: Omit<Post, "content"> }

  return {
    ...data,
    slug: realSlug,
    image: data.image,
    content,
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()

  return slugs
    .map(slug => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export function getMostRecentPosts(limit: number): Post[] {
  return getAllPosts().slice(0, limit)
}
