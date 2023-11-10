import { allPosts, allProjects, Post, Project } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import NextLink from 'next/link'
import { ReactNode } from 'react'

import { FancyH1, H3 } from '../components/headings'
import Link from '../components/link'
import Layout from '../layouts'

interface SectionProps {
  title: { text: string; url?: string; }
  description?: string
  children: ReactNode
}

const MaybeWrapInLink = ({ children, href }) => href ? <NextLink href={href} legacyBehavior>{children}</NextLink> : children

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="leading-8 mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <MaybeWrapInLink href={title.url}>
          <FancyH1>{title.text}</FancyH1>
        </MaybeWrapInLink>
       {description && <p className="text-slate-400 dark:text-slate-500">{description}</p>}
      </div>
      {children}
    </section>
  )
}

export default function Index() {
  const recentPosts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 3)
  const recentProjects = allProjects.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 3)

  return (
    <Layout>
      <Section title={{ text: 'Ryan Rishi' }}>
        <p className="pb-8">I&apos;m a software engineer focused on building <b>great user experiences</b>.</p>
        <p className="pb-8">Over the course of my career, I&apos;m grateful to have had the opportunity to work across multiple focus areas including frontend development, backend development, infrastructure, and operations.</p>
        <p className="pb-8">Fast-forward to today, and I&apos;ve had the privilege on working at <Link href="https://jelli.com">an audio ad tech startup</Link>, <Link href="https://envoy.com">a workplace platform startup</Link>, and <Link href="https://twilio.com">a customer engagement platform</Link>. My main focus these days is leading product-focused engineering teams to deliver highly available backend services in order to deliver great experiences to the end-user.</p>
        <p className="pb-8">Here are a few technologies I&apos;ve enjoyed working with recently:</p>
        <ul className="list-disc list-inside">
          <li><Link href="https://nextjs.com">Next.js</Link></li>
          <li><Link href="https://tailwindcss.com">Tailwindcss</Link></li>
          <li><Link href="https://graphql.com">GraphQL</Link> (specifically <Link href="https://apollographql.com">Apollo</Link>)</li>
          <li><Link href="https://spring.io">Spring / Spring Boot</Link></li>
          <li><Link href="https://typescriptlang.org">TypeScript</Link></li>
          <li><Link href="https://d3js.org">d3</Link> (check out my project on the <Link href="/projects/loudness-wars">Loudness Wars</Link>)</li>
        </ul>
        <p className="pb-8">Outside of work, I enjoy listening to and playing music, cooking, traveling, and saying hi to dogs I pass on the street.</p>
      </Section>
      <Section
        title={{ text: 'Blog', url: '/blog' }}
        description="Writing about technology, music, and life."
      >
        {recentPosts.map((post, i) => (
          <div key={i}>
            <Link href={post.url}>
              <H3>{post.title}</H3>
            </Link>
            <p className="transition text-slate-500 dark:text-slate-400 mb-8">{post.description}</p>
          </div>
        ))}
        <Link href="/blog">Read all posts &rarr;</Link>
      </Section>

      <Section
        title={{ text: 'Projects', url: '/projects' }}
        description="Data visualization, conference talks, and web scrapers."
      >
        {recentProjects.map((project, i) => (
          <div key={i}>
            <Link href={project.url}>
              <H3>{project.name}</H3>
            </Link>
            <p className="transition text-slate-500 dark:text-slate-400 mb-8">{project.description}</p>
          </div>
        ))}
        <Link href="/projects">See all projects &rarr;</Link>
      </Section>
    </Layout>
  )
}
