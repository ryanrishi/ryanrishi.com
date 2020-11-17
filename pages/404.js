import Layout from '../components/layout';
import { H1 } from '../components/headings';

export default function NotFound() {
  return (
    <Layout>
      <H1>404</H1>
      <p>The page you requested doesn't exist. <a href="/">Return home</a>?</p>
    </Layout>
    );
}
