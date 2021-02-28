import NextHead from 'next/head';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

dayjs.extend(utc);

function Head({ title: titleFromProps, description, isArticle, date, image, tags }) {
  const title = titleFromProps ? `${titleFromProps} | Ryan Rishi` : 'Ryan Rishi';
  const publishedTime = date ? dayjs.utc(date).toISOString() : dayjs.utc().toISOString();

  const router = useRouter();

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google-site-verification" content="kausNF9hQubv5pYpPGZt6JjoZ45qF__IlkNNrlr-8ws" />

      <title key="title">{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:site_name" content="Ryan Rishi" />
      <meta property="og:description" content={description} />
      <meta property="og:url" key="og:url" content={`https://ryanrishi.com${router.pathname === '/' ? '' : router.pathname}`} />
      <meta name="author" content="Ryan Rishi" />
      <meta name="image" property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@ryanrishi" />

      {isArticle && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content="Ryan Rishi" />
        </>
      )}

      {tags.map((tag) => (
        <meta property="article:tag" key={tag} content={tag} />
      ))}

      <link rel="icon" href="/img/favicon.ico?v=1.1" />
      <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/img/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/img/android-chrome-512x512.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
    </NextHead>
  );
}

Head.propTypes = {
  title: PropTypes.string, // eslint-disable-line react/require-default-props
  description: PropTypes.string,
  isArticle: PropTypes.bool,
  image: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

Head.defaultProps = {
  description: 'Full-stack software engineer and musician who loves cooking, camping, and flying.',
  isArticle: false,
  image: '/img/ryan-landscape.jpg',
  tags: []
};

export default Head;
