import Header from './header';
import Container from './container';

export default function Layout({ size = 'lg', children }) {
  return(
    <>
      <Header />
      <Container size={size}>
        {children}
      </Container>
    </>
   );
}
