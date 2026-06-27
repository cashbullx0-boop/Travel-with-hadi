import { useState } from 'react'
import { Send } from 'lucide-react'

const TOURS = [
  'Northern Explorer (10 Days)',
  'Hunza & Skardu (7 Days)',
  'Hunza & Skardu (8 Days)',
  'Fairy Meadows Trek (5 Days)',
  'Hunza (5 Days)',
  'Skardu (6 Days)',
  'Kashmir Valley (6 Days)',
  'Naran (3 Days)',
  'Kashmir (3 Days)',
  'Swat Kalam (3 Days)',
  'Murree (3 Days)',
  'Custom Itinerary',
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tour: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/contact-attabad.jpg"
          alt="Attabad Lake at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-midnight/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/30" />
      </div>

      {/* Content */}
      <div className="relative w-full px-6 lg:px-16 xl:px-24 py-24 lg:py-40">
        <div className="max-w-lg mx-auto">
          {/* Glass Form Panel */}
          <div className="glass-panel-strong rounded-2xl p-8 lg:p-10">
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl lg:text-4xl text-cream mb-2">
                Ready For The Adventure?
              </h2>
              <p className="font-body text-sm text-mist">
                Leave Your Request
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-forest/20 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-display text-2xl text-cream mb-3">
                  Request Received!
                </h3>
                <p className="font-body text-sm text-mist">
                  Our team will contact you within 24 hours to plan your perfect journey.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block font-body text-xs tracking-nav text-mist mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-cream placeholder-mist/40 focus:outline-none focus:border-forest/50 transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block font-body text-xs tracking-nav text-mist mb-2">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-cream placeholder-mist/40 focus:outline-none focus:border-forest/50 transition-colors duration-300"
                    placeholder="+92 3XX XXXXXXX"
                  />
                </div>

                {/* Preferred Tour */}
                <div>
                  <label className="block font-body text-xs tracking-nav text-mist mb-2">
                    PREFERRED TOUR
                  </label>
                  <select
                    name="tour"
                    required
                    value={formData.tour}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-cream focus:outline-none focus:border-forest/50 transition-colors duration-300 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                    }}
                  >
                    <option value="" disabled className="bg-midnight">
                      Select a tour
                    </option>
                    {TOURS.map((tour) => (
                      <option key={tour} value={tour} className="bg-midnight">
                        {tour}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-body text-xs tracking-nav text-mist mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-cream placeholder-mist/40 focus:outline-none focus:border-forest/50 transition-colors duration-300 resize-none"
                    placeholder="Tell us about your ideal trip..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-forest text-cream font-body text-sm font-medium tracking-nav rounded-lg hover:bg-pine transition-colors duration-400 ease-cinematic flex items-center justify-center gap-2"
                >
                  <span>BOOK MY JOURNEY</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}