import Header from './header';
import Footer from './footer';
import { ReactNode } from 'react';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container p-4 leading-8">
        {children}
        <hr className="mt-16" />
      </div>
      <Footer />
    </>
  );
}
