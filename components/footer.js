import { ImGithub, ImLinkedin, ImSoundcloud, ImYoutube } from 'react-icons/im';
import Link from './link';

const FooterSocialLink = ({ children, href }) => (
  <Link
    href={href}
    className="px-4 text-2xl"
    invert
  >
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between container uppercase italic font-bold text-sm px-4 my-8 md:my-16">
      <div>
        <p>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          &copy; Copyright&nbsp;{ new Date().getFullYear() }&nbsp;Ryan Rishi
        </p>
      </div>
      <div className="flex flex-row justify-center pt-4 md:pt-0">
        <FooterSocialLink
          href="https://github.com/ryanrishi"
        >
          <ImGithub />
        </FooterSocialLink>
        <FooterSocialLink
          href="https://linkedin.com/in/ryanrishi"
        >
          <ImLinkedin />
        </FooterSocialLink>
        <FooterSocialLink
          href="https://soundcloud.com/ryanrishi"
        >
          <ImSoundcloud />
        </FooterSocialLink>
        <FooterSocialLink
          href="https://youtube.com/RyanRishiPercussion"
        >
          <ImYoutube />
        </FooterSocialLink>
      </div>
    </footer>
  );
}
