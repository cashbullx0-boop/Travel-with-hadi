import { Mountain, Instagram, Facebook, Youtube } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Included', href: '#included' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="w-full bg-midnight border-t border-white/5">
      <div className="w-full px-6 lg:px-16 xl:px-24 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleClick(e, '#')}
            className="flex items-center gap-2.5 group"
          >
            <Mountain className="w-5 h-5 text-forest transition-transform duration-300 group-hover:scale-110" />
            <span className="font-body text-sm font-medium tracking-nav text-forest">
              TRAVELWITHHADI
            </span>
          </a>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="font-body text-xs tracking-nav text-mist hover:text-cream transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-mist hover:text-cream transition-colors duration-300"
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 text-center">
          <p className="font-body text-[11px] text-mist/50 tracking-wide">
            &copy; {new Date().getFullYear()} TRAVELWITHHADI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
