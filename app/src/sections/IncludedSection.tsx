import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '../components/SplitText'
import { Compass, Car, Tent, Camera } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    icon: Compass,
    title: 'Expert Guides',
    description: 'Experienced local guides who know every hidden route.',
  },
  {
    icon: Car,
    title: 'Transport',
    description: 'Luxury transport throughout the entire trip.',
  },
  {
    icon: Tent,
    title: 'Accommodation',
    description: 'Comfortable hotels and premium mountain stays.',
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Professional content opportunities at iconic locations.',
  },
]

export function IncludedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.feature-card')
      cardElements.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
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
            delay: i * 0.15,
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="included"
      ref={sectionRef}
      className="relative w-full bg-midnight py-24 lg:py-40 overflow-hidden"
    >
      {/* Subtle mountain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url('/images/hero-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)',
        }}
      />

      <div className="relative w-full px-6 lg:px-16 xl:px-24">
        {/* Section Heading */}
        <div className="text-center mb-16 lg:mb-24">
          <SplitText
            text="WHAT'S INCLUDED"
            className="font-display text-cream"
            staggerDelay={0.025}
          />
        </div>

        {/* Glass Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="feature-card group glass-panel rounded-xl p-8 text-center transition-all duration-500 ease-cinematic hover:-translate-y-2 hover:border-forest/50 opacity-0 cursor-default"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/10 mb-6 transition-all duration-500 group-hover:bg-forest/20 group-hover:scale-110">
                  <Icon className="w-6 h-6 text-forest" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-cream mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-mist leading-relaxed">
                  {feature.description}
                </p>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: '0 0 40px rgba(30, 91, 58, 0.1), inset 0 0 40px rgba(30, 91, 58, 0.02)',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
