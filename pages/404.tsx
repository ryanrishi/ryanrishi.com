import Link from '../components/link'
import Layout from '../layouts'

export default function Error404() {
  return (
    <Layout frontMatter={{ title: '404'}}>
      <p>The page you are looking for does not exist. <Link href="/">Return home</Link>?</p>
    </Layout>
  )
}
