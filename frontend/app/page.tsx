import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/home/hero-section"
import { PopularRoutes } from "@/components/home/popular-routes"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <PopularRoutes />
      </main>
    </div>
  )
}
