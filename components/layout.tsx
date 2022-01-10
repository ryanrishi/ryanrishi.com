import Footer from './footer'
import Header from './header'

export default function Layout({ children }) {
  return (
    <div className="dark:bg-gray-900 transition">
      <Header />
      <div className="container max-w-4xl p-4 lg:p-8 leading-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}
