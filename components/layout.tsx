import Footer from './footer'
import Header from './header'

export default function Layout({ children }) {
  return (
    // keep these bg-* and dark:bg-* in sync with styles/globals.css
    <div className="bg-slate-50 dark:bg-slate-800 dark:text-slate-400 transition">
      <Header />
      <div className="container max-w-4xl p-4">
        {children}
      </div>
      <Footer />
    </div>
  )
}
