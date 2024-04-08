import { allPosts, allProjects } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import NextLink from 'next/link'
import { ReactNode } from 'react'

import { FancyH1 } from '@/components/headings'
import Link from '@/components/link'

interface SectionProps {
  title: { text: string; url?: string; }
  description?: string
  children: ReactNode
}

const MaybeWrapInLink = ({ children, href }) => href ? <NextLink href={href} legacyBehavior>{children}</NextLink> : children

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="prose dark:prose-invert mb-16 max-w-none">
      <MaybeWrapInLink href={title.url}>
        <FancyH1>{title.text}</FancyH1>
      </MaybeWrapInLink>
      {description && <p className="text-slate-400 dark:text-slate-500">{description}</p>}
      {children}
    </section>
  )
}

export default function Index() {
  const recentPosts = allPosts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))).slice(0, 3)
  const recentProjects = allProjects.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 3)

  return (
    <>
      <Section title={{ text: 'Ryan Rishi' }}>
        <p>I&apos;m a software engineer focused on building <b>great user experiences</b>. I&apos;m currently working as a Staff Software Engineer at <Link href="https://twilio.com">Twilio</Link>, working on <Link href="https://www.twilio.com/en-us/customer-ai">Customer AI</Link>.</p>
        <p>My tech journey spans frontend, backend, infrastructure, and operations. My passion is in building&mdash;focusing on thoughtful, functional digital experiences that prioritize the user. I&apos;ve contributed to startups in <Link href="https://jelli.com">audio ad tech</Link>, <Link href="https://envoy.com">workplace platforms</Link>, and <Link href="https://en.wikipedia.org/wiki/SkySat">satellite imaging</Link>. Now, I&apos;m leading teams to engineer reliable backend services that enhance user interactions.</p>
        <p>My recent toolkit includes <Link href="https://nextjs.com">Next.js</Link>, <Link href="https://tailwindcss.com">Tailwindcss</Link>, <Link href="https://spring.io">Spring / Spring Boot</Link>, and <Link href="https://d3js.org">d3</Link> (check out my project on the <Link href="/projects/loudness-wars">Loudness Wars</Link>).</p>
        <p>When not coding, I&apos;m likely enjoying music, whipping up something in the kitchen, playing backgammon, or running.</p>
        <p>If you&apos;re interested in tech discussions or music recommendations, feel free to <Link href="/contact">reach out</Link>. Let&apos;s create something exciting or exchange some favorite tunes.</p>
      </Section>
      <Section
        title={{ text: 'Blog', url: '/blog' }}
        description="Writing about technology, music, and life."
      >
        {recentPosts.map((post, i) => (
          <div key={i}>
            <Link href={post.slug}>
              <h3>{post.title}</h3>
            </Link>
            <p className="transition text-slate-500 dark:text-slate-400 mb-8">{post.description}</p>
          </div>
        ))}
        <Link href="/blog" className="no-underline">Read all posts &rarr;</Link>
      </Section>

      <Section
        title={{ text: 'Projects', url: '/projects' }}
        description="Data visualization, conference talks, and web scrapers."
      >
        {recentProjects.map((project, i) => (
          <div key={i}>
            <Link href={project.slug}>
              <h3>{project.name}</h3>
            </Link>
            <p className="transition text-slate-500 dark:text-slate-400 mb-8">{project.description}</p>
          </div>
        ))}
        <Link href="/projects" className="no-underline">See all projects &rarr;</Link>
      </Section>
    </>
  )
}
