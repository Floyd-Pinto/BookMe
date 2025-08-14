"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Download, Calendar, AlertCircle } from "lucide-react"

const upcomingBookings = [
  {
    id: "TRN12345678",
    trainName: "Rajdhani Express",
    trainNumber: "12951",
    date: "Dec 20, 2024",
    departure: { time: "16:55", station: "New Delhi", code: "NDLS" },
    arrival: { time: "08:35", station: "Mumbai Central", code: "BCT" },
    duration: "15h 40m",
    class: "AC 3 Tier",
    seats: ["S1-23", "S1-24"],
    passengers: ["John Doe", "Jane Doe"],
    status: "confirmed",
    pnr: "2847593610",
  },
  {
    id: "TRN87654321",
    trainName: "Shatabdi Express",
    trainNumber: "12002",
    date: "Dec 25, 2024",
    departure: { time: "06:00", station: "New Delhi", code: "NDLS" },
    arrival: { time: "11:45", station: "Chandigarh", code: "CDG" },
    duration: "5h 45m",
    class: "Chair Car",
    seats: ["CC-15"],
    passengers: ["John Doe"],
    status: "waitlisted",
    pnr: "4729581630",
  },
]

export function UpcomingJourneys() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "waitlisted":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-gray-800">Upcoming Journeys</h2>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {upcomingBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Journey Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg text-gray-800">{booking.trainName}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {booking.trainNumber}
                      </Badge>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">{booking.date}</div>
                  </div>

                  {/* Route and Time */}
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{booking.departure.time}</div>
                      <div className="text-sm text-gray-600">{booking.departure.station}</div>
                      <div className="text-xs text-gray-500">{booking.departure.code}</div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{booking.duration}</span>
                      </div>
                      <div className="h-px bg-gray-300 mt-1"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{booking.arrival.time}</div>
                      <div className="text-sm text-gray-600">{booking.arrival.station}</div>
                      <div className="text-xs text-gray-500">{booking.arrival.code}</div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Class:</span>
                      <span className="ml-2 font-medium">{booking.class}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Seats:</span>
                      <span className="ml-2 font-medium">{booking.seats.join(", ")}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">PNR:</span>
                      <span className="ml-2 font-medium">{booking.pnr}</span>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="mt-3 text-sm">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="ml-2">{booking.passengers.join(", ")}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 lg:w-48">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Ticket
                  </Button>
                  <Button variant="outline">View Details</Button>
                  {booking.status === "waitlisted" && (
                    <div className="flex items-center space-x-1 text-xs text-yellow-600 mt-2">
                      <AlertCircle className="h-3 w-3" />
                      <span>Check status regularly</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
