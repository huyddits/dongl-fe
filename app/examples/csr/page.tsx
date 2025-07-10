'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api, Post } from '@/lib/api/services'
import { useApi } from '@/lib/hooks/use-api'
import { formatDate } from '@/lib/utils'
import {
  Clock,
  Database,
  Smartphone,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react'
import { useState } from 'react'

// Mock data for when API is not available
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Building Responsive Web Applications',
    content:
      'Learn how to create responsive web applications that work seamlessly across all device sizes using modern CSS techniques and frameworks.',
    slug: 'building-responsive-web-apps',
    published: true,
    featured: true,
    viewCount: 2340,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: { id: '1', name: 'Alex Johnson', email: 'alex@example.com' },
    category: { id: '1', name: 'Web Development', slug: 'web-development' },
    tags: [
      { id: '1', name: 'CSS', slug: 'css' },
      { id: '2', name: 'Responsive', slug: 'responsive' },
    ],
  },
  {
    id: '2',
    title: 'State Management in React',
    content:
      'Deep dive into different state management solutions for React applications, comparing Redux, Zustand, and Context API.',
    slug: 'react-state-management',
    published: true,
    featured: false,
    viewCount: 1876,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com' },
    category: { id: '2', name: 'React', slug: 'react' },
    tags: [
      { id: '3', name: 'React', slug: 'react' },
      { id: '4', name: 'State Management', slug: 'state-management' },
    ],
  },
  {
    id: '3',
    title: 'API Design Best Practices',
    content:
      'Essential guidelines for designing RESTful APIs that are maintainable, scalable, and developer-friendly.',
    slug: 'api-design-best-practices',
    published: true,
    featured: false,
    viewCount: 1456,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: { id: '3', name: 'Mike Chen', email: 'mike@example.com' },
    category: { id: '3', name: 'Backend', slug: 'backend' },
    tags: [
      { id: '5', name: 'API', slug: 'api' },
      { id: '6', name: 'REST', slug: 'rest' },
    ],
  },
]

export default function CSRPage() {
  const [isUsingMockData, setIsUsingMockData] = useState(false)

  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useApi<Post[]>(() => api.posts.getPosts({ published: true, limit: 5 }), {
    immediate: true,
    onSuccess: (data) => {
      console.log('Posts loaded successfully from API:', data.length)
      setIsUsingMockData(false)
    },
    onError: (error) => {
      console.error('Failed to load posts from API:', error)
      setIsUsingMockData(true)
    },
  })

  const handleRefresh = () => {
    refetch()
  }

  const handleUseMockData = () => {
    setIsUsingMockData(true)
  }

  // Use mock data if API failed and user chose to see mock data
  const displayPosts = isUsingMockData ? MOCK_POSTS : posts

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-purple-500" />
            <h1 className="text-3xl font-bold">Client-Side Rendering (CSR)</h1>
          </div>
          <p className="text-muted-foreground mb-6 text-lg">
            This page demonstrates Client-Side Rendering. The page loads
            immediately, then JavaScript calls external API to fetch and display
            data dynamically.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Initial Load
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">Very Fast</p>
                <p className="text-muted-foreground text-xs">
                  Empty shell loads instantly
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Database className="h-4 w-4" />
                  Data Loading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">Dynamic</p>
                <p className="text-muted-foreground text-xs">
                  External API called after page load
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Interactivity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">Excellent</p>
                <p className="text-muted-foreground text-xs">
                  Rich user interactions
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 p-4">
            <div className="flex items-center gap-3">
              {error ? (
                <WifiOff className="h-5 w-5 text-red-500" />
              ) : (
                <Wifi className="h-5 w-5 text-green-500" />
              )}
              <div>
                <p className="text-sm font-medium">
                  Status:{' '}
                  {loading
                    ? 'Loading...'
                    : error
                      ? 'API Unavailable'
                      : isUsingMockData
                        ? 'Mock Data'
                        : 'Connected'}
                </p>
                <p className="text-muted-foreground text-sm">
                  {isUsingMockData
                    ? 'Showing demo data'
                    : 'Data fetched from external API'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {error && !isUsingMockData && (
                <Button onClick={handleUseMockData} variant="outline" size="sm">
                  Show Demo Data
                </Button>
              )}
              <Button
                onClick={handleRefresh}
                disabled={loading}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                />
                {isUsingMockData ? 'Try API' : 'Refresh'}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Latest Posts (CSR)</h2>

          {loading && !displayPosts && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-purple-500"></div>
                <span>Fetching posts from API...</span>
              </div>
            </div>
          )}

          {error && !isUsingMockData && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <h3 className="mb-2 font-semibold text-red-800">
                API Connection Failed
              </h3>
              <p className="mb-4 text-sm text-red-600">
                Could not connect to the backend API: {error.message}
              </p>
              <div className="rounded border border-blue-200 bg-blue-50 p-3">
                <p className="mb-2 text-xs text-blue-800">
                  <strong>Frontend-Only Setup:</strong> This is expected when
                  running without a backend.
                </p>
                <div className="flex gap-2">
                  <Button onClick={handleRefresh} size="sm" variant="outline">
                    Retry API
                  </Button>
                  <Button onClick={handleUseMockData} size="sm">
                    View Demo Data
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!loading && !displayPosts?.length && !error && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No posts found</p>
              <Button onClick={handleRefresh} className="mt-2" size="sm">
                Retry
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {displayPosts?.map((post) => (
              <Card key={post.id} className={loading ? 'opacity-50' : ''}>
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    By {post.author.name} •{' '}
                    {formatDate(new Date(post.createdAt))} •{' '}
                    {post.category?.name || 'Uncategorized'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {post.content?.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      Views: {post.viewCount}
                    </span>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isUsingMockData && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Demo Mode:</strong> You&#39;re viewing mock data. In
                production, this would be real data from your backend API.
              </p>
            </div>
          )}

          <div className="bg-muted mt-8 rounded-lg p-4">
            <h3 className="mb-2 font-semibold">
              How CSR Works in Frontend-Only Setup:
            </h3>
            <ol className="list-inside list-decimal space-y-1 text-sm">
              <li>Empty HTML shell loads immediately from CDN</li>
              <li>JavaScript bundle downloads and executes</li>
              <li>React components mount and useEffect runs</li>
              <li>API request made to external backend server</li>
              <li>Component re-renders with fetched data</li>
              <li>User can interact and refresh data dynamically</li>
              <li>Fallback to mock data if API is unavailable</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
