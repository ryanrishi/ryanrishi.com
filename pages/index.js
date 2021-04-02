/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image';
import Link from '../components/link';
import Layout from '../components/layout';
import Head from '../components/head';

export default function Home() {
  return (
    <Layout size="full">
      <Head />
      <div className="home">
        <div className="intro">
          <h1>Hi, I'm Ryan 👋🏼</h1>
          <div>
            <h3>I'm currently:</h3>
            <ul>
              <li>👨🏻‍💻 working as a backend-leaning-full-stack engineer&mdash; mostly Java, Spring, MySQL, Kafka, Kubernetes, with a sprinkle of Ember.js</li>
              <li>
                🔬 building out my&nbsp;
                <Link href="/projects/homelab">homelab</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Outside of engineering:</h3>
            <ul>
              <li>✈️ I'm in the process of getting my private pilot license</li>
              <li>🥁 I play drums and arrange/perform percussion covers</li>
              <li>🥘 I enjoy cooking. I've been called the pasta prince and the spaghetti king 👑 </li>
            </ul>
          </div>
        </div>

        <div className="img-container">
          <Image src="/img/ryan-sitting.jpg" alt="Ryan Rishi" className="object-contain rounded-lg h-full w-full" width="3648" height="5472" />
        </div>
      </div>
    </Layout>
  );
}
