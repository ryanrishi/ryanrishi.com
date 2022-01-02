import Footer from './footer'
import Header from './header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container max-w-4xl p-4 lg:p-8 leading-8">
        {children}
      </div>
      <Footer />
    </>
  )
}
