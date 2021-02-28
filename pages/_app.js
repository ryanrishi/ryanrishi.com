/* eslint-disable react/jsx-props-no-spreading */
import '../scss/styles.scss';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
