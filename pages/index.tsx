import Layout from '../layouts'
import { GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export default function Index({ content, frontMatter }) {
  return (
    <Layout
      frontMatter={frontMatter}
    >
      {content}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // this is not ideal, but I could not figure out how to keep a separate `index.md` file
  const source = `\
---
title: Ryan Rishi
---

# Hi, I'm Ryan
I'm a software engineer focused on building great user experiences. I've worked at a handful of companies, from 20 person startups to 8,000 person public companies. I've grown products from ideation to thousands of users.

I'm most in my element in a product-focused backend-leaning-full-stack roles, and also comfortable in frontend development, infrastructure, and operations.

Outside of work, I enjoy listening to and playing music, cooking, traveling, and saying hi to dogs I pass on the street.

Here are some mantras I live by:
- Execute, or be executed
- Make excellence a habit
- Don't let perfection get in the way of progress
- _Fac si facis_ (Do it if you're going to do it). Or in millenial terms, Don't let your dreams be dreams.
`

  const { data, content } = matter(source)
  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      content: mdxSource,
      frontMatter: data
    }
  }
}
