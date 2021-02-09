import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return(
    <>
      <Header />
      {children}
      <hr />
      <Footer />
    </>
   );
}
