/* eslint-disable react/jsx-props-no-spreading */
import 'tailwindcss/tailwind.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
