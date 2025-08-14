"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Train, Clock, Download, Search } from "lucide-react"

const bookingHistory = [
  {
    id: "TRN98765432",
    trainName: "Duronto Express",
    trainNumber: "12259",
    date: "Nov 15, 2024",
    departure: { time: "22:20", station: "Sealdah", code: "SDAH" },
    arrival: { time: "12:55", station: "New Delhi", code: "NDLS" },
    duration: "14h 35m",
    class: "AC 3 Tier",
    seats: ["S2-45"],
    passengers: ["John Doe"],
    status: "completed",
    pnr: "1847593620",
    amount: 1285,
  },
  {
    id: "TRN11223344",
    trainName: "Gatimaan Express",
    trainNumber: "12049",
    date: "Oct 28, 2024",
    departure: { time: "08:10", station: "New Delhi", code: "NDLS" },
    arrival: { time: "09:50", station: "Agra Cantt", code: "AGC" },
    duration: "1h 40m",
    class: "Chair Car",
    seats: ["CC-23", "CC-24"],
    passengers: ["John Doe", "Jane Doe"],
    status: "completed",
    pnr: "2947583610",
    amount: 1540,
  },
  {
    id: "TRN55667788",
    trainName: "Vande Bharat Express",
    trainNumber: "22439",
    date: "Oct 10, 2024",
    departure: { time: "06:00", station: "New Delhi", code: "NDLS" },
    arrival: { time: "14:25", station: "Varanasi", code: "BSB" },
    duration: "8h 25m",
    class: "Executive Chair Car",
    seats: ["EC-12"],
    passengers: ["John Doe"],
    status: "cancelled",
    pnr: "3847593630",
    amount: 2750,
  },
]

export function BookingHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBookings = bookingHistory.filter((booking) => {
    const matchesSearch =
      booking.trainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pnr.includes(searchTerm) ||
      booking.trainNumber.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-gray-800">Booking History</h2>
        <div className="text-sm text-gray-600">
          {filteredBookings.length} booking{filteredBookings.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by train name, PNR, or train number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Cards */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
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
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-2 font-medium text-purple-600">₹{booking.amount}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 lg:w-48">
                  {booking.status === "completed" && (
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Ticket
                    </Button>
                  )}
                  <Button variant="outline">View Details</Button>
                  {booking.status === "cancelled" && (
                    <Button variant="outline" className="text-blue-600 hover:text-blue-700 bg-transparent">
                      Request Refund
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Train className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => (window.location.href = "/")}>
              Book Your First Journey
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
