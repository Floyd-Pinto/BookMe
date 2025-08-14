"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Ticket, User, CreditCard, Settings, LogOut, Train } from "lucide-react"

interface DashboardSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "bookings", label: "My Bookings", icon: Ticket },
    { id: "profile", label: "Profile", icon: User },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback className="bg-purple-100 text-purple-600">JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-800">John Doe</h3>
              <p className="text-sm text-gray-600">john.doe@email.com</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-xs text-gray-600">Total Trips</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">₹24,580</div>
              <div className="text-xs text-gray-600">Total Spent</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card>
        <CardContent className="p-2">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === item.id ? "bg-purple-600 hover:bg-purple-700 text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-800">Quick Actions</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => (window.location.href = "/")}>
            <Train className="h-4 w-4 mr-2" />
            Book New Journey
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
