"use client"

import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { SearchResults } from "@/components/search/search-results"
import { SearchFilters } from "@/components/search/search-filters"
import { TrainSearch } from "@/components/search/train-search"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <TrainSearch />
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading results...</div>}>
              <SearchResults />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
