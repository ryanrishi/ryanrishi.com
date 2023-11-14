import classNames from 'classnames'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { ImGithub, ImLinkedin, ImSoundcloud, ImTwitter, ImYoutube } from 'react-icons/im'

interface FooterLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

const FooterLink = ({ children, href, className }: FooterLinkProps) => {
  const classes = classNames('flex flex-row text-slate-500 hover:text-slate-600 transition-colors py-2 items-center space-x-2', className)

  const isInternalLink = href.startsWith('/') // doesn't handle links like '//google.com', but I generally don't use those

  return (
    <NextLink href={href} className={classes} target={isInternalLink ? '' : '_blank'}>
      {children}
    </NextLink>
  )
}

export default function Footer() {
  return (
    <footer>
      <div className="container max-w-4xl p-4 lg:py-8 flex flex-row justify-around">
        <div className="flex flex-col">
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/music">Music</FooterLink>
          <FooterLink href="/projects">Projects</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </div>
        <div className="flex flex-col">
          <FooterLink href="https://github.com/ryanrishi">
            <ImGithub />
            <span>Github</span>
          </FooterLink>
          <FooterLink href="https://twitter.com/ryanrishi">
            <ImTwitter />
            <span>Twitter</span>
          </FooterLink>
          <FooterLink href="https://linkedin.com/in/ryanrishi">
            <ImLinkedin />
            <span>LinkedIn</span>
          </FooterLink>
          <FooterLink href="https://soundcloud.com/ryanrishi">
            <ImSoundcloud />
            <span>SoundCloud</span>
          </FooterLink>
          <FooterLink href="https://youtube.com/RyanRishiPercussion">
            <ImYoutube />
            <span>YouTube</span>
          </FooterLink>
        </div>
      </div>
      <div className="container flex justify-center align-middle py-4 text-slate-400 dark:text-slate-600 transition-colors">
        <p>&copy; Copyright&nbsp;{ new Date().getFullYear() }&nbsp;Ryan Rishi</p>
      </div>
    </footer>
  )
}
