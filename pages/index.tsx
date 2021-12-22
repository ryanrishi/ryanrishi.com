import Image from 'next/image';
import { H1 } from '../components/headings';
import Link from '../components/link';
import Layout from '../components/layout'
import Head from '../components/head'

export default function Index() {
  return (
    <>
      <Head
        title="Ryan Rishi"
      />
      <Layout>
        <H1>Hi, I'm Ryan 👋🏼</H1>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 flex-grow flex-shrink md:mr-4">
            <p>I'm a twenty-something year old software engineer in California.</p>
            <p>I recently joined <Link href="https://envoy.com">Envoy</Link>, a startup in San Francisco, where I'm building out its external developer platform. Previously, I worked at <Link href="https://www.jelli.com">Jelli</Link>, an audio ad tech startup that was acquired by <Link href="https://www.iheartmedia.com/">iHeartMedia</Link>, and before that I was at <Link href="https://en.wikipedia.org/wiki/SkySat">Skybox Imaging</Link>, a satellite imaging company which was acquired by Google in 2014.</p>
            <p>I have experience in backend development, frontend development, and infrastructure. My specialities include Java, Spring/Spring Boot, identity and authorization protocols, and distributed systems.</p>
            <p>Outside of work, I have developed even more software such as a bot to text me when a campsite I'm interested in is available, a homelab for me to play around with infrastructure, and contribute to some of my favorite open-source projects.</p>
            <p>Okayokay&mdash; I do other things besides software too! I was a music major in college and still love to play drums and piano. I'm also in the process of getting my private pilot license (there's nothing quite like flying over California at ~3000 feet). I enjoy cooking, and have been called <em>the pasta prince</em> and <em>the spaghetti king 🍝👑</em>.</p>
            <p>Feel free to reach out on <Link href="https://linkedin.com/in/ryanrishi">LinkedIn</Link> or check out my projects on <Link href="https://github.com/ryanrishi">Github</Link>.</p>
          </div>
          <div className="lg:w-1/3 flex-grow flex-shrink">
            <Image
              src="/img/ryan-sitting.jpg"
              width="3648"
              height="5472"
              alt="Ryan Rishi"
              className="object-contain rounded"
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
