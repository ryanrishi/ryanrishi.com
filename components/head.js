import NextHead from 'next/Head'
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

export default function Head(props) {
  const title = props.title ? `${props.title} | Ryan Rishi` : 'Ryan Rishi';
  const description = props.description || 'Full-stack software engineer and musician who loves cooking, camping, and flying.';

  const router = useRouter();

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google-site-verification" content="kausNF9hQubv5pYpPGZt6JjoZ45qF__IlkNNrlr-8ws" />

      <title key="title">{(props.title ? `${props.title} | ` : '') + 'Ryan Rishi'}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="og:site_name" content="Ryan Rishi" />
      <meta property="og:url"         key="og:url" content={`https://ryanrishi.com${router.pathname == '/' ? '' : router.pathname}`} />

      {props.isArticle ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}

      {props.date && (
        <>
          <meta property="article:published_time" content={dayjs(props.date).toISOString()} />
          <meta property="article:author" content="Ryan Rishi" />
        </>
      )}

      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />

      {props.image ? (
        <>
          <meta property="og:image"   content={`https://ryanrishi.com${props.image}`} />
          <meta name="twitter:card"   content="summary_large_image" />
          <meta name="twitter:image"  content={`https://ryanrishi.com${props.image}`} />
        </>
      ) : (
        <>
          <meta property="og:image"   content="https://ryanrishi.com/img/ryan-sitting.jpg" />
          <meta name="twitter:card"   content="summary" />
          <meta name="twitter:image"  content="https://ryanrishi.com/img/ryan-sitting.jpg" />
        </>
      )}

      {props.tags && props.tags.length && props.tags.map((tag) => (
        <meta property="article:tag" key={tag} content={tag} />
      ))}

      <meta name="twitter:site"    content="ryanrishi" />
      <meta name="twitter:creator" content="ryanrishi" />

      <link rel="icon" href="/assets/img/favicon.ico?v=1.1" />
      <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192"  href="/assets/img/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512"  href="/assets/img/android-chrome-512x512.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png" />
    </NextHead>
  );
}
