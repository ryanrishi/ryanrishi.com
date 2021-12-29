/* eslint-env node */
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

interface PostFrontMatter {
  title: string;
  description: string;
  image?: string;
  date: Date;
  layout: string;
  tags: string[]
}

interface WithSlug {
  slug: string
}

interface WithContent {
  content: string
}

export type Post = PostFrontMatter & WithSlug & WithContent

const postsDirectory = join(process.cwd(), 'pages', 'blog')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
    .filter(p => p.endsWith('.md'))
}

export function getPostBySlug(slug: string) : Post {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents) as unknown as { content: string, data: PostFrontMatter }

  return {
    // ...data,  // TODO add image to missing posts
    title: data.title,
    description: data.description,
    slug: realSlug,
    image: data.image || null,
    date: data.date,
    layout: data.layout,
    tags: data.tags,
    content,
  }
}

export function getAllPosts() : Post[] {
  const slugs = getPostSlugs()

  return slugs
    .map(slug => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}
