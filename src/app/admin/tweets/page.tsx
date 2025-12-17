'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Tweet {
  id: string
  content: string | null
  screenshotUrl: string | null
  tweetUrl: string
  dateAdded: string
  notes: string | null
}

export default function AdminTweetsPage() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    content: '',
    screenshotUrl: '',
    tweetUrl: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTweets()
  }, [])

  const fetchTweets = async () => {
    const res = await fetch('/api/tweets')
    const data = await res.json()
    setTweets(data)
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: formData.content || null,
          screenshotUrl: formData.screenshotUrl || null,
          tweetUrl: formData.tweetUrl,
          notes: formData.notes || null,
        }),
      })

      if (res.ok) {
        setFormData({ content: '', screenshotUrl: '', tweetUrl: '', notes: '' })
        setShowForm(false)
        fetchTweets()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to add tweet')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
    setIsSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tweet?')) return

    await fetch(`/api/tweets/${id}`, { method: 'DELETE' })
    fetchTweets()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/admin" className="hover:text-gray-900">
              Admin
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">Tweets</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">
            Manage Tweets
          </h1>
          <p className="text-gray-500">Add and manage curated tweets.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Tweet'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-xl p-6 mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tweet URL *
              </label>
              <input
                type="url"
                value={formData.tweetUrl}
                onChange={(e) =>
                  setFormData({ ...formData, tweetUrl: e.target.value })
                }
                required
                placeholder="https://twitter.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tweet Content (optional)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={3}
                placeholder="Copy the tweet text here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Screenshot URL (optional)
              </label>
              <input
                type="url"
                value={formData.screenshotUrl}
                onChange={(e) =>
                  setFormData({ ...formData, screenshotUrl: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Additional notes about this tweet..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Tweet'}
          </button>
        </form>
      )}

      {/* List */}
      {isLoading ? (
        <div className="text-gray-500">Loading...</div>
      ) : tweets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No tweets yet. Add your first one above.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tweets.map((tweet) => (
                <tr key={tweet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <a
                      href={tweet.tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 hover:text-gray-700"
                    >
                      {tweet.content
                        ? tweet.content.substring(0, 100) +
                          (tweet.content.length > 100 ? '...' : '')
                        : 'View tweet'}
                    </a>
                    {tweet.notes && (
                      <p className="text-xs text-gray-500 mt-1">{tweet.notes}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(tweet.dateAdded).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(tweet.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
