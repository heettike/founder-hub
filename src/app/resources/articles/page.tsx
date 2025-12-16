'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  url: string
  category: string
  dateAdded: string
}

const categories = [
  { key: 'all', label: 'All' },
  { key: 'pre_launch', label: 'Pre-Launch Hype' },
  { key: 'ico_details', label: 'ICO Details' },
  { key: 'philosophy', label: 'Philosophy' },
  { key: 'project_updates', label: 'Project Updates' },
]

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [activeCategory])

  const fetchArticles = async () => {
    setIsLoading(true)
    const params = activeCategory !== 'all' ? `?category=${activeCategory}` : ''
    const res = await fetch(`/api/articles${params}`)
    const data = await res.json()
    setArticles(data)
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
          <li className="text-gray-900">Articles</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
          Articles
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Curated articles covering everything from pre-launch strategies to project philosophy.
        </p>
      </div>

      {/* Resource Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link
          href="/resources/articles"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white"
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
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          Podcasts
        </Link>
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

      {/* List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 rounded-xl p-6">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 text-lg mb-2">No articles found</div>
          <p className="text-gray-500 text-sm">
            Check back later or add some via the admin panel.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase tracking-wider">
                      {article.category.replace('_', ' ')}
                    </span>
                    <span>
                      {new Date(article.dateAdded).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 ml-4"
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
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
