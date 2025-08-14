"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Train, MapPin, Clock } from "lucide-react"

interface SeatSelectionProps {
  onNext: () => void
  bookingData: any
  setBookingData: (data: any) => void
}

export function SeatSelection({ onNext, bookingData, setBookingData }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [selectedCoach, setSelectedCoach] = useState("S1")

  // Mock train data
  const trainInfo = {
    name: "Rajdhani Express",
    number: "12951",
    date: "Today, Dec 15",
    route: "New Delhi → Mumbai Central",
    departure: "16:55",
    arrival: "08:35",
    duration: "15h 40m",
    class: "AC 3 Tier (3A)",
    price: 2140,
  }

  const coaches = [
    { id: "S1", name: "S1", type: "AC 3 Tier", available: 45, total: 72 },
    { id: "S2", name: "S2", type: "AC 3 Tier", available: 38, total: 72 },
    { id: "S3", name: "S3", type: "AC 3 Tier", available: 52, total: 72 },
    { id: "S4", name: "S4", type: "AC 3 Tier", available: 41, total: 72 },
  ]

  // Generate seat layout for AC 3 Tier
  const generateSeats = () => {
    const seats = []
    const seatStatuses = ["available", "occupied", "selected", "ladies"]

    for (let i = 1; i <= 72; i++) {
      const seatNumber = `${selectedCoach}-${i}`
      let status = "available"

      // Randomly assign some seats as occupied for demo
      if (Math.random() < 0.3) status = "occupied"
      if (Math.random() < 0.1) status = "ladies"
      if (selectedSeats.includes(seatNumber)) status = "selected"

      seats.push({
        number: seatNumber,
        displayNumber: i,
        status,
        type: i % 8 === 1 || i % 8 === 2 ? "lower" : i % 8 === 3 || i % 8 === 4 ? "middle" : "upper",
      })
    }
    return seats
  }

  const seats = generateSeats()

  const handleSeatClick = (seatNumber: string, status: string) => {
    if (status === "occupied") return

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  const handleNext = () => {
    setBookingData({
      ...bookingData,
      selectedSeats,
      totalAmount: selectedSeats.length * trainInfo.price,
      trainInfo,
    })
    onNext()
  }

  const getSeatColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 hover:bg-green-200 border-green-300 text-green-800"
      case "occupied":
        return "bg-red-100 border-red-300 text-red-800 cursor-not-allowed"
      case "selected":
        return "bg-purple-500 border-purple-600 text-white"
      case "ladies":
        return "bg-pink-100 hover:bg-pink-200 border-pink-300 text-pink-800"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Train Info */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Train className="h-5 w-5" />
              <span>Journey Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{trainInfo.name}</h3>
              <p className="text-gray-600">{trainInfo.number}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{trainInfo.route}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>
                  {trainInfo.departure} - {trainInfo.arrival}
                </span>
              </div>
              <div className="text-sm text-gray-600">{trainInfo.duration}</div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{trainInfo.class}</span>
                <span className="font-bold text-purple-600">₹{trainInfo.price}</span>
              </div>
              <div className="text-sm text-gray-600">{trainInfo.date}</div>
            </div>

            {selectedSeats.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Selected Seats</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedSeats.map((seat) => (
                    <Badge key={seat} className="bg-purple-100 text-purple-800">
                      {seat}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Amount:</span>
                  <span className="font-bold text-lg text-purple-600">₹{selectedSeats.length * trainInfo.price}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Seat Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 border border-purple-600 rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-pink-100 border border-pink-300 rounded"></div>
                <span>Ladies</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seat Selection */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Select Your Seats</CardTitle>
              <div className="flex space-x-2">
                {coaches.map((coach) => (
                  <Button
                    key={coach.id}
                    variant={selectedCoach === coach.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCoach(coach.id)}
                    className={selectedCoach === coach.id ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {coach.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Coach {selectedCoach} - {coaches.find((c) => c.id === selectedCoach)?.available} available of{" "}
              {coaches.find((c) => c.id === selectedCoach)?.total}
            </div>
          </CardHeader>
          <CardContent>
            {/* Seat Layout */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-8 gap-2 max-w-2xl mx-auto">
                {seats.map((seat) => (
                  <button
                    key={seat.number}
                    onClick={() => handleSeatClick(seat.number, seat.status)}
                    className={`
                      w-8 h-8 text-xs font-medium border rounded transition-colors duration-200
                      ${getSeatColor(seat.status)}
                    `}
                    disabled={seat.status === "occupied"}
                  >
                    {seat.displayNumber}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">
                {selectedSeats.length} seat{selectedSeats.length !== 1 ? "s" : ""} selected
              </div>
              <Button
                onClick={handleNext}
                disabled={selectedSeats.length === 0}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Continue to Passenger Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
