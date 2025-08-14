"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { BookingHistory } from "@/components/dashboard/booking-history"
import { UpcomingJourneys } from "@/components/dashboard/upcoming-journeys"
import { ProfileSettings } from "@/components/dashboard/profile-settings"
import { TravelStats } from "@/components/dashboard/travel-stats"
import { PaymentMethods } from "@/components/payment/payment-methods"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <UpcomingJourneys />
            <TravelStats />
          </div>
        )
      case "bookings":
        return <BookingHistory />
      case "profile":
        return <ProfileSettings />
      case "payments":
        return <PaymentMethods />
      default:
        return (
          <div className="space-y-8">
            <UpcomingJourneys />
            <TravelStats />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
