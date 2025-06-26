import type { MDXComponents } from 'mdx/types'
import dynamic from 'next/dynamic'

import Blockquote from '@/components/blockquote'
import Callout from '@/components/callout'
import Link from '@/components/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: Link,

    Blockquote,
    Callout,

    Image: dynamic(() => import('next/image')),
    Logo: dynamic(() => import('@/components/logo')),
    LoudnessWars: dynamic(() => import('@/components/projects/loudness-wars')),
    VideoContainer: dynamic(() => import('@/components/video-container')),

    ...components,
  }
}
