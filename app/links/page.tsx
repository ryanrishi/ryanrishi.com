import Image from 'next/image'
import Link from 'next/link'
import { FaGlassWhiskey } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { ImGithub, ImLab, ImLinkedin } from 'react-icons/im'
import { IoMdGlobe } from 'react-icons/io'
import { SiTwilio } from 'react-icons/si'

import headshot from '../../public/img/ryan.jpeg'

interface Link {
  icon?: JSX.Element;
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
    <Link href={url}>
      <button className="p-0.5 mb-4 overflow-hidden w-[75vw] max-w-screen-md text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <div className="relative inline-flex items-center justify-center py-4 gap-4 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {icon && <span className="relative">{icon}</span>}
          <span>{label}</span>
        </div>
      </button>
    </Link>
  )
}

export default function Links() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-[75vw] max-w-screen-md">
        <Image className="rounded-full h-32 w-32" src={headshot} alt="Ryan Rishi" />
        <h1 className="text-4xl mt-4 mb-8">Ryan Rishi</h1>
        <p className="text-center">Experienced software engineer with expertise in backend, infra, and AI</p>
        <br />
        <div className="flex items-center justify-center">
          <ul className="flex flex-col">
            {links.map((link, i) => (
              <LinkButton link={link} key={i} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
