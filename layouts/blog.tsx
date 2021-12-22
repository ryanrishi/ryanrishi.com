import { MDXRemote } from 'next-mdx-remote';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import MDXComponents from '../components/mdx-components';
import Layout from '../components/layout';
import Head from '../components/head';
import Link from '../components/link';
import { H1 } from '../components/headings';

dayjs.extend(utc);

export default function Index({ children, frontMatter }) {
  const { title, date, tags, image, description } = frontMatter;

  return (
    <Layout>
      <Head
        title={title}
        date={date}
        description={description}
        image={image}
        tags={tags}
        isArticle
      />
      <div>
        <H1>{title}</H1>
        <p className="-mt-4 mb-4 text-gray-500">{dayjs.utc(date).format('MMMM D, YYYY')}</p>
        <hr className="my-4" />
        <MDXRemote
          {...children}
          components={MDXComponents}
        />
        <div className="flex items-center justify-center my-8">
          <Link href="/blog">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    </Layout>
  );
}
