/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unescaped-entities */

import Link from '../components/link';
import Layout from '../components/layout';
import Head from '../components/head';

export default function NotFound() {
  return (
    <Layout>
      <Head title="404" />
      <h1>404</h1>
      <p>The page you requested doesn't exist. <Link href="/">Return home</Link>?</p>
    </Layout>
  );
}
