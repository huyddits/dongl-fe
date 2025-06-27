import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Database, Server, Smartphone, Zap } from 'lucide-react'
import { config } from '@/lib/config'

export default function HomePage() {
  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Next.js Dongl Project
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A production-ready Next.js template with TypeScript, PostgreSQL, Prisma, 
            and GitLab CI/CD. Built for scalability and developer experience.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/examples/ssr">
                Explore Examples <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            Environment: <span className="font-medium">{config.app.env}</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-blue-500" />
                Server-Side Rendering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fast initial page loads with server-rendered content. Perfect for SEO 
                and dynamic data that changes frequently.
              </CardDescription>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/examples/ssr">View SSR Example</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-500" />
                Static Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Lightning-fast pages with ISR (Incremental Static Regeneration). 
                Pre-built at build time and cached globally.
              </CardDescription>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/examples/ssg">View SSG Example</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-purple-500" />
                Client-Side Rendering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Dynamic, interactive experiences with client-side data fetching. 
                Perfect for dashboards and real-time applications.
              </CardDescription>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/examples/csr">View CSR Example</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8">Modern Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center mb-3">
                <span className="font-bold">▲</span>
              </div>
              <h3 className="font-semibold">Next.js 14</h3>
              <p className="text-sm text-muted-foreground">App Router</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-3">
                <span className="font-bold">TS</span>
              </div>
              <h3 className="font-semibold">TypeScript</h3>
              <p className="text-sm text-muted-foreground">Type Safety</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-lg flex items-center justify-center mb-3">
                <Database className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">PostgreSQL</h3>
              <p className="text-sm text-muted-foreground">+ Prisma ORM</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-lg flex items-center justify-center mb-3">
                <span className="font-bold">GL</span>
              </div>
              <h3 className="font-semibold">GitLab CI/CD</h3>
              <p className="text-sm text-muted-foreground">Auto Deploy</p>
            </div>
          </div>
        </div>

        {/* Environment Info */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
            <CardDescription>
              This project supports multiple environments with proper configuration management.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Current Environment:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  config.app.env === 'production' ? 'bg-green-100 text-green-800' :
                  config.app.env === 'staging' ? 'bg-yellow-100 text-yellow-800' :
                  config.app.env === 'uat' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {config.app.env.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Version:</span>
                <span className="text-muted-foreground">{config.app.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">App URL:</span>
                <span className="text-muted-foreground">{config.app.url}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}