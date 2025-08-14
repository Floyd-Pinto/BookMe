"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Phone, Mail, Calendar } from "lucide-react"

interface PassengerDetailsProps {
  onNext: () => void
  onBack: () => void
  bookingData: any
  setBookingData: (data: any) => void
}

export function PassengerDetails({ onNext, onBack, bookingData, setBookingData }: PassengerDetailsProps) {
  const [passengers, setPassengers] = useState(
    bookingData.selectedSeats.map((seat: string, index: number) => ({
      id: index + 1,
      seat,
      name: "",
      age: "",
      gender: "",
      phone: index === 0 ? "" : "", // Only first passenger needs phone
      email: index === 0 ? "" : "", // Only first passenger needs email
    })),
  )

  const updatePassenger = (index: number, field: string, value: string) => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value }
    setPassengers(updatedPassengers)
  }

  const handleNext = () => {
    setBookingData({
      ...bookingData,
      passengers,
    })
    onNext()
  }

  const isFormValid = () => {
    return passengers.every((passenger, index) => {
      const basicValid = passenger.name && passenger.age && passenger.gender
      if (index === 0) {
        return basicValid && passenger.phone && passenger.email
      }
      return basicValid
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Passenger Details</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Enter details for {passengers.length} passenger{passengers.length > 1 ? "s" : ""}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {passengers.map((passenger, index) => (
            <div key={passenger.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                  Passenger {index + 1} {index === 0 && "(Primary Contact)"}
                </h3>
                <div className="text-sm text-gray-600 bg-purple-100 px-2 py-1 rounded">Seat: {passenger.seat}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`}>Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id={`name-${index}`}
                      placeholder="Enter full name"
                      value={passenger.name}
                      onChange={(e) => updatePassenger(index, "name", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor={`age-${index}`}>Age *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id={`age-${index}`}
                      type="number"
                      placeholder="Age"
                      value={passenger.age}
                      onChange={(e) => updatePassenger(index, "age", e.target.value)}
                      className="pl-10"
                      min="1"
                      max="120"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select value={passenger.gender} onValueChange={(value) => updatePassenger(index, "gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact details for primary passenger */}
              {index === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={passenger.phone}
                        onChange={(e) => updatePassenger(index, "phone", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={passenger.email}
                        onChange={(e) => updatePassenger(index, "email", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack}>
              Back to Seat Selection
            </Button>
            <Button onClick={handleNext} disabled={!isFormValid()} className="bg-purple-600 hover:bg-purple-700">
              Continue to Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
