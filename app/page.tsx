import { compareDesc } from 'date-fns'
import NextLink from 'next/link'
import { ReactNode } from 'react'

import { FancyH1 } from '@/components/headings'
import Link from '@/components/link'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'

interface SectionProps {
  title: { text: string; url?: string; }
  description?: string
  children: ReactNode
}

const MaybeWrapInLink = ({ children, href }) =>
  href ? <NextLink href={href}>{children}</NextLink> : children

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="prose dark:prose-invert prose-a:no-underline mb-16 max-w-none">
      <MaybeWrapInLink href={title.url}>
        <FancyH1>{title.text}</FancyH1>
      </MaybeWrapInLink>
      {description && <p className="text-slate-400 dark:text-slate-500">{description}</p>}
      {children}
    </section>
  )
}

export default async function Index() {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ])

  const recentPosts = posts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))).slice(0, 3)
  const recentProjects = projects.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 3)

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
        <p>If you&apos;re interested in a tech chat or swapping music, feel free to <Link href="/contact">reach out</Link>. Let&apos;s make something cool or share some tunes.</p>
      </Section>
      <Section
        title={{ text: 'Blog', url: '/blog' }}
        description="Writing about technology, music, and life."
      >
        {recentPosts.map((post, i) => (
          <Link
            href={`/blog/${post.slug}`}
            key={i}
            className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors mb-4"
          >
            <h3 className="mb-2">{post.title}</h3>
            <p className="transition text-slate-500 dark:text-slate-400 no-underline">{post.description}</p>
          </Link>
        ))}
        <Link href="/blog" className="no-underline">Read all posts &rarr;</Link>
      </Section>

      <Section
        title={{ text: 'Projects', url: '/projects' }}
        description="Data visualization, conference talks, and web scrapers."
      >
        {recentProjects.map((project, i) => (
          <Link
            href={`/projects/${project.slug}`}
            key={i}
            className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors mb-4"
          >
            <h3 className="mb-2">{project.name}</h3>
            <p className="transition text-slate-500 dark:text-slate-400 no-underline">{project.description}</p>
          </Link>
        ))}
        <Link href="/projects" className="no-underline">See all projects &rarr;</Link>
      </Section>
    </>
  )
}
