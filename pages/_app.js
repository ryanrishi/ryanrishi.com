/* eslint-disable react/jsx-props-no-spreading */
import '@reach/dialog/styles.css';
import 'tailwindcss/tailwind.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
