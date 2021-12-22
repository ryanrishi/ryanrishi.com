import { H1 } from '../components/headings';
import Link from '../components/link';
import Layout from '../components/layout';
import Head from '../components/head';

export default function Error404() {
  return (
    <>
      <Head
        title="404"
      />
      <Layout>
        <H1>404</H1>
        <p>The page you are looking for does not exist. <Link href="/">Return home</Link>?</p>
      </Layout>
    </>
  )
}
