import { useLenis } from './hooks/useLenis'
import { Navigation } from './components/Navigation'
import { CustomCursor } from './components/CustomCursor'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { DestinationsSection } from './sections/DestinationsSection'
import { IncludedSection } from './sections/IncludedSection'
import { TestimonialsSection } from './sections/TestimonialsSection'
import { ContactSection } from './sections/ContactSection'
import { ClientsSection } from './sections/ClientsSection'
import { PackageBuilderSection } from './sections/PackageBuilderSection'

function App() {
  useLenis()

  return (
    <div className="relative bg-midnight min-h-screen cursor-none md:cursor-none">
      <CustomCursor />
      <Navigation />

      <main>
        <HeroSection />
        <AboutSection />
        <DestinationsSection />
        <PackageBuilderSection />
        <IncludedSection />
        <TestimonialsSection />
        <ClientsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
