import React from 'react';
import Layout from '../components/layout';
import { H3 } from '../components/headings';
import Link from 'next/Link'
import { getAllPosts } from '../lib/posts';

const TagsList = ({ tags }) => {
  if (!tags || !tags.length) {
    return null;
  }

  console.log('tags', tags);

  return (
    <div class="flex flex-row mt-4">
      {tags.map((tag) => (
        <Tag tag={tag} />
      ))}
    </div>
  );
}

const Tag = ({ tag }) => {
  console.log('tag', tag);
  return (
    // TODO probably need encodeURIComponent
    <Link href={`/tags/${tag.replace(' ', '-')}`}>
      <a
        className="uppercase italic text-xs font-bold border border-gray-400 hover:border-gray-600 transition duration-500 rounded p-2 mx-2 first:ml-0"
      >{tag}</a>
    </Link>
  );
}

export default function BlogIndex({ allPosts }) {
  return (
    <Layout>
      <ul>
        {allPosts.map((post, index) => (
          <React.Fragment key={post.slug}>
          <li
            className={`mb-8 ${index === 0 ? "" : "pt-4"}`}
            key={post.slug}>
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <a>
                <H3 className="pb-2">{post.title}</H3>
                {post.date && (
                  <p class="text-gray-600 pb-4">{new Date(post.date).toLocaleDateString()}</p>
                )}
                <p>{post.blurb}</p>
              </a>
            </Link>
            <TagsList tags={post.tags} />
          </li>
          {index !== allPosts.length && (
            <hr />
          )}
          </React.Fragment>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug", "blurb", "tags"]);

  return {
    props: { allPosts },
  };
}
