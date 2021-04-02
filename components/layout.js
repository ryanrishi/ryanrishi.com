import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        {children}
        <hr className="mt-16" />
      </div>
      <Footer />
    </>
  );
}
