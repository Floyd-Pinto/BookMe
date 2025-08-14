"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Wifi, Coffee, Car, ChevronDown, ChevronUp } from "lucide-react"

interface Train {
  id: string
  name: string
  number: string
  type: string
  departure: {
    time: string
    station: string
    code: string
  }
  arrival: {
    time: string
    station: string
    code: string
  }
  duration: string
  classes: {
    name: string
    code: string
    price: number
    availability: string
    seats: number
  }[]
  amenities: string[]
  rating: number
  punctuality: number
}

const mockTrains: Train[] = [
  {
    id: "1",
    name: "Rajdhani Express",
    number: "12951",
    type: "Rajdhani",
    departure: { time: "16:55", station: "New Delhi", code: "NDLS" },
    arrival: { time: "08:35", station: "Mumbai Central", code: "BCT" },
    duration: "15h 40m",
    classes: [
      { name: "AC First Class", code: "1A", price: 4250, availability: "Available", seats: 8 },
      { name: "AC 2 Tier", code: "2A", price: 2890, availability: "Available", seats: 15 },
      { name: "AC 3 Tier", code: "3A", price: 2140, availability: "RAC", seats: 3 },
    ],
    amenities: ["wifi", "meals", "blanket"],
    rating: 4.2,
    punctuality: 85,
  },
  {
    id: "2",
    name: "Shatabdi Express",
    number: "12002",
    type: "Shatabdi",
    departure: { time: "06:00", station: "New Delhi", code: "NDLS" },
    arrival: { time: "11:45", station: "Chandigarh", code: "CDG" },
    duration: "5h 45m",
    classes: [
      { name: "Chair Car", code: "CC", price: 685, availability: "Available", seats: 25 },
      { name: "Executive Chair Car", code: "EC", price: 1365, availability: "Available", seats: 12 },
    ],
    amenities: ["wifi", "meals", "charging"],
    rating: 4.5,
    punctuality: 92,
  },
  {
    id: "3",
    name: "Duronto Express",
    number: "12259",
    type: "Duronto",
    departure: { time: "22:20", station: "Sealdah", code: "SDAH" },
    arrival: { time: "12:55", station: "New Delhi", code: "NDLS" },
    duration: "14h 35m",
    classes: [
      { name: "Sleeper", code: "SL", price: 485, availability: "Available", seats: 45 },
      { name: "AC 3 Tier", code: "3A", price: 1285, availability: "Available", seats: 28 },
      { name: "AC 2 Tier", code: "2A", price: 1845, availability: "Waiting", seats: 0 },
    ],
    amenities: ["charging", "blanket"],
    rating: 4.0,
    punctuality: 78,
  },
]

export function SearchResults() {
  const router = useRouter()
  const [expandedTrain, setExpandedTrain] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("departure")

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "meals":
        return <Coffee className="h-4 w-4" />
      case "charging":
        return <Car className="h-4 w-4" />
      default:
        return null
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800"
      case "rac":
        return "bg-yellow-100 text-yellow-800"
      case "waiting":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleBooking = (trainId: string, classCode: string) => {
    // Navigate to booking page with train and class info
    const searchParams = new URLSearchParams({
      trainId,
      classCode,
    })
    router.push(`/booking?${searchParams.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-gray-800">Available Trains</h2>
          <p className="text-gray-600">Mumbai → Delhi • Today • {mockTrains.length} trains found</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="departure">Departure Time</option>
            <option value="duration">Duration</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Train Cards */}
      <div className="space-y-4">
        {mockTrains.map((train) => (
          <Card key={train.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              {/* Main Train Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{train.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {train.number}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">{train.type}</Badge>
                  </div>

                  {/* Route Info */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {train.departure.station} ({train.departure.code})
                      </span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {train.arrival.station} ({train.arrival.code})
                      </span>
                    </div>
                  </div>

                  {/* Time and Duration */}
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{train.departure.time}</div>
                      <div className="text-xs text-gray-500">{train.departure.code}</div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{train.duration}</span>
                      </div>
                      <div className="h-px bg-gray-300 mt-1"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{train.arrival.time}</div>
                      <div className="text-xs text-gray-500">{train.arrival.code}</div>
                    </div>
                  </div>
                </div>

                {/* Price and Book Button */}
                <div className="lg:text-right">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    ₹{Math.min(...train.classes.map((c) => c.price))}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">onwards</div>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                    onClick={() => handleBooking(train.id, train.classes[0].code)}
                  >
                    View Seats
                  </Button>
                </div>
              </div>

              {/* Amenities and Rating */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {train.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-1 text-gray-600">
                        {getAmenityIcon(amenity)}
                        <span className="text-xs capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span>{train.rating}</span>
                  </div>
                  <div className="text-gray-600">{train.punctuality}% on time</div>
                </div>
              </div>

              {/* Expandable Class Details */}
              <div className="border-t pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setExpandedTrain(expandedTrain === train.id ? null : train.id)}
                  className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
                >
                  <span className="text-sm font-medium">View all classes and availability</span>
                  {expandedTrain === train.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                {expandedTrain === train.id && (
                  <div className="mt-4 space-y-3">
                    {train.classes.map((cls, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="font-medium text-gray-800">{cls.name}</div>
                            <div className="text-sm text-gray-600">{cls.code}</div>
                          </div>
                          <Badge className={getAvailabilityColor(cls.availability)}>{cls.availability}</Badge>
                          {cls.seats > 0 && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Users className="h-4 w-4" />
                              <span>{cls.seats} seats</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-800">₹{cls.price}</div>
                          <Button
                            size="sm"
                            className="mt-1 bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleBooking(train.id, cls.code)}
                          >
                            Book
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
