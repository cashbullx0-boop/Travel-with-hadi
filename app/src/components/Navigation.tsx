import { useEffect, useState } from 'react'
import { Mountain } from 'lucide-react'

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'DESTINATIONS', href: '#destinations' },
  { label: 'INCLUDED', href: '#included' },
  { label: 'CONTACT', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-cinematic ${scrolled
          ? 'bg-midnight/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-gradient-to-b from-midnight/40 via-midnight/10 to-transparent'
        }`}
    >
      <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group bg-forest px-4 py-2 rounded-full hover:bg-forest/90 transition-all duration-300">
          <Mountain className="w-5 h-5 text-cream transition-transform duration-300 group-hover:scale-110" />
          <span className="font-body text-sm font-medium tracking-nav text-cream">
            TRAVELWITHHADI
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link font-body text-[13px] font-medium tracking-nav text-cream hover:text-forest transition-colors duration-300"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Book Now Button */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden md:block px-6 py-2.5 bg-forest border border-forest text-cream font-body text-[13px] font-medium tracking-nav rounded-full hover:bg-forest/90 hover:shadow-[0_0_25px_rgba(30,91,58,0.5)] transition-all duration-400 ease-cinematic"
        >
          BOOK NOW
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-midnight/95 backdrop-blur-xl border-b border-white/5 transition-all duration-500 ease-cinematic overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-sm font-medium tracking-nav text-cream/80 hover:text-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-block text-center px-6 py-2.5 bg-forest border border-forest text-cream font-body text-sm font-medium tracking-nav rounded-full hover:bg-forest/90 transition-all duration-300 mt-2"
          >
            BOOK NOW
          </a>
        </div>
      </div>
    </nav>
  )
}