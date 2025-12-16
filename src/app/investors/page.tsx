'use client'

import { useState, useEffect } from 'react'

interface Investor {
  id: string
  name: string
  pfpUrl: string | null
  title: string
  twitter: string | null
  linkedin: string | null
  category: string
}

const categories = [
  { key: 'all', label: 'All' },
  { key: 'liquid_funds', label: 'Liquid Funds' },
  { key: 'angels', label: 'Angels' },
  { key: 'vcs', label: 'VCs' },
]

export default function InvestorsPage() {
  const [investors, setInvestors] = useState<Investor[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInvestors()
  }, [activeCategory])

  const fetchInvestors = async () => {
    setIsLoading(true)
    const params = activeCategory !== 'all' ? `?category=${activeCategory}` : ''
    const res = await fetch(`/api/investors${params}`)
    const data = await res.json()
    setInvestors(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
          Investors
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Connect with liquid funds, angels, and VCs in the Noice ecosystem.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 rounded-2xl p-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : investors.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 text-lg mb-2">No investors found</div>
          <p className="text-gray-500 text-sm">
            Check back later or add some via the admin panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {investors.map((investor) => (
            <InvestorCard key={investor.id} investor={investor} />
          ))}
        </div>
      )}
    </div>
  )
}

function InvestorCard({ investor }: { investor: Investor }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      {/* PFP */}
      <div className="mb-4">
        {investor.pfpUrl ? (
          <img
            src={investor.pfpUrl}
            alt={investor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl font-medium">
            {investor.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{investor.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{investor.title}</p>

      {/* Social Links */}
      <div className="flex gap-3">
        {investor.twitter && (
          <a
            href={investor.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        )}
        {investor.linkedin && (
          <a
            href={investor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </div>

      {/* Category Badge */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400 uppercase tracking-wider">
          {investor.category.replace('_', ' ')}
        </span>
      </div>
    </div>
  )
}
