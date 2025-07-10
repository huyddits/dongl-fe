import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'About',
  description: 'Learn about our Next.js dongl project and its features.',
}

export default function AboutPage() {
  const features = [
    'Next.js 14 with App Router',
    'TypeScript for type safety',
    'PostgreSQL database with Prisma ORM',
    'Multi-environment configuration (dev, staging, uat, production)',
    'GitLab CI/CD pipeline',
    'Tailwind CSS for styling',
    'shadcn/ui components',
    'ESLint and Prettier for code quality',
    'Jest for testing',
    'Environment-specific builds',
    'Database migrations and seeding',
    'API routes with proper error handling',
    'SEO optimization',
    'Performance monitoring ready',
  ]

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            About This Project
          </h1>
          <p className="text-muted-foreground text-xl">
            A comprehensive Next.js starter template designed for production
            applications
          </p>
        </div>

        <div className="mb-12 grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>
                Built for modern web development with best practices
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                This dongl project provides a solid foundation for building
                scalable web applications with Next.js. It includes everything
                you need to get started with a production-ready setup, including
                database integration, multi-environment configuration, and
                automated deployment pipelines.
              </p>
              <p>
                The project demonstrates three different rendering strategies
                (SSR, SSG, CSR) to help you understand when and how to use each
                approach for optimal performance and user experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features Included</CardTitle>
              <CardDescription>
                Everything you need for a modern web application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Quick setup guide for new projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">1. Clone and Install</h4>
                <code className="bg-muted block rounded p-3 text-sm">
                  git clone &lt;repository&gt;
                  <br />
                  cd project-name
                  <br />
                  npm install
                </code>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">2. Environment Setup</h4>
                <code className="bg-muted block rounded p-3 text-sm">
                  cp .env.example .env.local
                  <br /># Update database URL and other variables
                </code>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">3. Database Setup</h4>
                <code className="bg-muted block rounded p-3 text-sm">
                  npm run db:generate
                  <br />
                  npm run db:push
                  <br />
                  npm run db:seed
                </code>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">4. Start Development</h4>
                <code className="bg-muted block rounded p-3 text-sm">
                  npm run dev
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
