/* eslint-disable react/jsx-props-no-spreading */
import '@reach/dialog/styles.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { pageview } from '../lib/ga';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // When the component is mounted, subscribe to router changes and log those page views
    router.events.on('routeChangeComplete', url => pageview(url));

    // If the component is unmounted, unsubscribe from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', () => pageview());
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
