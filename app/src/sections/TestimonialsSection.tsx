import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '../components/SplitText'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: 'Ahmed Khan',
    location: 'Lahore, Pakistan',
    image: '/images/testimonial-1.jpg',
    quote: 'TravelWithHadi transformed how I see Pakistan. Standing before Nanga Parbat at Fairy Meadows was a spiritual experience I will carry forever.',
  },
  {
    name: 'Sara Malik',
    location: 'Karachi, Pakistan',
    image: '/images/testimonial-2.jpg',
    quote: 'Every detail was meticulously planned. From the moment we left to our return, I felt completely at ease. Hunza Valley exceeded every expectation.',
  },
  {
    name: 'Imran Sheikh',
    location: 'Islamabad, Pakistan',
    image: '/images/testimonial-3.jpg',
    quote: 'The guides knew hidden spots no guidebook mentions. Watching sunrise over Rakaposhi from a secret viewpoint was worth every rupee.',
  },
  {
    name: 'Aisha Rahman',
    location: 'Faisalabad, Pakistan',
    image: '/images/testimonial-4.jpg',
    quote: 'As a solo female traveler, safety was my priority. The team made me feel protected while giving me the freedom to truly experience the mountains.',
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const goTo = (index: number) => {
    setCurrentIndex((index + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-midnight py-24 lg:py-40 overflow-hidden"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url('/images/destination-hunza.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative w-full px-6 lg:px-16 xl:px-24">
        {/* Section Heading */}
        <div className="text-center mb-16 lg:mb-20">
          <SplitText
            text="TESTIMONIALS"
            className="font-display text-cream"
            staggerDelay={0.025}
          />
        </div>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="max-w-4xl mx-auto opacity-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Glass Card */}
          <div className="glass-panel-strong rounded-2xl p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-10 h-10 text-forest/20" />

            {/* Slides */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-cinematic"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {TESTIMONIALS.map((testimonial, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 flex flex-col lg:flex-row items-center lg:items-start gap-8"
                  >
                    {/* Portrait */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-forest/30">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <p className="font-editorial text-xl lg:text-2xl text-cream/90 leading-relaxed italic mb-6">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <h4 className="font-body text-sm font-medium text-cream tracking-wide">
                          {testimonial.name}
                        </h4>
                        <p className="font-body text-xs text-mist mt-1">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-forest transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'bg-forest w-6'
                        : 'bg-cream/30 hover:bg-cream/50'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(currentIndex + 1)}
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-forest transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
