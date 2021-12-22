import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const pagesDir = path.join(process.cwd(), 'pages');

export default function Page({ page }) {
  return (
    <p>{page.content}</p>
  );
}

export function getStaticPaths() {
  const pages = fs.readdirSync(pagesDir)
    .filter(page => page.endsWith('.md'))
    .map(page => page.replace(/.md$/, ''))

  const rv = {
    paths: pages.map(page => ({
      params: {
        slug: page
      }
    })),
    fallback: false
  };
  console.log('getStaticPaths', JSON.stringify(rv, null, 2));
  return rv;
}

export function getStaticProps({ params }) {
  console.log('params', params);

  const pagePath = path.join(pagesDir, `${params.slug}.md`);
  const contents = fs.readFileSync(pagePath, 'utf8');
  const { data, content } = matter(contents);

  // console.log({ data, content });

  return {
    props: {
      page: {
        ...data,
        content
      }
    }
  };
}
