"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Train, Users, Clock, CreditCard, Shield } from "lucide-react"
import { PaymentGateway } from "@/components/payment/payment-gateway"

interface BookingReviewProps {
  onNext: () => void
  onBack: () => void
  bookingData: any
  setBookingData: (data: any) => void
}

export function BookingReview({ onNext, onBack, bookingData, setBookingData }: BookingReviewProps) {
  const { trainInfo, selectedSeats, passengers, totalAmount } = bookingData
  const [showPayment, setShowPayment] = useState(false)

  const handlePaymentSuccess = (paymentData: any) => {
    // Generate booking ID
    const bookingId = `TRN${Date.now().toString().slice(-8)}`
    setBookingData({
      ...bookingData,
      bookingId,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
      paymentData,
    })
    onNext()
  }

  const handlePaymentCancel = () => {
    setShowPayment(false)
  }

  const taxes = Math.round(totalAmount * 0.05) // 5% tax
  const finalAmount = totalAmount + taxes

  if (showPayment) {
    return (
      <PaymentGateway
        amount={finalAmount}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentCancel={handlePaymentCancel}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Journey Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Train className="h-5 w-5" />
                <span>Journey Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{trainInfo.name}</h3>
                  <p className="text-gray-600">{trainInfo.number}</p>
                  <p className="text-sm text-gray-500">{trainInfo.date}</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">{trainInfo.class}</Badge>
              </div>

              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">{trainInfo.departure}</div>
                  <div className="text-sm text-gray-600">New Delhi</div>
                  <div className="text-xs text-gray-500">NDLS</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{trainInfo.duration}</span>
                  </div>
                  <div className="h-px bg-gray-300 mt-1"></div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">{trainInfo.arrival}</div>
                  <div className="text-sm text-gray-600">Mumbai Central</div>
                  <div className="text-xs text-gray-500">BCT</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Passenger Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {passengers.map((passenger: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{passenger.name}</div>
                      <div className="text-sm text-gray-600">
                        {passenger.age} years, {passenger.gender}
                        {index === 0 && " (Primary Contact)"}
                      </div>
                    </div>
                    <Badge variant="outline">{passenger.seat}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Fare ({selectedSeats.length} seats)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>₹{taxes}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-purple-600">₹{finalAmount}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Shield className="h-4 w-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="text-xs text-gray-500">Your payment information is encrypted and secure</div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
                >
                  Pay ₹{finalAmount}
                </Button>
                <Button variant="outline" onClick={onBack} className="w-full bg-transparent">
                  Back to Passenger Details
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center pt-2">
                By proceeding, you agree to our Terms & Conditions
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
