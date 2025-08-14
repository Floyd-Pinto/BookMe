"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Award, Train, IndianRupee } from "lucide-react"

const travelStats = {
  totalJourneys: 12,
  totalDistance: 8450,
  totalSpent: 24580,
  favoriteRoute: "Delhi → Mumbai",
  mostUsedClass: "AC 3 Tier",
  onTimePercentage: 85,
  carbonSaved: 245,
  loyaltyPoints: 1250,
}

const monthlyStats = [
  { month: "Jan", journeys: 2, spent: 3200 },
  { month: "Feb", journeys: 1, spent: 1800 },
  { month: "Mar", journeys: 3, spent: 4500 },
  { month: "Apr", journeys: 2, spent: 2800 },
  { month: "May", journeys: 1, spent: 1200 },
  { month: "Jun", journeys: 3, spent: 5100 },
]

const achievements = [
  { title: "Frequent Traveler", description: "Completed 10+ journeys", icon: Train, earned: true },
  { title: "Route Explorer", description: "Traveled 5+ different routes", icon: MapPin, earned: true },
  { title: "Eco Warrior", description: "Saved 200kg+ CO2", icon: Award, earned: true },
  { title: "Punctuality Pro", description: "80%+ on-time journeys", icon: Clock, earned: false },
]

export function TravelStats() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-gray-800">Travel Statistics</h2>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <Train className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{travelStats.totalJourneys}</div>
            <div className="text-sm text-gray-600">Total Journeys</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{travelStats.totalDistance.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Kilometers Traveled</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <IndianRupee className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">₹{travelStats.totalSpent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{travelStats.loyaltyPoints}</div>
            <div className="text-sm text-gray-600">Loyalty Points</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Travel Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Travel Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Favorite Route</span>
                <Badge className="bg-purple-100 text-purple-800">{travelStats.favoriteRoute}</Badge>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Most Used Class</span>
                <Badge variant="outline">{travelStats.mostUsedClass}</Badge>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">On-Time Performance</span>
                <span className="text-sm font-medium">{travelStats.onTimePercentage}%</span>
              </div>
              <Progress value={travelStats.onTimePercentage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Carbon Footprint Saved</span>
                <span className="text-sm font-medium text-green-600">{travelStats.carbonSaved}kg CO₂</span>
              </div>
              <div className="text-xs text-gray-500">vs. flying equivalent routes</div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.slice(-6).map((stat, index) => (
                <div key={stat.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 text-sm text-gray-600">{stat.month}</div>
                    <div className="flex-1">
                      <Progress value={(stat.journeys / 3) * 100} className="h-2 w-24" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{stat.journeys} trips</div>
                    <div className="text-xs text-gray-500">₹{stat.spent.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${
                    achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      achievement.earned ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${achievement.earned ? "text-gray-800" : "text-gray-500"}`}>
                      {achievement.title}
                    </div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                  </div>
                  {achievement.earned && <Badge className="bg-green-100 text-green-800">Earned</Badge>}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
