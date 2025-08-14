"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPin, ArrowRightLeft, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function TrainSearch() {
  const router = useRouter()
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [isRoundTrip, setIsRoundTrip] = useState(false)

  const swapCities = () => {
    const temp = fromCity
    setFromCity(toCity)
    setToCity(temp)
  }

  const handleSearch = () => {
    if (fromCity && toCity && departureDate) {
      const searchParams = new URLSearchParams({
        from: fromCity,
        to: toCity,
        departure: departureDate,
        ...(isRoundTrip && returnDate && { return: returnDate }),
        tripType: isRoundTrip ? "round" : "oneway",
      })
      router.push(`/search?${searchParams.toString()}`)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Trip Type Toggle */}
          <div className="flex space-x-4">
            <Button
              variant={!isRoundTrip ? "default" : "outline"}
              onClick={() => setIsRoundTrip(false)}
              className={cn("transition-all duration-200", !isRoundTrip && "bg-purple-600 hover:bg-purple-700")}
            >
              One Way
            </Button>
            <Button
              variant={isRoundTrip ? "default" : "outline"}
              onClick={() => setIsRoundTrip(true)}
              className={cn("transition-all duration-200", isRoundTrip && "bg-purple-600 hover:bg-purple-700")}
            >
              Round Trip
            </Button>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From City */}
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm font-medium text-gray-700">
                From
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="from"
                  placeholder="Departure city"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="pl-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={swapCities}
                className="hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* To City */}
            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm font-medium text-gray-700">
                To
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="to"
                  placeholder="Destination city"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="pl-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <Label htmlFor="departure" className="text-sm font-medium text-gray-700">
                Departure
              </Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="departure"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="pl-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Return Date (if round trip) */}
          {isRoundTrip && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-start-4 space-y-2">
                <Label htmlFor="return" className="text-sm font-medium text-gray-700">
                  Return
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="return"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="pl-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Trains
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
