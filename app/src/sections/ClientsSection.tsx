import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '../components/SplitText'
import { MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CLIENTS = [
    {
        place: 'Fort Munro',
        image: '/images/client-1.jpeg',
    },
    {
        place: 'Hunza Valley',
        image: '/images/client-2.jpeg',
    },
    {
        place: 'China Border',
        image: '/images/client-3.jpeg',
    },
    {
        place: 'Hunza Valley',
        image: '/images/client-4.jpeg',
    },
    {
        place: 'Hunza Valley',
        image: '/images/client-5.jpeg',
    },
    {
        place: 'Naran',
        image: '/images/client-6.jpeg',
    },
    {
        place: 'Swat Kalam',
        image: '/images/client-7.jpeg',
    },
    {
        place: 'Murree',
        image: '/images/client-8.jpeg',
    },
]

export function ClientsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const grid = gridRef.current
        if (!section || !grid) return

        const ctx = gsap.context(() => {
            const cards = grid.querySelectorAll('.client-card')
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                        },
                        delay: (i % 4) * 0.1,
                    }
                )
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="clients"
            ref={sectionRef}
            className="relative w-full bg-midnight py-24 lg:py-40"
        >
            {/* Subtle background texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url('/images/hero-background.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative w-full px-6 lg:px-16 xl:px-24">
                {/* Section Heading */}
                <div className="text-center mb-4">
                    <SplitText
                        text="HAPPY CLIENTS"
                        className="font-display text-cream"
                        staggerDelay={0.03}
                    />
                </div>
                <p className="text-center font-body text-mist/60 text-sm tracking-widest uppercase mb-16 lg:mb-24">
                    Real moments from our travellers
                </p>

                {/* Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto"
                >
                    {CLIENTS.map((client, i) => (
                        <div
                            key={i}
                            className="client-card group relative rounded-xl overflow-hidden cursor-pointer opacity-0"
                            style={{
                                aspectRatio: i % 3 === 0 ? '3/4' : '4/5',
                            }}
                        >
                            {/* Image */}
                            <img
                                src={client.image}
                                alt={client.place}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Green border on hover */}
                            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-forest/50 transition-all duration-500" />

                            {/* Place name */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3 text-forest flex-shrink-0" />
                                    <span className="font-display text-sm text-cream tracking-wider">
                                        {client.place}
                                    </span>
                                </div>
                            </div>

                            {/* Top shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}