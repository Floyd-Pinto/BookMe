import { TrainSearch } from "@/components/search/train-search"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/subtle-railway-pattern.png')] opacity-5"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Your Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Effortless Train Bookings at Your Fingertips
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explore routes, compare prices, and book your tickets in minutes.
          </p>
        </div>

        {/* Search Component */}
        <div className="mb-16">
          <TrainSearch />
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">24/7</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Always Available</h3>
            <p className="text-gray-600">Book tickets anytime, anywhere</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">₹0</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">No Hidden Fees</h3>
            <p className="text-gray-600">Transparent pricing always</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">5M+</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Happy Travelers</h3>
            <p className="text-gray-600">Join millions of satisfied customers</p>
          </div>
        </div>
      </div>
    </section>
  )
}
