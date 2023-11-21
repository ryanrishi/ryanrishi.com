import type { MDXComponents } from 'mdx/types'
import dynamic from 'next/dynamic'

import Blockquote from './blockquote'
import Callout from './callout'
import Link from './link'

const mdxComponents: MDXComponents = {
  a: Link,

  Blockquote,
  Callout,

  Image: dynamic(() => import('next/image')),
  Logo: dynamic(() => import('./logo')),
  LoudnessWars: dynamic(() => import('./projects/loudness-wars')),
  VideoContainer: dynamic(() => import('./video-container')),
}

export default mdxComponents
