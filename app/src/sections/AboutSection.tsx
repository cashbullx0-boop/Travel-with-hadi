import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '../components/SplitText'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE_ITEMS = [
  {
    days: 'Days 1–3',
    title: 'Hunza Valley',
    photos: [
      { src: '/images/about-attabad.jpg', alt: 'Attabad Lake' },
      { src: '/images/about-baltit.jpg', alt: 'Baltit Fort' },
    ],
  },
  {
    days: 'Days 4–5',
    title: 'Skardu',
    photos: [
      { src: '/images/about-shangrila.jpg', alt: 'Shangrila Resort' },
      { src: '/images/about-kachura.jpg', alt: 'Upper Kachura Lake' },
    ],
  },
  {
    days: 'Days 6–7',
    title: 'Fairy Meadows',
    photos: [
      { src: '/images/about-nangaparbat.jpg', alt: 'Nanga Parbat' },
      { src: '/images/about-camping.jpg', alt: 'Camping Scene' },
    ],
  },
  {
    days: 'Days 8–10',
    title: 'Kashmir & Murree',
    photos: [
      { src: '/images/about-neelum.jpg', alt: 'Neelum Valley' },
      { src: '/images/about-patriata.jpg', alt: 'Patriata Hills' },
    ],
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const timeline = timelineRef.current
    if (!section || !timeline) return

    const ctx = gsap.context(() => {
      // Timeline items stagger reveal
      const items = timeline.querySelectorAll('.timeline-item')
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.2,
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-midnight py-24 lg:py-40 overflow-hidden"
    >
      {/* Faded blurred mountain background */}
      <div
        className="absolute inset-0 opacity-20 blur-sm scale-110"
        style={{
          backgroundImage: `url('/images/about-nangaparbat.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark gradient overlay to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/90 to-midnight" />

      <div className="relative w-full px-6 lg:px-16 xl:px-24">
        {/* Section Heading with font reveal */}
        <div className="text-center mb-20 lg:mb-28">
          <div className="flex items-center justify-center gap-0 mb-4">
            <span className="h-px flex-1 max-w-[100px] lg:max-w-[200px] bg-cream/20" />
            <SplitText
              text="ABOUT THE JOURNEY"
              className="font-display text-cream mx-6"
              staggerDelay={0.02}
            />
            <span className="h-px flex-1 max-w-[100px] lg:max-w-[200px] bg-cream/20" />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto">
          {/* Left Column - Editorial Text */}
          <div className="space-y-8">
            <p className="font-body text-lg lg:text-xl leading-relaxed text-mist">
              We've designed an unforgettable journey through Pakistan's most spectacular northern regions. From the turquoise waters of{' '}
              <span className="text-forest font-medium">Attabad Lake</span> to the towering peaks of{' '}
              <span className="text-forest font-medium">Skardu</span> and{' '}
              <span className="text-forest font-medium">Hunza</span>, every stop has been carefully curated.
            </p>

            <div className="h-px w-full bg-white/10" />

            <p className="font-body text-lg lg:text-xl leading-relaxed text-mist">
              No complicated planning. No route stress. No logistical headaches. We handle everything so you can focus on{' '}
              <span className="text-forest font-medium">experiencing the mountains</span>.
            </p>

            <div className="pt-8">
              <a
                href="#destinations"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#destinations')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-3 text-forest font-body text-sm tracking-nav hover:gap-5 transition-all duration-400 ease-cinematic group"
              >
                <span>EXPLORE DESTINATIONS</span>
                <svg
                  className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Vertical hairline */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-cream/10" />

            <div className="space-y-12 pl-8">
              {TIMELINE_ITEMS.map((item, i) => (
                <div key={i} className="timeline-item relative opacity-0">
                  {/* Timeline node */}
                  <div className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-forest -translate-x-1/2" />

                  <div className="space-y-3">
                    <span className="font-body text-xs tracking-nav text-forest/80">
                      {item.days}
                    </span>
                    <h3 className="font-display text-2xl lg:text-3xl text-cream">
                      {item.title}
                    </h3>

                    {/* Photo cluster */}
                    <div className="flex gap-3 pt-2 group/photos">
                      {item.photos.map((photo, j) => (
                        <div
                          key={j}
                          className="relative w-28 h-20 lg:w-36 lg:h-24 rounded-lg overflow-hidden transition-all duration-500 ease-cinematic"
                          style={{
                            transform: `translateX(${j * 0}px)`,
                            zIndex: item.photos.length - j,
                          }}
                        >
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/photos:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-midnight/20 group-hover/photos:bg-transparent transition-colors duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}