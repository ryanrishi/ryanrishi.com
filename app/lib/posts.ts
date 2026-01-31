import { compareDesc } from 'date-fns'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

export interface Post {
  slug: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  image?: string
}

export async function getAllPosts(): Promise<Post[]> {
  const dir = path.join(process.cwd(), 'app', 'blog')
  const files = await fs.readdir(dir)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'))
  const posts = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const filePath = path.join(dir, fileName)
      const fileContent = await fs.readFile(filePath, 'utf8')
      const { data } = matter(fileContent)
      return { slug, ...data } as Post
    }),
  )
  return posts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
}
