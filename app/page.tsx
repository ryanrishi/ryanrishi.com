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
        <p>I&apos;m a software engineer with a focus on crafting <b>exceptional user experiences</b>.</p>
        <p>
          As a Staff Software Engineer at <Link href="https://twilio.com">Twilio</Link>, I&apos;m deeply involved in the exciting field of <Link href="https://www.twilio.com/en-us/customer-ai">Customer AI</Link>.
          Throughout my career, I&apos;ve navigated the realms of frontend, backend, infrastructure, and operations, always with a user-first approach to building digital products. My experience spans innovative startups in <Link href="https://jelli.com">audio ad tech</Link>, <Link href="https://envoy.com">workplace platforms</Link>, and <Link href="https://en.wikipedia.org/wiki/SkySat">satellite imaging</Link>, where I&apos;ve led the charge in developing robust backend services to improve user interactions.
        </p>
        <p>My go-to tools lately are <Link href="https://nextjs.com">Next.js</Link>, <Link href="https://tailwindcss.com">TailwindCSS</Link>, <Link href="https://spring.io">Spring / Spring Boot</Link>, and <Link href="https://d3js.org">d3</Link>&mdash; don&apos;t miss my take on the <Link href="/projects/loudness-wars">Loudness Wars</Link>.</p>
        <p>Off the clock, my world revolves around <Link href="/music">music</Link>, culinary experiments, backgammon, and running.</p>
        <p>If you&apos;re interested in a tech chat or swapping music, freel free to <Link href="/contact">reach out</Link>. Let&apos;s make something cool or share some tunes.</p>
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
