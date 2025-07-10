import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/lib/api/services'
import { formatDate } from '@/lib/utils'
import { Clock, Database, Zap, AlertCircle } from 'lucide-react'

// This tells Next.js to revalidate this page every hour

export const revalidate: number = 10

async function getStaticPosts() {
  // This runs at build time and during revalidation - calls external API
  try {
    const response = await api.posts.getPosts({ published: true, limit: 5 })
    return response.data
  } catch (error) {
    console.error('Failed to fetch posts for SSG:', error)
    // Return mock data for build-time when API is not available
    return [
      {
        id: '1',
        title: 'Getting Started with Next.js',
        content:
          'Learn how to build modern web applications with Next.js and TypeScript. This comprehensive guide covers everything from setup to deployment.',
        slug: 'getting-started-nextjs',
        published: true,
        featured: true,
        viewCount: 1250,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: { id: '1', name: 'John Doe', email: 'john@example.com' },
        category: { id: '1', name: 'Technology', slug: 'technology' },
        tags: [
          { id: '1', name: 'Next.js', slug: 'nextjs' },
          { id: '2', name: 'React', slug: 'react' },
        ],
      },
      {
        id: '2',
        title: 'TypeScript Best Practices',
        content:
          'Discover the best practices for writing maintainable TypeScript code in large-scale applications.',
        slug: 'typescript-best-practices',
        published: true,
        featured: false,
        viewCount: 890,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        category: { id: '1', name: 'Technology', slug: 'technology' },
        tags: [{ id: '3', name: 'TypeScript', slug: 'typescript' }],
      },
    ]
  }
}

export default async function SSGPage() {
  const posts = await getStaticPosts()
  const buildTime = new Date().toISOString()
  const isUsingMockData = posts.length === 2 && posts[0].id === '1' // Simple check for mock data

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-500" />
            <h1 className="text-3xl font-bold">Static Site Generation (SSG)</h1>
          </div>
          <p className="text-muted-foreground mb-6 text-lg">
            This page demonstrates Static Site Generation with ISR (Incremental
            Static Regeneration). Content is pre-built at build time via
            external API calls and revalidated every hour.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  Load Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  Lightning Fast
                </p>
                <p className="text-muted-foreground text-xs">
                  Pre-built static content
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Database className="h-4 w-4" />
                  Data Freshness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">Periodic</p>
                <p className="text-muted-foreground text-xs">
                  External API called every hour
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  CDN Cache
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">Optimal</p>
                <p className="text-muted-foreground text-xs">
                  Global edge caching
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm">
              <strong>Page generated at:</strong> {buildTime}
            </p>
            <p className="text-muted-foreground text-sm">
              This timestamp shows when the page was last built/revalidated
            </p>
          </div>

          {isUsingMockData && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <h4 className="font-semibold text-amber-800">
                  Using Mock Data
                </h4>
              </div>
              <p className="text-sm text-amber-700">
                The external API is not available during build time, so
                we&#39;re showing mock data. In production, this would be real
                data from your backend API.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Featured Posts (SSG)</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
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

          <div className="bg-muted mt-8 rounded-lg p-4">
            <h3 className="mb-2 font-semibold">
              How SSG + ISR Works in Frontend-Only Setup:
            </h3>
            <ol className="list-inside list-decimal space-y-1 text-sm">
              <li>Page is pre-built at build time via external API call</li>
              <li>Static HTML is served instantly from CDN</li>
              <li>
                After revalidate time (1 hour), next request triggers rebuild
              </li>
              <li>
                New API call fetches fresh data from backend in background
              </li>
              <li>Updated static content is served to subsequent users</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
