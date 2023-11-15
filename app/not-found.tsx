import type { Metadata } from 'next/types'

import Link from '../components/link'
import { H1 } from '@/components/headings'

export const metadata: Metadata = {
  title: '404',
}

export default function Error404() {
  return (
    <>
      <H1>404</H1>
      <p>The page you are looking for does not exist. <Link href="/">Return home</Link>?</p>
    </>
  )
}
