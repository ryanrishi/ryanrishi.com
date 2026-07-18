import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { compareDesc } from 'date-fns'
import NextLink from 'next/link'
import { ReactNode } from 'react'

import ContentRow from '@/components/content-row'
import { FancyH1 } from '@/components/headings'
import Link from '@/components/link'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'

dayjs.extend(utc)

interface SectionProps {
  title: { text: string; url?: string; }
  description?: string
  children: ReactNode
}

const MaybeWrapInLink = ({ children, href }: { children: ReactNode, href?: string }) => href ? <NextLink href={href}>{children}</NextLink> : children

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="mb-16">
      <MaybeWrapInLink href={title.url}>
        <FancyH1>{title.text}</FancyH1>
      </MaybeWrapInLink>
      {description && <p className="-mt-6 mb-8 font-mono text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {children}
    </section>
  )
}

const MoreLink = ({ href, children }: { href: string, children: ReactNode }) => (
  <NextLink
    href={href}
    className="group mt-6 inline-block font-mono text-sm text-slate-600 transition-colors hover:text-valencia-600 dark:text-slate-400 dark:hover:text-valencia-500"
  >
    {children} <span className="transition-transform group-hover:translate-x-0.5 inline-block">&rarr;</span>
  </NextLink>
)

export default async function Index() {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ])

  const recentPosts = posts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))).slice(0, 3)
  const recentProjects = projects.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 3)

  return (
    <>
      <Section title={{ text: 'Ryan Rishi' }} description="software engineer · staff @ twilio">
        <div className="prose dark:prose-invert max-w-none">
          <p>I&apos;m a software engineer with a focus on crafting <b>exceptional user experiences</b>.</p>
          <p>
            As a Staff Software Engineer at <Link href="https://twilio.com">Twilio</Link>, I&apos;m deeply involved in the exciting field of <Link href="https://www.twilio.com/en-us/products/conversational-ai">Conversational AI</Link>.
            Throughout my career, I&apos;ve navigated the realms of frontend, backend, infrastructure, and operations, always with a user-first approach to building digital products. My experience spans innovative startups in <Link href="https://jelli.com">audio ad tech</Link>, <Link href="https://envoy.com">workplace platforms</Link>, and <Link href="https://en.wikipedia.org/wiki/SkySat">satellite imaging</Link>, where I&apos;ve led the charge in developing robust backend services to improve user interactions.
          </p>
          <p>My go-to tools lately are <Link href="https://nextjs.com">Next.js</Link>, <Link href="https://tailwindcss.com">TailwindCSS</Link>, <Link href="https://spring.io">Spring / Spring Boot</Link>, and <Link href="https://d3js.org">d3</Link>&mdash; don&apos;t miss my take on the <Link href="/projects/loudness-wars">Loudness Wars</Link>.</p>
          <p>Off the clock, my world revolves around <Link href="/music">music</Link>, culinary experiments, backgammon, and running.</p>
          <p>If you&apos;re interested in a tech chat or swapping music, feel free to <Link href="/contact">reach out</Link>. Let&apos;s make something cool or share some tunes.</p>
        </div>
      </Section>

      <Section
        title={{ text: 'Blog', url: '/blog' }}
        description="Writing about technology, music, and life."
      >
        {recentPosts.map((post) => (
          <ContentRow
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.title}
            date={dayjs.utc(post.publishedAt).format('MMM YYYY')}
            description={post.description}
          />
        ))}
        <MoreLink href="/blog">Read all posts</MoreLink>
      </Section>

      <Section
        title={{ text: 'Projects', url: '/projects' }}
        description="Data visualization, conference talks, and web scrapers."
      >
        {recentProjects.map((project) => (
          <ContentRow
            key={project.slug}
            href={`/projects/${project.slug}`}
            title={project.name}
            date={dayjs.utc(project.date).format('MMM YYYY')}
            description={project.description}
          />
        ))}
        <MoreLink href="/projects">See all projects</MoreLink>
      </Section>
    </>
  )
}
