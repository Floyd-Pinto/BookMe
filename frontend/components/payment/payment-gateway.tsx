"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Smartphone,
  Wallet,
  Building2,
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"

interface PaymentGatewayProps {
  amount: number
  onPaymentSuccess: (paymentData: any) => void
  onPaymentCancel: () => void
}

export function PaymentGateway({ amount, onPaymentSuccess, onPaymentCancel }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState("select") // select, process, success, failed

  // Card payment state
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  // UPI payment state
  const [upiData, setUpiData] = useState({
    id: "",
    provider: "",
  })

  // Wallet payment state
  const [walletData, setWalletData] = useState({
    provider: "",
    phone: "",
  })

  // Net banking state
  const [bankData, setBankData] = useState({
    bank: "",
  })

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, popular: true },
    { id: "upi", name: "UPI", icon: Smartphone, popular: true },
    { id: "wallet", name: "Digital Wallet", icon: Wallet, popular: false },
    { id: "netbanking", name: "Net Banking", icon: Building2, popular: false },
  ]

  const walletProviders = [
    { id: "paytm", name: "Paytm", logo: "/paytm-logo.png" },
    { id: "phonepe", name: "PhonePe", logo: "/phonepe-logo.png" },
    { id: "googlepay", name: "Google Pay", logo: "/googlepay-logo.png" },
    { id: "amazonpay", name: "Amazon Pay", logo: "/amazonpay-logo.png" },
  ]

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
  ]

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentStep("process")

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate success/failure (90% success rate)
      if (Math.random() > 0.1) {
        const paymentData = {
          method: selectedMethod,
          transactionId: `TXN${Date.now()}`,
          amount,
          timestamp: new Date().toISOString(),
          status: "success",
        }
        setPaymentStep("success")
        setTimeout(() => {
          onPaymentSuccess(paymentData)
        }, 2000)
      } else {
        setPaymentStep("failed")
      }
    } catch (error) {
      setPaymentStep("failed")
    } finally {
      setIsProcessing(false)
    }
  }

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              />
            </div>
          </div>
        )

      case "upi":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm"
                value={upiData.id}
                onChange={(e) => setUpiData({ ...upiData, id: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["paytm", "phonepe", "googlepay", "bhim"].map((provider) => (
                <Button
                  key={provider}
                  variant={upiData.provider === provider ? "default" : "outline"}
                  onClick={() => setUpiData({ ...upiData, provider })}
                  className="h-12 capitalize"
                >
                  {provider}
                </Button>
              ))}
            </div>
          </div>
        )

      case "wallet":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Wallet</Label>
              <div className="grid grid-cols-2 gap-4">
                {walletProviders.map((wallet) => (
                  <Button
                    key={wallet.id}
                    variant={walletData.provider === wallet.id ? "default" : "outline"}
                    onClick={() => setWalletData({ ...walletData, provider: wallet.id })}
                    className="h-16 flex flex-col"
                  >
                    <span className="font-medium">{wallet.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            {walletData.provider && (
              <div className="space-y-2">
                <Label htmlFor="walletPhone">Phone Number</Label>
                <Input
                  id="walletPhone"
                  placeholder="+91 9876543210"
                  value={walletData.phone}
                  onChange={(e) => setWalletData({ ...walletData, phone: e.target.value })}
                />
              </div>
            )}
          </div>
        )

      case "netbanking":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Your Bank</Label>
              <Select value={bankData.bank} onValueChange={(value) => setBankData({ bank: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (paymentStep === "process") {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
              <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your payment securely...</p>
            </div>
            <div className="text-sm text-gray-500">Do not refresh or close this page</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (paymentStep === "success") {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-600">Your payment has been processed successfully</p>
            </div>
            <div className="text-2xl font-bold text-green-600">₹{amount}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (paymentStep === "failed") {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Payment Failed</h3>
              <p className="text-gray-600">There was an issue processing your payment. Please try again.</p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => setPaymentStep("select")} className="w-full bg-purple-600 hover:bg-purple-700">
                Try Again
              </Button>
              <Button variant="outline" onClick={onPaymentCancel} className="w-full bg-transparent">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Secure Payment</span>
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Shield className="h-4 w-4" />
            <span>256-bit SSL encrypted</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Amount */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount to Pay</span>
              <span className="text-2xl font-bold text-purple-600">₹{amount}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Choose Payment Method</h3>
            <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
              <TabsList className="grid w-full grid-cols-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <TabsTrigger key={method.id} value={method.id} className="flex flex-col space-y-1 h-16">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs">{method.name.split(" ")[0]}</span>
                      {method.popular && <Badge className="text-xs bg-orange-100 text-orange-800">Popular</Badge>}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {paymentMethods.map((method) => (
                <TabsContent key={method.id} value={method.id} className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <method.icon className="h-5 w-5" />
                        <span>{method.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>{renderPaymentForm()}</CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Payment Actions */}
          <div className="space-y-4">
            <Separator />
            <div className="flex space-x-4">
              <Button variant="outline" onClick={onPaymentCancel} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${amount}`
                )}
              </Button>
            </div>
            <div className="text-xs text-gray-500 text-center">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
