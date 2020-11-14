import Link from 'next/Link'

import { frontMatter as mdxFtw } from './mdx-ftw.mdx'

const pages = [mdxFtw]

const formatPath = (p) => p.replace(/\.mdx$/, '')

const BlogIndex = () => (
  <>
    <h1>Blog</h1>
    <ul>
      {pages.map((page) => (
        <li key={page.__resourcePath}>
          <Link href={formatPath(page.__resourcePath)}>
            <a>
              <h2>{page.title}</h2>
              <p>{page.snippet}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </>
)

export default BlogIndex
