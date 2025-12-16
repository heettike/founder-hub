'use client'

import { useState, ReactNode } from 'react'
import { useAuth } from './AuthContext'

export function PasswordGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, login } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (isAuthenticated) {
    return <>{children}</>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(password)
    if (!success) {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Noice Ecosystem
          </h1>
          <p className="mt-3 text-gray-500 text-sm">
            Founder Resource Hub
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Enter password"
              className={`w-full px-4 py-3 rounded-lg border ${
                error
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900'
              } focus:outline-none focus:ring-1 transition-colors text-center text-lg tracking-widest`}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500 text-center">
                Incorrect password
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
