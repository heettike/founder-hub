'use client'

import { useState } from 'react'
import Link from 'next/link'

const sections = [
  {
    key: 'investors',
    title: 'Investors',
    description: 'Manage investor profiles',
    href: '/admin/investors',
  },
  {
    key: 'articles',
    title: 'Articles',
    description: 'Manage resource articles',
    href: '/admin/articles',
  },
  {
    key: 'videos',
    title: 'Videos',
    description: 'Manage launch videos',
    href: '/admin/videos',
  },
  {
    key: 'tweets',
    title: 'Tweets',
    description: 'Manage curated tweets',
    href: '/admin/tweets',
  },
  {
    key: 'podcasts',
    title: 'Podcasts',
    description: 'Manage podcast episodes',
    href: '/admin/podcasts',
  },
  {
    key: 'providers',
    title: 'Providers',
    description: 'Manage marketplace providers',
    href: '/admin/providers',
  },
]

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Manage all content for the Founder Resource Hub.
        </p>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.key}
            href={section.href}
            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
              {section.title}
            </h2>
            <p className="text-gray-500">{section.description}</p>
            <div className="mt-4 text-sm font-medium text-gray-900 group-hover:text-gray-700 flex items-center">
              Manage
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
