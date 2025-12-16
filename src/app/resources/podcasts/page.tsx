'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Podcast {
  id: string
  title: string
  url: string
  dateAdded: string
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    setIsLoading(true)
    const res = await fetch('/api/podcasts')
    const data = await res.json()
    setPodcasts(data)
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
          <li className="text-gray-900">Resources</li>
          <li>/</li>
          <li className="text-gray-900">Podcasts</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
          Podcasts
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Listen to conversations with founders and industry experts.
        </p>
      </div>

      {/* Resource Navigation */}
      <div className="flex flex-wrap gap-4 mb-10">
        <Link
          href="/resources/articles"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          Articles
        </Link>
        <Link
          href="/resources/videos"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          Videos
        </Link>
        <Link
          href="/resources/tweets"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          Tweets
        </Link>
        <Link
          href="/resources/podcasts"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white"
        >
          Podcasts
        </Link>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : podcasts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 text-lg mb-2">No podcasts found</div>
          <p className="text-gray-500 text-sm">
            Check back later or add some via the admin panel.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <a
              key={podcast.id}
              href={podcast.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4zm0 13a3 3 0 0 1-3-3V5a3 3 0 0 1 6 0v6a3 3 0 0 1-3 3z" />
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1H4v1a8 8 0 0 0 7 7.93V21H8v1h8v-1h-3v-2.07A8 8 0 0 0 20 11v-1h-1z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 truncate">
                  {podcast.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(podcast.dateAdded).toLocaleDateString()}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0"
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
          ))}
        </div>
      )}
    </div>
  )
}
