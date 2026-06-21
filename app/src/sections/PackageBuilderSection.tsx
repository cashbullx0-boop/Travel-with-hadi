import { useState } from 'react'
import { Calendar, Users, X, MessageCircle, Navigation as NavIcon, Hotel, CheckCircle2 } from 'lucide-react'
import { SplitText } from '../components/SplitText'
import { supabase } from '../lib/supabase'

const LOCATIONS = [
    {
        name: 'Hunza Valley',
        pricePerDay: 8000,
        minDays: 5,
        image: '/images/destination-hunza.jpg',
        badge: 'Most Popular',
        included: ['Hotel Stay', 'Breakfast', 'Transport', 'Tour Guide'],
        itinerary: [
            'Departure & travel to Hunza',
            'Arrival, hotel check-in, Karimabad',
            'Attabad Lake & Khunjerab views',
            'Altit & Baltit Fort exploration',
            'Departure back home',
        ],
    },
    {
        name: 'Skardu',
        pricePerDay: 9000,
        minDays: 5,
        image: '/images/destination-skardu.jpg',
        badge: 'Best Seller',
        included: ['Hotel Stay', 'Breakfast', 'Transport', 'Tour Guide'],
        itinerary: [
            'Departure & travel to Skardu',
            'Arrival, hotel check-in',
            'Shangrila & Upper Kachura Lake',
            'Deosai Plains day trip',
            'Departure back home',
        ],
    },
    {
        name: 'Fairy Meadows',
        pricePerDay: 10000,
        minDays: 4,
        image: '/images/destination-fairymeadows.jpg',
        badge: 'Adventure Pick',
        included: ['Camping Stay', 'All Meals', 'Jeep Transport', 'Guide'],
        itinerary: [
            'Departure & travel to Raikot Bridge',
            'Jeep ride & trek to Fairy Meadows',
            'Nanga Parbat base camp views',
            'Descend & departure back home',
        ],
    },
    {
        name: 'Kashmir',
        pricePerDay: 7000,
        minDays: 4,
        image: '/images/destination-kashmir.jpg',
        badge: 'Luxury Experience',
        included: ['Hotel Stay', 'Breakfast', 'Transport', 'Tour Guide'],
        itinerary: [
            'Departure & travel to Kashmir',
            'Arrival, hotel check-in, Neelum Valley',
            'Local sightseeing & rivers',
            'Departure back home',
        ],
    },
    {
        name: 'Murree',
        pricePerDay: 5000,
        minDays: 2,
        image: '/images/destination-murree.jpg',
        badge: 'Quick Getaway',
        included: ['Hotel Stay', 'Breakfast', 'Transport'],
        itinerary: [
            'Departure & travel to Murree',
            'Mall Road & Patriata sightseeing',
            'Departure back home',
        ],
    },
    {
        name: 'Naran',
        pricePerDay: 6500,
        minDays: 3,
        image: '/images/destination-naran.jpg',
        badge: 'Family Favorite',
        included: ['Hotel Stay', 'Breakfast', 'Transport', 'Tour Guide'],
        itinerary: [
            'Departure & travel to Naran',
            'Saiful Muluk Lake jeep trip',
            'Departure back home',
        ],
    },
    {
        name: 'Fort Munro',
        pricePerDay: 5500,
        minDays: 2,
        image: '/images/destination-fortmunro.jpg',
        badge: 'Hidden Gem',
        included: ['Hotel Stay', 'Breakfast', 'Transport'],
        itinerary: [
            'Departure & travel to Fort Munro',
            'Sightseeing & viewpoints',
            'Departure back home',
        ],
    },
]

const DEPARTURE_CITIES = ['Multan', 'Lahore', 'Islamabad']

const HOTEL_PRICES: Record<string, number> = {
    Standard: 0,
    Deluxe: 2000,
    Luxury: 5000,
}

export function PackageBuilderSection() {
    const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0])
    const [departure, setDeparture] = useState(DEPARTURE_CITIES[0])
    const [days, setDays] = useState(LOCATIONS[0].minDays)
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [hotelType, setHotelType] = useState('Standard')
    const [showPopup, setShowPopup] = useState(false)

    const totalPersons = adults + children
    const hotelExtra = HOTEL_PRICES[hotelType]
    const subtotal = (selectedLocation.pricePerDay + hotelExtra) * days * totalPersons

    let discountPercent = 0
    if (totalPersons >= 6) discountPercent = 15
    else if (totalPersons >= 3) discountPercent = 10

    const discountAmount = (subtotal * discountPercent) / 100
    const total = subtotal - discountAmount
    const advance = Math.round(total * 0.3)
    const remaining = total - advance

    const handleSelectLocation = (loc: typeof LOCATIONS[0]) => {
        setSelectedLocation(loc)
        setDays(loc.minDays)
    }

    const saveBooking = async () => {
        try {
            await supabase.from('bookings').insert({
                location: selectedLocation.name,
                departure: departure,
                days: days,
                adults: adults,
                children: children,
                hotel_type: hotelType,
                total_price: total,
                advance_amount: advance,
            })
        } catch (err) {
            console.error('Booking save failed:', err)
        }
    }

    const whatsappMessage = encodeURIComponent(
        `Hi! I'd like to book a trip:\nLocation: ${selectedLocation.name}\nDeparture City: ${departure}\nHotel: ${hotelType}\nAdults: ${adults}\nChildren: ${children}\nDays: ${days}\n\nSubtotal: Rs ${subtotal.toLocaleString()}\nDiscount: ${discountPercent}%\nFinal Total: Rs ${total.toLocaleString()}\nAdvance: Rs ${advance.toLocaleString()}\n\nPlease confirm availability.`
    )

    return (
        <section id="plan-trip" className="relative w-full bg-midnight py-24 lg:py-40">
            <div className="w-full px-6 lg:px-16 xl:px-24">
                {/* Heading */}
                <div className="text-center mb-4">
                    <SplitText text="PLAN YOUR TRIP" className="font-display text-cream" staggerDelay={0.03} />
                </div>
                <p className="text-center font-body text-mist/60 text-sm tracking-widest uppercase mb-16">
                    Build your own custom package
                </p>

                <div className="max-w-5xl mx-auto">
                    {/* Location Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                        {LOCATIONS.map((loc) => (
                            <button
                                key={loc.name}
                                onClick={() => handleSelectLocation(loc)}
                                className={`relative rounded-xl overflow-hidden text-left transition-all duration-300 border ${selectedLocation.name === loc.name
                                    ? 'border-forest ring-1 ring-forest'
                                    : 'border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="aspect-[4/3] relative">
                                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                                    <span className="absolute top-2 left-2 text-[10px] font-body bg-forest/80 text-cream px-2 py-0.5 rounded-full tracking-wide">
                                        {loc.badge}
                                    </span>
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <h3 className="font-display text-sm text-cream leading-tight">{loc.name}</h3>
                                        <p className="font-body text-[11px] text-mist/70">
                                            Rs {loc.pricePerDay.toLocaleString()}/person/day
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Builder Card */}
                    <div className="glass-panel-strong rounded-2xl p-6 lg:p-10">
                        {/* Included */}
                        <div className="mb-8">
                            <h3 className="font-body text-xs tracking-widest uppercase text-mist/70 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-forest" /> Included in {selectedLocation.name} Package
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedLocation.included.map((item) => (
                                    <span key={item} className="text-xs font-body text-cream/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Departure */}
                            <div>
                                <label className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mist/70 mb-3">
                                    <NavIcon className="w-3.5 h-3.5 text-forest" /> Departure From
                                </label>
                                <select
                                    value={departure}
                                    onChange={(e) => setDeparture(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm focus:outline-none focus:border-forest transition-colors"
                                >
                                    {DEPARTURE_CITIES.map((city) => (
                                        <option key={city} value={city} className="bg-midnight">{city}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Days */}
                            <div>
                                <label className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mist/70 mb-3">
                                    <Calendar className="w-3.5 h-3.5 text-forest" /> Days (min {selectedLocation.minDays})
                                </label>
                                <input
                                    type="number"
                                    min={selectedLocation.minDays}
                                    max={30}
                                    value={days}
                                    onChange={(e) => setDays(Math.max(selectedLocation.minDays, Number(e.target.value)))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm focus:outline-none focus:border-forest transition-colors"
                                />
                            </div>

                            {/* Adults */}
                            <div>
                                <label className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mist/70 mb-3">
                                    <Users className="w-3.5 h-3.5 text-forest" /> Adults
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={adults}
                                    onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm focus:outline-none focus:border-forest transition-colors"
                                />
                            </div>

                            {/* Children */}
                            <div>
                                <label className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mist/70 mb-3">
                                    <Users className="w-3.5 h-3.5 text-forest" /> Children
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    max={20}
                                    value={children}
                                    onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm focus:outline-none focus:border-forest transition-colors"
                                />
                            </div>

                            {/* Hotel Type */}
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mist/70 mb-3">
                                    <Hotel className="w-3.5 h-3.5 text-forest" /> Hotel Category
                                </label>
                                <select
                                    value={hotelType}
                                    onChange={(e) => setHotelType(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm focus:outline-none focus:border-forest transition-colors"
                                >
                                    <option value="Standard" className="bg-midnight">Standard (included)</option>
                                    <option value="Deluxe" className="bg-midnight">Deluxe (+Rs 2,000/person/day)</option>
                                    <option value="Luxury" className="bg-midnight">Luxury (+Rs 5,000/person/day)</option>
                                </select>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="bg-forest/10 border border-forest/30 rounded-xl p-5 mb-8 space-y-2">
                            <div className="flex justify-between font-body text-xs text-mist/70">
                                <span>Base Price</span>
                                <span>Rs {selectedLocation.pricePerDay.toLocaleString()} x {days}d x {totalPersons}p</span>
                            </div>
                            {hotelExtra > 0 && (
                                <div className="flex justify-between font-body text-xs text-mist/70">
                                    <span>Hotel Upgrade ({hotelType})</span>
                                    <span>+Rs {(hotelExtra * days * totalPersons).toLocaleString()}</span>
                                </div>
                            )}
                            {discountPercent > 0 && (
                                <div className="flex justify-between font-body text-xs text-forest">
                                    <span>Group Discount ({discountPercent}%)</span>
                                    <span>-Rs {discountAmount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/10">
                                <span className="font-body text-sm text-mist/70">Estimated Total</span>
                                <span className="font-display text-2xl text-forest">Rs {total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowPopup(true)}
                            className="w-full px-10 py-4 bg-forest text-cream font-body text-sm font-medium tracking-nav rounded-full transition-all duration-400 hover:shadow-[0_0_40px_rgba(30,91,58,0.4)]"
                        >
                            VIEW FULL PACKAGE DETAILS
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup */}
            {showPopup && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm overflow-y-auto"
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="glass-panel-strong rounded-2xl p-6 lg:p-8 max-w-lg w-full relative my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-5 right-5 text-mist/60 hover:text-cream transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="font-display text-2xl text-cream mb-1">{selectedLocation.name}</h3>
                        <p className="font-body text-xs text-mist/60 mb-6">{days} Days from {departure}</p>

                        {/* Itinerary */}
                        <div className="mb-6">
                            <h4 className="font-body text-xs tracking-widest uppercase text-mist/70 mb-3">Itinerary</h4>
                            <div className="space-y-2.5">
                                {selectedLocation.itinerary.map((step, i) => (
                                    <div key={i} className="flex gap-3">
                                        <span className="font-body text-xs text-forest font-medium w-14 shrink-0">Day {i + 1}</span>
                                        <span className="font-body text-sm text-cream/80">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trip Summary */}
                        <div className="mb-6 bg-white/5 rounded-xl p-4 space-y-2">
                            <div className="flex justify-between font-body text-xs text-mist/70">
                                <span>Departure</span><span className="text-cream">{departure}</span>
                            </div>
                            <div className="flex justify-between font-body text-xs text-mist/70">
                                <span>Hotel</span><span className="text-cream">{hotelType}</span>
                            </div>
                            <div className="flex justify-between font-body text-xs text-mist/70">
                                <span>Adults</span><span className="text-cream">{adults}</span>
                            </div>
                            <div className="flex justify-between font-body text-xs text-mist/70">
                                <span>Children</span><span className="text-cream">{children}</span>
                            </div>
                            <div className="flex justify-between font-body text-xs text-mist/70">
                                <span>Days</span><span className="text-cream">{days}</span>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="mb-6 space-y-2">
                            <div className="flex justify-between font-body text-xs text-mist/70">
                                <span>Subtotal</span><span>Rs {subtotal.toLocaleString()}</span>
                            </div>
                            {discountPercent > 0 && (
                                <div className="flex justify-between font-body text-xs text-forest">
                                    <span>Discount</span><span>{discountPercent}%</span>
                                </div>
                            )}
                            <div className="border-t border-white/10 pt-3 mt-1">
                                <div className="flex justify-between font-display text-lg text-cream mb-1.5">
                                    <span>Final Total</span><span>Rs {total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-body text-xs text-mist/70">
                                    <span>Advance (30%)</span><span>Rs {advance.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-body text-xs text-mist/70">
                                    <span>Remaining</span><span>Rs {remaining.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/923000000000?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={saveBooking}
                            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-forest text-cream font-body text-sm font-medium tracking-nav rounded-full hover:shadow-[0_0_30px_rgba(30,91,58,0.4)] transition-all duration-300"
                        >
                            <MessageCircle className="w-4 h-4" /> CONFIRM ON WHATSAPP
                        </a>
                        <p className="text-center font-body text-xs text-mist/50 mt-3">
                            Prices are estimates. Final price confirmed on contact.
                        </p>
                    </div>
                </div>
            )}
        </section>
    )
}
