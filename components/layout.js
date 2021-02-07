import Head from 'next/Head';
import Header from './header';
import Footer from './footer';
import { useRouter } from 'next/router';

export default function Layout({ size = 'lg', children }) {
  const router = useRouter();

  return(
    <>
      <Head>
        <title key="title">Ryan Rishi</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="author" content="Ryan Rishi" />
        <meta name="google-site-verification" content="kausNF9hQubv5pYpPGZt6JjoZ45qF__IlkNNrlr-8ws" />

        <meta property="og:site_name"   key="og:site_name" content="Ryan Rishi" />
        <meta property="og:title"       key="og:title" content="Ryan Rishi" />
        <meta property="og:type"        key="og:type" content="website" />
        <meta property="og:description" key="og:description" content="Full-stack software engineer and musician who loves cooking, camping, and flying." />
        <meta property="og:url"         key="og:url" content={`https://ryanrishi.com${router.pathname == '/' ? '' : router.pathname}`} />
        <meta property="og:image"       key="og:image" content="/img/ryan-sitting.jpg" />

        <link rel="icon" href="/assets/img/favicon.ico?v=1.1" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/assets/img/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512"  href="/assets/img/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png" />
      </Head>
      <Header />
      {children}
      <hr />
      <Footer />
    </>
   );
}
