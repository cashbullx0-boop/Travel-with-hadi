import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '../components/SplitText'
import { MapPin, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const DESTINATIONS = [
  {
    name: 'Hunza',
    description: 'Valley of eternal glaciers and ancient forts.',
    altitude: '2,438m',
    season: 'Apr–Oct',
    image: '/images/destination-hunza.jpg',
  },
  {
    name: 'Skardu',
    description: "Gateway to K2 and the mighty Karakoram.",
    altitude: '2,228m',
    season: 'May–Sep',
    image: '/images/destination-skardu.jpg',
  },
  {
    name: 'Fairy Meadows',
    description: "Nanga Parbat's heavenly base camp.",
    altitude: '3,300m',
    season: 'Jun–Sep',
    image: '/images/destination-fairymeadows.jpg',
  },
  {
    name: 'Kashmir',
    description: 'Emerald valleys and crystal clear rivers.',
    altitude: '1,600m',
    season: 'Mar–Nov',
    image: '/images/destination-kashmir.jpg',
  },
  {
    name: 'Murree',
    description: 'Pine-clad hills above the clouds.',
    altitude: '2,291m',
    season: 'Apr–Dec',
    image: '/images/destination-murree.jpg',
  },
  {
    name: 'Naran',
    description: 'Alpine meadows and sapphire lakes.',
    altitude: '2,409m',
    season: 'May–Sep',
    image: '/images/destination-naran.jpg',
  },
  {
    name: 'Fort Munro',
    description: "Mini Murree of the south, cool hills above the plains.",
    altitude: '1,972m',
    season: 'Apr–Oct',
    image: '/images/destination-fortmunro.jpg',
  },
]

export function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.destination-card')
      cardElements.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: (i % 2) * 0.15,
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative w-full bg-midnight py-24 lg:py-40"
    >
      <div className="w-full px-6 lg:px-16 xl:px-24">
        {/* Section Heading */}
        <div className="text-center mb-16 lg:mb-24">
          <SplitText
            text="DESTINATIONS"
            className="font-display text-cream"
            staggerDelay={0.03}
          />
        </div>

        {/* Destination Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {DESTINATIONS.map((dest, i) => (
            <div
              key={i}
              className="destination-card group relative rounded-xl overflow-hidden cursor-pointer opacity-0"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Glass overlay on hover */}
                <div className="absolute inset-0 glass-panel opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  {/* Title */}
                  <h3 className="font-display text-3xl lg:text-4xl text-cream mb-2 transform transition-transform duration-500 ease-cinematic group-hover:-translate-y-2">
                    {dest.name}
                  </h3>

                  {/* Description - always visible */}
                  <p className="font-body text-sm text-mist/80 mb-4 max-w-md">
                    {dest.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-forest" />
                      <span className="font-body text-xs text-cream/70">{dest.altitude}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-forest" />
                      <span className="font-body text-xs text-cream/70">{dest.season}</span>
                    </div>
                  </div>

                  {/* Forest green underline on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-cinematic origin-left" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
