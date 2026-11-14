import Image from 'next/image'
import NextLink from 'next/link'
import { ReactNode } from 'react'

import ContentRow from '@/components/content-row'
import { FancyH1 } from '@/components/headings'
import Link from '@/components/link'
import LoudnessWarsPreview from '@/components/projects/loudness-wars/preview'
import { formatShortDate } from '@/lib/format-date'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'

import headshot from '../../public/img/headshot.jpeg'

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

  const recentPosts = posts.slice(0, 3)
  const recentProjects = projects.slice(0, 3)

  return (
    <>
      <section className="mb-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Image
            src={headshot}
            alt="Ryan Rishi"
            placeholder="blur"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h1 className="not-prose text-4xl font-bold tracking-tighter text-slate-900 md:text-5xl dark:text-slate-50">Ryan Rishi.</h1>
            <p className="mt-2 font-mono text-sm text-slate-500 dark:text-slate-400">software engineer · staff @ twilio</p>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            I&apos;m a Staff Software Engineer at <Link href="https://twilio.com">Twilio</Link>, where I work on <Link href="https://www.twilio.com/docs/conversations/agent-connect">Twilio Agent Connect</Link>, enabling any and all agents to use Twilio&apos;s rich communications channels to deliver excellent customer experiences.
          </p>
          <p>
            I&apos;ve worked across frontend, backend, and infrastructure at startups in <Link href="https://en.wikipedia.org/wiki/Jelli">audio ad tech</Link>, <Link href="https://envoy.com">workplace platforms</Link>, and <Link href="https://en.wikipedia.org/wiki/SkySat">satellite imaging</Link>. Lately I reach for <Link href="https://nextjs.org">Next.js</Link>, <Link href="https://tailwindcss.com">Tailwind</Link>, <Link href="https://spring.io">Spring Boot</Link>, and <Link href="https://d3js.org">d3</Link>.
          </p>
          <p>
            Off the clock: <Link href="/music">music</Link>, cooking, backgammon, and running. <Link href="/contact">Reach out</Link> to talk tech or swap music.
          </p>
        </div>
        <LoudnessWarsPreview />
      </section>

      <Section
        title={{ text: 'Blog', url: '/blog' }}
        description="Writing about technology, music, and life."
      >
        {recentPosts.map((post) => (
          <ContentRow
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.title}
            date={formatShortDate(post.publishedAt)}
            description={post.description}
          />
        ))}
        <MoreLink href="/blog">Read all posts</MoreLink>
      </Section>

      <Section
        title={{ text: 'Projects', url: '/projects' }}
        description="Data visualization, conference talks, web scrapers, and homelab."
      >
        {recentProjects.map((project) => (
          <ContentRow
            key={project.slug}
            href={`/projects/${project.slug}`}
            title={project.name}
            date={project.ongoing ? 'Ongoing' : formatShortDate(project.date)}
            description={project.description}
          />
        ))}
        <MoreLink href="/projects">See all projects</MoreLink>
      </Section>
    </>
  )
}
