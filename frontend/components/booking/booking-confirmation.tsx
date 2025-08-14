"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Share, Train, Users, Clock, CreditCard } from "lucide-react"

interface BookingConfirmationProps {
  bookingData: any
}

export function BookingConfirmation({ bookingData }: BookingConfirmationProps) {
  const { trainInfo, selectedSeats, passengers, totalAmount, bookingId, paymentData } = bookingData

  const taxes = Math.round(totalAmount * 0.05)
  const finalAmount = totalAmount + taxes

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600">Your train tickets have been successfully booked</p>
        <div className="mt-4">
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">Booking ID: {bookingId}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Details */}
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

          {/* Payment Details */}
          {paymentData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium capitalize">{paymentData.method}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-medium">{paymentData.transactionId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Status</span>
                  <Badge className="bg-green-100 text-green-800">Success</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-medium text-green-600">₹{paymentData.amount}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Important Information */}
          <Card>
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p>Please carry a valid photo ID proof during your journey</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p>Arrive at the station at least 30 minutes before departure</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p>Cancellation charges apply as per railway rules</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p>SMS and email confirmations have been sent to your registered contact details</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions & Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
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
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Paid</span>
                    <span className="text-green-600">₹{finalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Ticket
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Share className="h-4 w-4 mr-2" />
                  Share Booking
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => (window.location.href = "/")}
                >
                  Book Another Journey
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center pt-4">Need help? Contact our 24/7 customer support</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
