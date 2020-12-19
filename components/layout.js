import Header from './header';
import Container from './container';
import Footer from './footer';

export default function Layout({ size = 'lg', children }) {
  return(
    <>
      <Header />
      <Container size={size} className={"mt-8"}>
        {children}
      </Container>
      <hr />
      <Footer />
    </>
   );
}
