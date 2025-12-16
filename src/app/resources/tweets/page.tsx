'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Tweet {
  id: string
  content: string | null
  screenshotUrl: string | null
  tweetUrl: string
  dateAdded: string
}

export default function TweetsPage() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTweets()
  }, [])

  const fetchTweets = async () => {
    setIsLoading(true)
    const res = await fetch('/api/tweets')
    const data = await res.json()
    setTweets(data)
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
          <li className="text-gray-900">Tweets</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
          Tweets
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Curated tweets from builders and thought leaders in the ecosystem.
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
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white"
        >
          Tweets
        </Link>
        <Link
          href="/resources/podcasts"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          Podcasts
        </Link>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 rounded-xl p-6 h-48"></div>
            </div>
          ))}
        </div>
      ) : tweets.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 text-lg mb-2">No tweets found</div>
          <p className="text-gray-500 text-sm">
            Check back later or add some via the admin panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tweets.map((tweet) => (
            <a
              key={tweet.id}
              href={tweet.tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
            >
              {tweet.screenshotUrl ? (
                <img
                  src={tweet.screenshotUrl}
                  alt="Tweet screenshot"
                  className="w-full object-cover"
                />
              ) : tweet.content ? (
                <div className="p-6">
                  <svg
                    className="w-6 h-6 text-gray-400 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <p className="text-gray-900 group-hover:text-gray-700">
                    {tweet.content}
                  </p>
                </div>
              ) : (
                <div className="p-6 flex items-center justify-center h-48">
                  <svg
                    className="w-12 h-12 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              )}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(tweet.dateAdded).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-400 group-hover:text-gray-600">
                  View on X
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
