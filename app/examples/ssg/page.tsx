import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { REVALIDATE_TIME } from '@/lib/constants'
import { Clock, Database, Zap, AlertCircle } from 'lucide-react'
import { api } from '@/lib/api/services'

// This tells Next.js to revalidate this page every hour
export const revalidate = REVALIDATE_TIME.POSTS

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
        content: 'Learn how to build modern web applications with Next.js and TypeScript. This comprehensive guide covers everything from setup to deployment.',
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
          { id: '2', name: 'React', slug: 'react' }
        ]
      },
      {
        id: '2',
        title: 'TypeScript Best Practices',
        content: 'Discover the best practices for writing maintainable TypeScript code in large-scale applications.',
        slug: 'typescript-best-practices',
        published: true,
        featured: false,
        viewCount: 890,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        category: { id: '1', name: 'Technology', slug: 'technology' },
        tags: [
          { id: '3', name: 'TypeScript', slug: 'typescript' }
        ]
      }
    ]
  }
}

export default async function SSGPage() {
  const posts = await getStaticPosts()
  const buildTime = new Date().toISOString()
  const isUsingMockData = posts.length === 2 && posts[0].id === '1' // Simple check for mock data

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-green-500" />
            <h1 className="text-3xl font-bold">Static Site Generation (SSG)</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            This page demonstrates Static Site Generation with ISR (Incremental Static Regeneration). 
            Content is pre-built at build time via external API calls and revalidated every hour.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Load Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">Lightning Fast</p>
                <p className="text-xs text-muted-foreground">Pre-built static content</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Data Freshness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">Periodic</p>
                <p className="text-xs text-muted-foreground">External API called every hour</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  CDN Cache
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">Optimal</p>
                <p className="text-xs text-muted-foreground">Global edge caching</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm">
              <strong>Page generated at:</strong> {buildTime}
            </p>
            <p className="text-sm text-muted-foreground">
              This timestamp shows when the page was last built/revalidated
            </p>
          </div>

          {isUsingMockData && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <h4 className="font-semibold text-amber-800">Using Mock Data</h4>
              </div>
              <p className="text-amber-700 text-sm">
                The external API is not available during build time, so we're showing mock data. 
                In production, this would be real data from your backend API.
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
                    By {post.author.name} • {formatDate(new Date(post.createdAt))} • {post.category?.name || 'Uncategorized'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {post.content?.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
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
          
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How SSG + ISR Works in Frontend-Only Setup:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Page is pre-built at build time via external API call</li>
              <li>Static HTML is served instantly from CDN</li>
              <li>After revalidate time (1 hour), next request triggers rebuild</li>
              <li>New API call fetches fresh data from backend in background</li>
              <li>Updated static content is served to subsequent users</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}