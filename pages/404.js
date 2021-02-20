/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unescaped-entities */

import Layout from '../components/layout';
import Head from '../components/head';

export default function NotFound() {
  return (
    <Layout>
      <Head title="404" />
      <h1>404</h1>
      <p>The page you requested doesn't exist. <a href="/">Return home</a>?</p>
    </Layout>
  );
}
