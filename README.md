# Next.js Frontend Base Project

A production-ready Next.js frontend template with TypeScript, external API integration, and GitLab CI/CD. Built for scalability and developer experience.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **External API integration** with comprehensive error handling
- **Multi-environment** configuration (dev, staging, uat, production)
- **GitLab CI/CD** pipeline with automated deployment
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **ESLint & Prettier** for code quality
- **Jest** for testing
- **Three rendering examples**: SSR, SSG, CSR
- **API client** with interceptors and mock data fallbacks

## 📋 Prerequisites

- Node.js 18.17.0 or later
- npm 9.0.0 or later
- GitLab account (for CI/CD)
- External backend API (optional for demo)

## 🛠️ Getting Started

### 1. Clone and Install

```bash
git clone <your-repository-url>
cd your-project-name
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Update the following variables in .env.local:
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="https://your-backend-api.com/api"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
├── app/                        # Next.js App Router
│   ├── examples/              # SSR, SSG, CSR examples
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/                # React components
│   ├── layout/               # Layout components
│   └── ui/                   # UI components (shadcn/ui)
├── lib/                      # Utility functions
│   ├── api/                  # API services and types
│   ├── hooks/                # Custom React hooks
│   ├── api-client.ts         # API client with interceptors
│   ├── config.ts             # App configuration
│   ├── constants.ts          # Constants
│   ├── env.ts                # Environment validation
│   └── utils.ts              # Utility functions
├── .env.example              # Environment variables template
├── .gitlab-ci.yml            # GitLab CI/CD configuration
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## 🌍 Environment Configuration

The project supports four environments with separate configurations:

### Development
```bash
# .env.development
NODE_ENV="development"
NEXT_PUBLIC_APP_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:8000/api"
```

### Staging
```bash
# .env.staging
NODE_ENV="production"
NEXT_PUBLIC_APP_ENV="staging"
NEXT_PUBLIC_APP_URL="https://staging.yourapp.com"
NEXT_PUBLIC_API_URL="https://api-staging.yourapp.com/api"
```

### UAT (User Acceptance Testing)
```bash
# .env.uat
NODE_ENV="production"
NEXT_PUBLIC_APP_ENV="uat"
NEXT_PUBLIC_APP_URL="https://uat.yourapp.com"
NEXT_PUBLIC_API_URL="https://api-uat.yourapp.com/api"
```

### Production
```bash
# .env.production
NODE_ENV="production"
NEXT_PUBLIC_APP_ENV="production"
NEXT_PUBLIC_APP_URL="https://yourapp.com"
NEXT_PUBLIC_API_URL="https://api.yourapp.com/api"
```

## 🔄 GitLab CI/CD Pipeline

The project includes a comprehensive GitLab CI/CD pipeline with the following stages:

### 1. Test Stage
- Runs ESLint for code quality
- Type checking with TypeScript
- Unit tests with Jest
- Triggered on: merge requests, main, develop, staging, uat branches

### 2. Build Stage
- Environment-specific builds
- Next.js optimization and static generation
- Asset optimization

### 3. Deploy Stage
- Automated deployment to respective environments
- SSH-based deployment or static hosting
- PM2 process management for Node.js hosting
- Manual approval required for production

### Required GitLab Variables

Set these in GitLab CI/CD variables:

```bash
# Staging Environment
STAGING_SERVER="staging.yourapp.com"
STAGING_USER="deploy"
STAGING_PATH="/var/www/staging"
STAGING_SSH_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."

# UAT Environment
UAT_SERVER="uat.yourapp.com"
UAT_USER="deploy"
UAT_PATH="/var/www/uat"
UAT_SSH_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."

# Production Environment
PRODUCTION_SERVER="yourapp.com"
PRODUCTION_USER="deploy"
PRODUCTION_PATH="/var/www/production"
PRODUCTION_SSH_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."
```

## 📚 Rendering Examples

The project includes three example pages demonstrating different rendering strategies:

### 1. Server-Side Rendering (SSR) - `/examples/ssr`
- **Use case**: Dynamic content that changes frequently
- **Data flow**: Server → External API → Render → Client
- **Pros**: Always fresh data, excellent SEO, fast perceived loading
- **Cons**: Slower initial page load, server processing required

### 2. Static Site Generation (SSG) - `/examples/ssg`
- **Use case**: Content that doesn't change often
- **Data flow**: Build time → External API → Static HTML → CDN
- **Pros**: Lightning fast loading, excellent caching, minimal server load
- **Cons**: Data may be stale until revalidation (ISR)

### 3. Client-Side Rendering (CSR) - `/examples/csr`
- **Use case**: Interactive dashboards, user-specific content
- **Data flow**: Client → JavaScript → External API → Render
- **Pros**: Rich interactivity, instant navigation, real-time updates
- **Cons**: SEO limitations, loading states, API dependency

## 🌐 API Integration

### API Client Features
- **Interceptors**: Request/response interceptors for logging and error handling
- **Authentication**: Automatic token management and refresh
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Mock Data**: Fallback to mock data when API is unavailable
- **Type Safety**: Full TypeScript support with generated types

### API Services
```typescript
// Example usage
import { api } from '@/lib/api/services'

// Get posts with pagination
const { data, loading, error } = useApi(() => 
  api.posts.getPosts({ page: 1, limit: 10 })
)

// Create new post
const { mutate } = useMutation(api.posts.createPost)
```

### Custom Hooks
```typescript
// Paginated data
const { data, loading, setPage } = usePaginatedApi(api.posts.getPosts)

// Infinite scroll
const { data, loadMore, hasMore } = useInfiniteApi(api.posts.getPosts)
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # TypeScript type checking

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
```

## 🎨 Styling

The project uses **Tailwind CSS** with **shadcn/ui** components for a modern, consistent design system.

### Key Dependencies
```bash
tailwindcss              # Utility-first CSS framework
tailwindcss-animate      # Animation utilities
autoprefixer             # CSS vendor prefixing
postcss                  # CSS processing
```

### Adding New Components

```bash
# Install shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
```

### Custom Styling

- Global styles: `app/globals.css`
- Component styles: Use Tailwind utility classes
- Custom utilities: Add to `tailwind.config.js`
- CSS variables: Defined in globals.css for theming

## 🧪 Testing

The project uses **Jest** and **React Testing Library** for testing.

### Test Structure

```
├── __tests__/           # Test files
│   ├── components/      # Component tests
│   ├── pages/          # Page tests
│   ├── hooks/          # Hook tests
│   └── utils/          # Utility tests
├── jest.config.js      # Jest configuration
└── jest.setup.js       # Test setup
```

### Writing Tests

```typescript
// Example component test
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    const heading = screen.getByRole('heading', { name: /next\.js base project/i })
    expect(heading).toBeInTheDocument()
  })
})

// Example API hook test
import { renderHook, waitFor } from '@testing-library/react'
import { useApi } from '@/lib/hooks/use-api'

describe('useApi', () => {
  it('fetches data successfully', async () => {
    const mockApi = jest.fn().mockResolvedValue({ data: 'test' })
    const { result } = renderHook(() => useApi(mockApi))
    
    await waitFor(() => {
      expect(result.current.data).toBe('test')
    })
  })
})
```

## 🚀 Deployment Options

### 1. Static Hosting (Recommended)
**Vercel** (Recommended for Next.js):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

**Netlify**:
```bash
# Build command: npm run build
# Publish directory: out (for static export) or .next (for SSR)
```

### 2. Node.js Hosting
**PM2 Configuration**:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'frontend-staging',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/staging',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
}
```

### 3. Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Branch Strategy

- **main**: Production deployments (manual approval)
- **staging**: Staging environment (auto-deploy)
- **uat**: UAT environment (auto-deploy)
- **develop**: Development branch

## 🔧 Customization

### Adding New API Endpoints
1. Add types to `lib/api/services.ts`
2. Create service methods
3. Add custom hooks if needed
4. Write tests

### Adding New Environments
1. Create new environment file (e.g., `.env.preprod`)
2. Add build and deploy stages in `.gitlab-ci.yml`
3. Update GitLab CI/CD variables
4. Configure hosting/server

### Backend Integration
1. Update `NEXT_PUBLIC_API_URL` to point to your backend
2. Modify API service types to match your backend schema
3. Update authentication flow if needed
4. Configure CORS on your backend

## 📊 Monitoring and Performance

### Built-in Features
- **Environment Info**: Available in app header/footer
- **Error Boundaries**: Implemented in layout
- **Performance Metrics**: Web Vitals ready
- **API Error Tracking**: Comprehensive error logging

### Recommended Additions
- **Sentry** for error tracking and performance monitoring
- **Google Analytics** for user analytics
- **Vercel Analytics** for performance insights
- **Uptime monitoring** for API availability

### Performance Optimization
- Static generation for content pages
- Image optimization with Next.js Image
- Code splitting and lazy loading
- API response caching
- CDN integration

## 🔒 Security

### Implemented Security Measures
- **Environment variable validation** with Zod
- **Security headers** in Next.js config
- **XSS protection** via React's built-in escaping
- **Input validation** with Zod schemas
- **Secure API communication** with HTTPS

### Additional Recommendations
- Implement authentication (NextAuth.js)
- Add rate limiting on API calls
- Use HTTPS in production
- Regular dependency updates
- Security audits with `npm audit`
- Content Security Policy (CSP) headers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Write tests for new features
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub/GitLab issues for bugs
- **Discussions**: Use repository discussions for questions
- **Email**: support@company.com

## 🗺️ Roadmap

- [ ] Add authentication with NextAuth.js
- [ ] Implement real-time features with WebSockets
- [ ] Add email functionality integration
- [ ] Create admin dashboard template
- [ ] Add file upload capabilities
- [ ] Implement search functionality
- [ ] Add internationalization (i18n)
- [ ] Progressive Web App (PWA) features
- [ ] Dark/light theme toggle
- [ ] Advanced error boundaries with recovery

---

**Happy coding! 🚀**

*This is a frontend-only Next.js template designed to work with external backend APIs. Perfect for teams following a microservices architecture or using separate frontend/backend repositories.*.ts             # Utility functions
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma        # Prisma schema
│   └── seed.ts              # Database seeding
├── .env.example             # Environment variables template
├── .gitlab-ci.yml           # GitLab CI/CD configuration
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🌍 Environment Configuration

The project supports four environments with separate configurations:

### Development
```bash
# .env.development
NODE_ENV="development"
NEXT_PUBLIC_APP_ENV="development"
DATABASE_URL="postgresql://dev_user:dev_password@localhost:5432/project_dev"
```

### Staging
```bash
# .env.staging
NODE_ENV="production"
NEXT_PUBLIC_APP_ENV="staging"
DATABASE_URL="postgresql://staging_user:staging_password@staging-db.company.com:5432/project_staging"
```

### UAT (User Acceptance Testing)
```bash
# .env.uat
NODE_ENV="production"
NEXT_PUBLIC_APP_ENV="uat"
DATABASE_URL="postgresql://uat_user:uat_password@uat-db.company.com:5432/project_uat"
```

### Production
```bash
# .env.production
NODE_ENV="production"
NEXT_PUBLIC_APP_ENV="production"
DATABASE_URL="postgresql://prod_user:prod_password@prod-db.company.com:5432/project_production"
```

## 🔄 GitLab CI/CD Pipeline

The project includes a comprehensive GitLab CI/CD pipeline with the following stages:

### 1. Test Stage
- Runs ESLint for code quality
- Type checking with TypeScript
- Unit tests with Jest
- Triggered on: merge requests, main, develop, staging, uat branches

### 2. Build Stage
- Environment-specific builds
- Next.js optimization and static generation
- Asset optimization

### 3. Deploy Stage
- Automated deployment to respective environments
- SSH-based deployment or static hosting
- PM2 process management for Node.js hosting
- Manual approval required for production

### Required GitLab Variables

Set these in GitLab CI/CD variables:

```bash
# Staging Environment
STAGING_SERVER="staging.company.com"
STAGING_USER="deploy"
STAGING_PATH="/var/www/staging"
STAGING_SSH_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."

# UAT Environment
UAT_SERVER="uat.company.com"
UAT_USER="deploy"
UAT_PATH="/var/www/uat"
UAT_SSH_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."

# Production Environment
PRODUCTION_SERVER="prod.company.com"
PRODUCTION_USER="deploy"
PRODUCTION_PATH="/var/www/production"
PRODUCTION_SSH_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."
```

## 📚 Rendering Examples

The project includes three example pages demonstrating different rendering strategies:

### 1. Server-Side Rendering (SSR)
- **Path**: `/examples/ssr`
- **Use case**: Dynamic content that changes frequently
- **Pros**: Always fresh data, great SEO
- **Cons**: Slower initial page load

### 2. Static Site Generation (SSG)
- **Path**: `/examples/ssg`
- **Use case**: Content that doesn't change often
- **Pros**: Lightning fast, excellent caching
- **Cons**: Data may be stale until revalidation

### 3. Client-Side Rendering (CSR)
- **Path**: `/examples/csr`
- **Use case**: Interactive dashboards, user-specific content
- **Pros**: Rich interactivity, instant navigation
- **Cons**: SEO limitations, loading states

## 🗄️ Database Schema

The project includes a sample blog schema with the following models:

- **User**: User accounts with roles
- **Post**: Blog posts with content
- **Category**: Post categories
- **Tag**: Post tags (many-to-many with posts)

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Reset database
npm run db:reset

# Seed database with sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # TypeScript type checking

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:reset         # Reset database
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio
```

## 🎨 Styling

The project uses **Tailwind CSS** with **shadcn/ui** components for a modern, consistent design system.

### Adding New Components

```bash
# Install shadcn/ui components (when available)
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

### Custom Styling

- Global styles: `app/globals.css`
- Component styles: Use Tailwind utility classes
- Custom utilities: Add to `tailwind.config.js`

## 🧪 Testing

The project uses **Jest** and **React Testing Library** for testing.

### Test Structure

```
├── __tests__/           # Test files
│   ├── components/      # Component tests
│   ├── pages/          # Page tests
│   └── utils/          # Utility tests
├── jest.config.js      # Jest configuration
└── jest.setup.js       # Test setup
```

### Writing Tests

```typescript
// Example component test
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    const heading = screen.getByRole('heading', { name: /next\.js base project/i })
    expect(heading).toBeInTheDocument()
  })
})
```

## 🚀 Deployment

### Branch Strategy

- **main**: Production deployments (manual approval)
- **staging**: Staging environment (auto-deploy)
- **uat**: UAT environment (auto-deploy)
- **develop**: Development branch

### Server Setup

1. **Install Node.js and PM2** on your servers (for Node.js hosting)
2. **Configure SSH access** for GitLab runner
3. **Setup PM2 ecosystem** files
4. **Configure static hosting** (Vercel/Netlify recommended)

### PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'staging-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/staging',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'uat-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/uat',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    },
    {
      name: 'production-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/production',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
```

## 🔧 Customization

### Adding New Environments

1. Create new environment file (e.g., `.env.preprod`)
2. Add build and deploy stages in `.gitlab-ci.yml`
3. Update GitLab CI/CD variables
4. Configure hosting/server

### Adding New Features

1. Create feature branch from `develop`
2. Implement feature with tests
3. Update documentation
4. Create merge request to `develop`
5. Deploy to staging for testing

## 📊 Monitoring and Performance

### Built-in Monitoring

- **Health Check**: `/api/health` endpoint
- **Environment Info**: Available in app
- **Error Boundaries**: Implemented in layout
- **Performance Metrics**: Web Vitals ready

### Recommended Additions

- **Sentry** for error tracking
- **Google Analytics** for user analytics
- **Vercel Analytics** for performance monitoring
- **Uptime monitoring** for availability

## 🔒 Security

### Implemented Security Measures

- **Environment variable validation** with Zod
- **Security headers** in Next.js config
- **CSRF protection** ready
- **Input validation** with Zod schemas
- **SQL injection protection** with Prisma

### Additional Recommendations

- Implement authentication (NextAuth.js)
- Add rate limiting
- Use HTTPS in production
- Regular dependency updates
- Security audits

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub/GitLab issues for bugs
- **Discussions**: Use discussions for questions
- **Email**: support@company.com

## 🗺️ Roadmap

- [ ] Add authentication with NextAuth.js
- [ ] Implement real-time features with WebSockets
- [ ] Add email functionality
- [ ] Create admin dashboard
- [ ] Add file upload capabilities
- [ ] Implement search functionality
- [ ] Add internationalization (i18n)
- [ ] Create mobile app with React Native

---

**Happy coding! 🚀**