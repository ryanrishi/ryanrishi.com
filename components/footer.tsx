import classNames from 'classnames'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { ImGithub, ImLinkedin, ImSoundcloud, ImTwitter, ImYoutube } from 'react-icons/im'

/*
- dark gray background
  - dark mode: same color as rest of page

Content:
2 columns:
Home                      Github
About                     LinkedIn
Blog                      Twitter
Projects                  Contact

      (c) 2022 Ryan Rishi. All Right Reserved
      Unless explicitly expressed, all views are my own.

 */

interface FooterLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const FooterLink = ({ children, href, className }: FooterLinkProps) => {
  const classes = classNames('flex flex-row hover:text-gray-600 transition py-2 items-center', className)

  return (
    <NextLink href={href}>
      <a className={classes} target="_blank">{children}</a>
    </NextLink>
  )
}

const FooterSocialLink = ({ children, href }) => (
  <FooterLink
    href={href}
    className="space-x-2"
  >
    {children}
  </FooterLink>
)

export default function Footer() {
  return (
    <footer className="text-gray-500 dark:bg-gray-900 transition">
      <div className="container max-w-4xl p-4 lg:p-8 flex flex-row justify-around">
        <div className="flex flex-col">
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/projects">Projects</FooterLink>
        </div>
        <div className="flex flex-col">
          <FooterSocialLink href="https://github.com/ryanrishi">
            <ImGithub />
            <span>Github</span>
          </FooterSocialLink>
          <FooterSocialLink href="https://twitter.com/ryanrishi">
            <ImTwitter />
            <span>Twitter</span>
          </FooterSocialLink>
          <FooterSocialLink href="https://linkedin.com/in/ryanrishi">
            <ImLinkedin />
            <span>LinkedIn</span>
          </FooterSocialLink>
          <FooterSocialLink href="https://soundcloud.com/ryanrishi">
            <ImSoundcloud />
            <span>SoundCloud</span>
          </FooterSocialLink>
          <FooterSocialLink href="https://youtube.com/RyanRishiPercussion">
            <ImYoutube />
            <span>YouTube</span>
          </FooterSocialLink>
        </div>
      </div>
      <div className="container flex justify-center align-middle py-4">
        <p>&copy; Copyright&nbsp;{ new Date().getFullYear() }&nbsp;Ryan Rishi</p>
      </div>
    </footer>
  )
}
