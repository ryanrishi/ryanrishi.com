import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaGlassWhiskey } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { ImGithub, ImLab, ImLinkedin } from 'react-icons/im'
import { IoMdGlobe } from 'react-icons/io'
import { SiTwilio } from 'react-icons/si'

import headshot from '../../public/img/headshot.jpeg'

interface Link {
  icon?: React.JSX.Element;
  label: string;
  description?: string;
  url: string;
}

const staticLinks: Link[] = [
  {
    icon: <IoMdGlobe />,
    label: 'Website',
    url: 'https://ryanrishi.com',
  },
  {
    icon: <ImLinkedin />,
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/ryanrishi',
  },
  {
    icon: <ImGithub />,
    label: 'Github',
    url: 'https://github.com/ryanrishi',
  },
  {
    icon: <GrMail />,
    label: 'Contact',
    url: 'https://ryanrishi.com/contact',
  },
]

const contentLinks: Link[] = [
  {
    icon: <SiTwilio />,
    label: 'Twilio Alpha',
    url: 'https://twilioalpha.com',
  },
  {
    icon: <FaGlassWhiskey />,
    label: 'Virtual Bartender',
    url: 'https://isleofmanhattan.com',
  },
  {
    icon: <ImLab />,
    label: 'Homelab',
    url: '/projects/homelab',
  },
]

const links = [
  ...contentLinks,
  ...staticLinks,
]

function LinkButton({ link }: { link: Link }) {
  const { icon, label, url } = link

  return (
    <Link
      href={url}
      className="group flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white py-4 transition-colors hover:border-valencia-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-valencia-500"
    >
      {icon && (
        <span className="text-slate-500 transition-colors group-hover:text-valencia-600 dark:group-hover:text-valencia-500">
          {icon}
        </span>
      )}
      <span className="font-mono text-sm text-slate-700 transition-colors group-hover:text-valencia-600 dark:text-slate-300 dark:group-hover:text-valencia-500">
        {label}
      </span>
    </Link>
  )
}

export default function Links() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-[75vw] max-w-md flex-col items-center">
        <Image
          className="h-32 w-32 rounded-full object-cover"
          src={headshot}
          alt="Ryan Rishi"
          placeholder="blur"
        />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Ryan Rishi.</h1>
        <p className="mt-2 mb-8 text-center text-slate-600 dark:text-slate-400">
          Experienced software engineer with expertise in backend, infra, and AI
        </p>
        <ul className="flex w-full flex-col gap-3">
          {links.map((link, i) => (
            <li key={i}>
              <LinkButton link={link} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
