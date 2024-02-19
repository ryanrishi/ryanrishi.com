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
        <p>I&apos;m a software engineer focused on building <b>great user experiences</b>.</p>
        <p>Over the course of my career, I&apos;m grateful to have had the opportunity to work across multiple focus areas including frontend development, backend development, infrastructure, and operations.</p>
        <p>Fast-forward to today, and I&apos;ve had the privilege on working at <Link href="https://jelli.com">an audio ad tech startup</Link>, <Link href="https://envoy.com">a workplace platform startup</Link>, and <Link href="https://twilio.com">a customer engagement platform</Link>. My main focus these days is leading product-focused engineering teams to deliver highly available backend services in order to deliver great experiences to the end-user.</p>
        <p>Here are a few technologies I&apos;ve enjoyed working with recently:</p>
        <ul>
          <li><Link href="https://nextjs.com">Next.js</Link></li>
          <li><Link href="https://tailwindcss.com">Tailwindcss</Link></li>
          <li><Link href="https://graphql.com">GraphQL</Link> (specifically <Link href="https://apollographql.com">Apollo</Link>)</li>
          <li><Link href="https://spring.io">Spring / Spring Boot</Link></li>
          <li><Link href="https://typescriptlang.org">TypeScript</Link></li>
          <li><Link href="https://d3js.org">d3</Link> (check out my project on the <Link href="/projects/loudness-wars">Loudness Wars</Link>)</li>
        </ul>
        <p>Outside of work, I enjoy listening to and playing music, cooking, traveling, and saying hi to dogs I pass on the street.</p>
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
