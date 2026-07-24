import type { MetadataRoute } from 'next'

import { kebabCase } from '@/lib/kebab-case'
import { SITE_URL } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'

const staticRoutes = ['', '/blog', '/projects', '/music', '/contact', '/links', '/tags']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ])

  const tags = Array.from(new Set([
    ...posts.flatMap(post => post.tags),
    ...projects.flatMap(project => project.tags ?? []),
  ]))

  return [
    ...staticRoutes.map(route => ({ url: `${SITE_URL}${route}` })),
    ...posts.map(post => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
    })),
    ...projects.map(project => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: project.date,
    })),
    ...tags.map(tag => ({ url: `${SITE_URL}/tags/${kebabCase(tag)}` })),
  ]
}
