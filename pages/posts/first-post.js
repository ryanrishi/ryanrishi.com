import Head from 'next/Head';
import Link from 'next/Link';

export default function firstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Return home</Link>
      </h2>
    </>
  );
}
