import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Clock, Database, Server } from 'lucide-react'
import { api } from '@/lib/api/services'

async function PostsList() {
  // This runs on the server for each request - calls external API
  try {
    const response = await api.posts.getPosts({ published: true, limit: 5 })
    const posts = response.data

    return (
      <div className="space-y-4">
        {posts.map((post: any) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>
                By {post.author.name} • {formatDate(new Date(post.createdAt))} •{' '}
                {post.category?.name || 'Uncategorized'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {post.content?.substring(0, 150)}...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Views: {post.viewCount}</span>
                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <h3 className="mb-2 font-semibold text-red-800">API Connection Failed</h3>
        <p className="mb-4 text-sm text-red-600">
          Could not connect to the backend API. This is expected in a frontend-only setup.
        </p>
        <div className="rounded border border-yellow-200 bg-yellow-50 p-3">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> In production, configure the API_URL to point to your backend
            service.
          </p>
        </div>
      </div>
    )
  }
}

export default function SSRPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Server className="h-6 w-6 text-blue-500" />
            <h1 className="text-3xl font-bold">Server-Side Rendering (SSR)</h1>
          </div>
          <p className="mb-6 text-lg text-muted-foreground">
            This page demonstrates Server-Side Rendering. The Next.js server calls an external API
            for each request, ensuring fresh content but slower initial page loads.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Database className="h-4 w-4" />
                  Data Freshness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">Always Fresh</p>
                <p className="text-xs text-muted-foreground">
                  External API called on every request
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Load Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">Slower</p>
                <p className="text-xs text-muted-foreground">Server API processing required</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">Excellent</p>
                <p className="text-xs text-muted-foreground">Content available to crawlers</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-2 font-semibold text-blue-900">Frontend-Only Setup</h4>
            <p className="mb-2 text-sm text-blue-800">
              This is a frontend-only Next.js application. In production, you would:
            </p>
            <ul className="list-inside list-disc space-y-1 text-xs text-blue-700">
              <li>Deploy this frontend to Vercel/Netlify</li>
              <li>Have a separate backend API (Node.js, Python, Go, etc.)</li>
              <li>Configure NEXT_PUBLIC_API_URL to point to your backend</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Latest Posts (SSR)</h2>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                <span className="ml-3">Loading posts from API...</span>
              </div>
            }
          >
            <PostsList />
          </Suspense>

          <div className="mt-8 rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-semibold">How SSR Works in Frontend-Only Setup:</h3>
            <ol className="list-inside list-decimal space-y-1 text-sm">
              <li>User requests the page from CDN/hosting</li>
              <li>Next.js server calls external backend API</li>
              <li>Backend API fetches data from database</li>
              <li>Next.js server renders HTML with API data</li>
              <li>Complete HTML sent to browser</li>
              <li>Page hydrates for interactivity</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
