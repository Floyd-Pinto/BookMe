"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, Bell, Shield, CreditCard } from "lucide-react"

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    dateOfBirth: "1990-05-15",
    gender: "male",
    address: "123 Main Street, New Delhi, 110001",
    emergencyContact: "+91 9876543211",
  })

  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    promotions: false,
    trainAlerts: true,
    emailNotifications: true,
    smsNotifications: true,
  })

  const [preferences, setPreferences] = useState({
    preferredClass: "3A",
    mealPreference: "vegetarian",
    seatPreference: "window",
    language: "english",
  })

  const updateProfile = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const updateNotifications = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const updatePreferences = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-gray-800">Profile Settings</h2>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => updateProfile("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => updateProfile("lastName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile("email", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => updateProfile("phone", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => updateProfile("dateOfBirth", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={profile.gender} onValueChange={(value) => updateProfile("gender", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => updateProfile("address", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="emergencyContact"
                value={profile.emergencyContact}
                onChange={(e) => updateProfile("emergencyContact", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Travel Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preferred Class</Label>
              <Select
                value={preferences.preferredClass}
                onValueChange={(value) => updatePreferences("preferredClass", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SL">Sleeper (SL)</SelectItem>
                  <SelectItem value="3A">AC 3 Tier (3A)</SelectItem>
                  <SelectItem value="2A">AC 2 Tier (2A)</SelectItem>
                  <SelectItem value="1A">AC First Class (1A)</SelectItem>
                  <SelectItem value="CC">Chair Car (CC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Meal Preference</Label>
              <Select
                value={preferences.mealPreference}
                onValueChange={(value) => updatePreferences("mealPreference", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="jain">Jain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Seat Preference</Label>
              <Select
                value={preferences.seatPreference}
                onValueChange={(value) => updatePreferences("seatPreference", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="window">Window</SelectItem>
                  <SelectItem value="aisle">Aisle</SelectItem>
                  <SelectItem value="middle">Middle</SelectItem>
                  <SelectItem value="no-preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={preferences.language} onValueChange={(value) => updatePreferences("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="bengali">Bengali</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Booking Updates</div>
              <div className="text-sm text-gray-600">Get notified about booking confirmations and changes</div>
            </div>
            <Switch
              checked={notifications.bookingUpdates}
              onCheckedChange={(checked) => updateNotifications("bookingUpdates", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Promotions & Offers</div>
              <div className="text-sm text-gray-600">Receive promotional emails and special offers</div>
            </div>
            <Switch
              checked={notifications.promotions}
              onCheckedChange={(checked) => updateNotifications("promotions", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Train Alerts</div>
              <div className="text-sm text-gray-600">Get alerts about delays, cancellations, and platform changes</div>
            </div>
            <Switch
              checked={notifications.trainAlerts}
              onCheckedChange={(checked) => updateNotifications("trainAlerts", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-gray-600">Receive notifications via email</div>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => updateNotifications("emailNotifications", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">SMS Notifications</div>
              <div className="text-sm text-gray-600">Receive notifications via SMS</div>
            </div>
            <Switch
              checked={notifications.smsNotifications}
              onCheckedChange={(checked) => updateNotifications("smsNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Payment Methods
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
      </div>
    </div>
  )
}
