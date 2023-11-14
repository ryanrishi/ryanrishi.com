import { Metadata } from 'next/types'

import Link from '../components/link'

export const metadata: Metadata = {
  title: '404',
}

export default function Error404() {
  return <p>The page you are looking for does not exist. <Link href="/">Return home</Link>?</p>
}
