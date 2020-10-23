import Header from '../components/header';

export default function NotFound() {
  return (
    <>
      <Header></Header>
      <h1>404</h1>

      <p>The page you requested doesn't exist. <a href="/">Return home</a>?</p>
    </>
  );
}
