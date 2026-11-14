import type { MDXComponents } from 'mdx/types'
import dynamic from 'next/dynamic'

import Blockquote from '@/components/blockquote'
import Callout from '@/components/callout'
import Link from '@/components/link'
import { Timeline, TimelineItem } from '@/components/timeline'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: Link,

    Blockquote,
    Callout,
    Timeline,
    TimelineItem,

    HomelabDiagram: dynamic(() => import('@/components/projects/homelab/diagram')),
    Image: dynamic(() => import('next/image')),
    Logo: dynamic(() => import('@/components/logo')),
    LoudnessWars: dynamic(() => import('@/components/projects/loudness-wars')),
    VideoContainer: dynamic(() => import('@/components/video-container')),

    ...components,
  }
}
