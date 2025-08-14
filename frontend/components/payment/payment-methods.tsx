"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Trash2, Edit } from "lucide-react"

interface SavedCard {
  id: string
  last4: string
  brand: string
  expiry: string
  isDefault: boolean
}

export function PaymentMethods() {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    {
      id: "1",
      last4: "4532",
      brand: "Visa",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      last4: "8901",
      brand: "Mastercard",
      expiry: "08/26",
      isDefault: false,
    },
  ])

  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handleAddCard = () => {
    const card: SavedCard = {
      id: Date.now().toString(),
      last4: newCard.number.slice(-4),
      brand: "Visa", // In real app, detect from card number
      expiry: newCard.expiry,
      isDefault: savedCards.length === 0,
    }
    setSavedCards([...savedCards, card])
    setNewCard({ number: "", expiry: "", cvv: "", name: "" })
    setShowAddCard(false)
  }

  const handleDeleteCard = (id: string) => {
    setSavedCards(savedCards.filter((card) => card.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setSavedCards(
      savedCards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      })),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-gray-800">Payment Methods</h2>
        <Button onClick={() => setShowAddCard(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>

      {/* Saved Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedCards.map((card) => (
          <Card key={card.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">•••• •••• •••• {card.last4}</div>
                    <div className="text-sm text-gray-600">
                      {card.brand} • Expires {card.expiry}
                    </div>
                  </div>
                </div>
                {card.isDefault && <Badge className="bg-green-100 text-green-800">Default</Badge>}
              </div>

              <div className="flex space-x-2">
                {!card.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(card.id)}
                    className="flex-1 bg-transparent"
                  >
                    Set Default
                  </Button>
                )}
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCard(card.id)}
                  className="text-red-600 hover:text-red-700 bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Card Form */}
      {showAddCard && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                  type="password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleAddCard} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Add Card
              </Button>
              <Button variant="outline" onClick={() => setShowAddCard(false)} className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {savedCards.length === 0 && !showAddCard && (
        <Card>
          <CardContent className="p-12 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">No Payment Methods</h3>
            <p className="text-gray-600 mb-4">Add a payment method to make booking faster</p>
            <Button onClick={() => setShowAddCard(true)} className="bg-purple-600 hover:bg-purple-700">
              Add Your First Card
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
