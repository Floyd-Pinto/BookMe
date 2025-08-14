"use client"

import { LoginDialog } from "@/components/auth/login-dialog"
import { Button } from "@/components/ui/button"
import { Train, Menu, X, User } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Train className="h-6 w-6 text-white" />
            </div>
            <span className="font-serif text-2xl font-bold text-gray-800">TrainEase</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
              Book Tickets
            </a>
            <a href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
              My Bookings
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
              Train Status
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
              Help
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LoginDialog />
            <Button className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200">
              <User className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                Book Tickets
              </a>
              <a href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                My Bookings
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                Train Status
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
                Help
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <LoginDialog />
                <Button className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
