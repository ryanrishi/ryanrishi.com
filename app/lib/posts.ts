import { compareDesc } from 'date-fns'
import fs from 'fs/promises'
import path from 'path'

export async function getAllPosts(): Promise<any[]> {
  const dir = path.join(process.cwd(), 'app', 'blog')
  const files = await fs.readdir(dir)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'))
  const posts = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const { metadata } = await import(`@/blog/${slug}.mdx`)
      return { slug, ...metadata }
    })
  )
  return posts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.date)))
}
