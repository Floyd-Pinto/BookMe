"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Filter, RotateCcw } from "lucide-react"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([500, 3000])
  const [selectedTrainTypes, setSelectedTrainTypes] = useState<string[]>([])
  const [selectedDepartureTimes, setSelectedDepartureTimes] = useState<string[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])

  const trainTypes = [
    { id: "express", label: "Express", count: 12 },
    { id: "superfast", label: "Superfast", count: 8 },
    { id: "rajdhani", label: "Rajdhani", count: 3 },
    { id: "shatabdi", label: "Shatabdi", count: 2 },
    { id: "duronto", label: "Duronto", count: 4 },
  ]

  const departureTimes = [
    { id: "early-morning", label: "Early Morning (00:00 - 06:00)", count: 5 },
    { id: "morning", label: "Morning (06:00 - 12:00)", count: 8 },
    { id: "afternoon", label: "Afternoon (12:00 - 18:00)", count: 7 },
    { id: "evening", label: "Evening (18:00 - 24:00)", count: 6 },
  ]

  const classes = [
    { id: "sleeper", label: "Sleeper (SL)", count: 15 },
    { id: "3ac", label: "AC 3 Tier (3A)", count: 12 },
    { id: "2ac", label: "AC 2 Tier (2A)", count: 8 },
    { id: "1ac", label: "AC First Class (1A)", count: 4 },
    { id: "cc", label: "Chair Car (CC)", count: 6 },
  ]

  const handleCheckboxChange = (
    value: string,
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void,
  ) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value))
    } else {
      setSelectedItems([...selectedItems, value])
    }
  }

  const clearAllFilters = () => {
    setPriceRange([500, 3000])
    setSelectedTrainTypes([])
    setSelectedDepartureTimes([])
    setSelectedClasses([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-purple-600 hover:text-purple-700"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Price Range</Label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={5000}
                min={200}
                step={100}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Train Types */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Train Type</Label>
            <div className="space-y-3">
              {trainTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedTrainTypes.includes(type.id)}
                      onCheckedChange={() => handleCheckboxChange(type.id, selectedTrainTypes, setSelectedTrainTypes)}
                    />
                    <Label htmlFor={type.id} className="text-sm cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                  <span className="text-xs text-gray-500">({type.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Departure Time */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Departure Time</Label>
            <div className="space-y-3">
              {departureTimes.map((time) => (
                <div key={time.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={time.id}
                      checked={selectedDepartureTimes.includes(time.id)}
                      onCheckedChange={() =>
                        handleCheckboxChange(time.id, selectedDepartureTimes, setSelectedDepartureTimes)
                      }
                    />
                    <Label htmlFor={time.id} className="text-sm cursor-pointer">
                      {time.label}
                    </Label>
                  </div>
                  <span className="text-xs text-gray-500">({time.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Class */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Class</Label>
            <div className="space-y-3">
              {classes.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={cls.id}
                      checked={selectedClasses.includes(cls.id)}
                      onCheckedChange={() => handleCheckboxChange(cls.id, selectedClasses, setSelectedClasses)}
                    />
                    <Label htmlFor={cls.id} className="text-sm cursor-pointer">
                      {cls.label}
                    </Label>
                  </div>
                  <span className="text-xs text-gray-500">({cls.count})</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
