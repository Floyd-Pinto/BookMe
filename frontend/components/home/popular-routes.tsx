import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, IndianRupee } from "lucide-react"

const popularRoutes = [
  {
    from: "Mumbai",
    to: "Delhi",
    duration: "16h 30m",
    price: "₹1,250",
    image: "/mumbai-delhi-train-scenic.png",
  },
  {
    from: "Bangalore",
    to: "Chennai",
    duration: "5h 15m",
    price: "₹650",
    image: "/bangalore-chennai-train-scenic-view.png",
  },
  {
    from: "Delhi",
    to: "Kolkata",
    duration: "17h 45m",
    price: "₹1,100",
    image: "/delhi-kolkata-train-scenic-view.png",
  },
  {
    from: "Pune",
    to: "Goa",
    duration: "12h 20m",
    price: "₹850",
    image: "/pune-goa-train-scenic.png",
  },
]

export function PopularRoutes() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Routes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most traveled routes and find great deals on your favorite destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={route.image || "/placeholder.svg"}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-purple-600">{route.price}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold text-gray-800">{route.from}</span>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">{route.to}</span>
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm font-semibold text-purple-600">
                    <IndianRupee className="h-4 w-4" />
                    <span>{route.price.slice(1)}</span>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
