"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { SeatSelection } from "@/components/booking/seat-selection"
import { PassengerDetails } from "@/components/booking/passenger-details"
import { BookingReview } from "@/components/booking/booking-review"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { Progress } from "@/components/ui/progress"

const steps = [
  { id: 1, name: "Select Seats", description: "Choose your preferred seats" },
  { id: 2, name: "Passenger Details", description: "Enter traveler information" },
  { id: 3, name: "Review & Pay", description: "Confirm your booking" },
  { id: 4, name: "Confirmation", description: "Booking confirmed" },
]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    selectedSeats: [],
    passengers: [],
    totalAmount: 0,
    bookingId: "",
  })

  const progressValue = (currentStep / steps.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SeatSelection onNext={() => setCurrentStep(2)} bookingData={bookingData} setBookingData={setBookingData} />
        )
      case 2:
        return (
          <PassengerDetails
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        )
      case 3:
        return (
          <BookingReview
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        )
      case 4:
        return <BookingConfirmation bookingData={bookingData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-serif text-3xl font-bold text-gray-800">Book Your Journey</h1>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>
          <Progress value={progressValue} className="mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 text-center ${step.id <= currentStep ? "text-purple-600" : "text-gray-400"}`}
              >
                <div className="text-sm font-medium">{step.name}</div>
                <div className="text-xs">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}
      </main>
    </div>
  )
}
