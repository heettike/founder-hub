'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Provider {
  id: string
  name: string
  website: string
  avgPrice: string | null
  bestWorkUrl: string | null
  category: string
  subcategory: string | null
}

interface ProviderListProps {
  category: string
  title: string
  description: string
}

export function ProviderList({ category, title, description }: ProviderListProps) {
  const [providers, setProviders] = useState<Provider[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProviders()
  }, [category])

  const fetchProviders = async () => {
    setIsLoading(true)
    const res = await fetch(`/api/providers?category=${category}`)
    const data = await res.json()
    setProviders(data)
    setIsLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/marketplace" className="hover:text-gray-900">
              Marketplace
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">{title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">{description}</p>
      </div>

      {/* Back Link */}
      <Link
        href="/marketplace"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Marketplace
      </Link>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 rounded-2xl p-6 h-48"></div>
            </div>
          ))}
        </div>
      ) : providers.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 text-lg mb-2">No providers found</div>
          <p className="text-gray-500 text-sm">
            Check back later or add some via the admin panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{provider.name}</h3>

      {/* Subcategory */}
      {provider.subcategory && (
        <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 mb-3">
          {provider.subcategory}
        </span>
      )}

      {/* Price */}
      {provider.avgPrice && (
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium text-gray-900">Avg. Price:</span>{' '}
          {provider.avgPrice}
        </p>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Website
          <svg
            className="w-3.5 h-3.5 ml-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
        {provider.bestWorkUrl && (
          <a
            href={provider.bestWorkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Best Work
            <svg
              className="w-3.5 h-3.5 ml-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
