import type { Metadata } from 'next/types'

import { H3 } from '@/components/headings'
import Link from '@/components/link'
import VideoContainer from '@/components/video-container'

export const metadata: Metadata = {
  title: 'Music | Ryan Rishi',
}

export default function Music() {
 return <>
    <H3>Senior Recital</H3>
    <p>As a music major, I was awarded the opportunity to put on a recital in my senior year. It composed of various musical elements including live looping marimba with <Link href={'https://ableton.com'}>Ableton Live</Link>, percussion ensemble, <em>a cappella</em>, gamelan, and mallet solos.</p>

    <VideoContainer
      src="https://www.youtube-nocookie.com/embed/QEQ5AZ_LAlQ"
      title='Ryan Rishi - "8 on Three and 9 on Two"'
    />

    <H3>Percussion Covers</H3>
    <p>In college, I enjoyed arranging and recording popular songs played on keyboard percussion instruments.</p>

    <VideoContainer
      src="https://www.youtube-nocookie.com/embed/sMzCV91D3ao"
      title='Ryan Rishi - "I Will Follow You Into The Dark" by Death Cab for Cutie [Percussion Cover]'
    />

    <H3>Recording</H3>
    <p>I've produced two albums. The first is Christmas In Claradise, which was a joint effort with the five <em>a cappella</em> groups at Santa Clara University. You can read about it <Link href={'/blog/2015-12-27-the-twelve-days-of-an-a-cappella-christmas-album'}>here</Link>.</p>

    <p>The second is <Link href={'https://open.spotify.com/album/5Tbpm70sMQ2aUwdsEieHn5?si=pucr00KFSq-X_hMGfvNRrA'}>Bellomy</Link>, an album of songs written by my band from college.</p>

    <iframe
      src="https://open.spotify.com/embed/album/5Tbpm70sMQ2aUwdsEieHn5"
      style={{ borderRadius: '0.75rem' }}
      title="Jagged Light - Bellomy"
      width="100%"
      height="380"
      frameBorder="0"
      allowTransparency
      allow="encrypted-media"
    />
  </>
}
