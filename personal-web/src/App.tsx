import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-200 dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Journey />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App