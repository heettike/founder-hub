'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Video {
  id: string
  title: string
  url: string
  dateAdded: string
}

function getVideoEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`
  }
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }
  return null
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    setIsLoading(true)
    const res = await fetch('/api/videos')
    const data = await res.json()
    setVideos(data)
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
          <li className="text-gray-900">Videos</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
          Videos
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Launch videos and presentations from successful projects.
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
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white"
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

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 rounded-xl aspect-video mb-3"></div>
              <div className="h-5 bg-gray-100 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 text-lg mb-2">No videos found</div>
          <p className="text-gray-500 text-sm">
            Check back later or add some via the admin panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const embedUrl = getVideoEmbedUrl(video.url)
            return (
              <div
                key={video.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
              >
                {embedUrl ? (
                  <div className="aspect-video">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                ) : (
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-video bg-gray-100 flex items-center justify-center group"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                )}
                <div className="p-4">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 hover:text-gray-700"
                  >
                    {video.title}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(video.dateAdded).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
