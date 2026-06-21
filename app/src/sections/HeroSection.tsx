import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Facebook, Youtube } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const POLAROIDS = [
  { src: '/videos/polaroid-attabad.mp4', caption: 'Crystal Blue Waters', rotation: -3 },
  { src: '/videos/polaroid-hunza.mp4', caption: 'Mountain Paradise', rotation: 2 },
  { src: '/videos/polaroid-skardu.mp4', caption: 'Gateway To Giants', rotation: -1.5 },
  { src: '/videos/polaroid-fairymeadows.mp4', caption: 'Camp Under Stars', rotation: 2.5 },
  { src: '/videos/polaroid-kashmir.mp4', caption: 'Heaven On Earth', rotation: -2 },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const text = textRef.current
    const fg = fgRef.current
    const strip = stripRef.current
    if (!section || !bg || !text || !fg || !strip) return

    const ctx = gsap.context(() => {
      // Background parallax - 0.3x
      gsap.to(bg, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Typography parallax - 0.5x
      gsap.to(text, {
        y: '35%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Foreground parallax - 0.1x (nearly fixed)
      gsap.to(fg, {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Polaroid strip drift - 0.4x
      gsap.to(strip, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleVideoHover = (e: React.MouseEvent<HTMLVideoElement>, speed: number) => {
    const video = e.currentTarget
    video.playbackRate = speed
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-midnight"
    >
      {/* Layer 2: Typography - Massive "PAKISTAN" (blends into clouds) */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <h1
          className="font-display text-cream select-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(4rem, 15vw, 16rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            WebkitTextStroke: '2px #F5F2E8',
            color: 'transparent',
            opacity: 0.85,
            transform: 'translateY(-12vh)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 35%, black 60%, rgba(0,0,0,0.5) 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 35%, black 60%, rgba(0,0,0,0.5) 85%, transparent 100%)',
          }}
        >
          TRAVEL WITH HADI
        </h1>
      </div>

      {/* Layer 1: Background - Mountain Panorama */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ zIndex: 1, mixBlendMode: 'normal' }}
      >
        <img
          src="/images/hero-background.jpg"
          alt="Hunza Valley at sunrise"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-transparent to-midnight/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/20 via-transparent to-midnight/20" />
      </div>

      {/* Layer 3: Foreground - Traveler + Pine branches */}
      <div
        ref={fgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        {/* Pine branch left */}
        <img
          src="/images/hero-pine-left.png"
          alt=""
          className="absolute left-0 bottom-0 w-[15vw] max-w-[200px] h-auto object-contain opacity-70"
          style={{ transform: 'translateY(10%)' }}
        />

        {/* Traveler */}
        <img
          src="/images/hero-traveler.png"
          alt="Traveler overlooking Hunza Valley"
          className="absolute right-[8%] bottom-0 h-[48vh] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}
        />

        {/* Pine branch right */}
        <img
          src="/images/hero-pine-left.png"
          alt=""
          className="absolute right-0 bottom-0 w-[12vw] max-w-[160px] h-auto object-contain opacity-50"
          style={{ transform: 'scaleX(-1) translateY(15%)' }}
        />
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-[44%] left-1/2 -translate-x-1/2" style={{ zIndex: 5 }}>
        <button
          ref={ctaRef}
          className="group relative px-10 py-4 bg-cream text-forest font-body text-sm font-medium tracking-nav rounded-full overflow-hidden transition-shadow duration-400 hover:shadow-[0_0_40px_rgba(30,91,58,0.3)]"
        >
          <span className="relative z-10 transition-colors duration-400 group-hover:text-cream">
            EXPLORE TRAVEL WITH HADI
          </span>
          <span className="absolute inset-0 bg-forest transform scale-y-0 origin-bottom transition-transform duration-400 ease-cinematic group-hover:scale-y-100" />
        </button>
      </div>

      {/* Social Column - Right Edge */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-5"
        style={{ zIndex: 4 }}
      >
        {[Instagram, Facebook, Youtube].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="text-cream/40 hover:text-cream/90 transition-all duration-300 hover:scale-110"
            aria-label="Social link"
          >
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* Polaroid Experience Strip - Lower Left */}
      <div
        ref={stripRef}
        className="absolute bottom-8 left-6 lg:left-10 flex gap-3 items-end"
        style={{ zIndex: 4 }}
      >
        {POLAROIDS.map((polaroid, i) => (
          <div
            key={i}
            className="group cursor-pointer transition-all duration-400 ease-cinematic hover:-translate-y-1.5"
            style={{ transform: `rotate(${polaroid.rotation}deg)` }}
          >
            <div className="bg-white p-1.5 pb-6 rounded-sm shadow-lg transition-shadow duration-400 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]">
              <div className="w-[100px] lg:w-[120px] h-[130px] lg:h-[150px] overflow-hidden bg-midnight">
                <video
                  src={polaroid.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="w-full h-full object-cover"
                  onMouseEnter={(e) => handleVideoHover(e, 1.5)}
                  onMouseLeave={(e) => handleVideoHover(e, 1)}
                />
              </div>
              <p className="mt-2 text-center font-body text-[9px] lg:text-[10px] font-medium tracking-[0.08em] text-midnight/70 uppercase">
                {polaroid.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
