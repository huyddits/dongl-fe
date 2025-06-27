import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { PAGINATION } from '@/lib/constants'
import { z } from 'zod'

const postsQuerySchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default(PAGINATION.DEFAULT_PAGE_SIZE.toString()),
  search: z.string().optional(),
  category: z.string().optional(),
  published: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, search, category, published } = postsQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      category: searchParams.get('category') ?? undefined,
      published: searchParams.get('published') ?? undefined,
    })

    const pageNumber = parseInt(page)
    const pageSize = Math.min(parseInt(limit), PAGINATION.MAX_PAGE_SIZE)
    const skip = (pageNumber - 1) * pageSize

    const where = {
      ...(published !== undefined && { published: published === 'true' }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { content: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(category && {
        category: { slug: category },
      }),
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: { id: true, name: true, email: true },
          },
          category: true,
          tags: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({
      data: posts,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('GET /api/posts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  slug: z.string().min(1),
  published: z.boolean().default(false),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, slug, published, categoryId, tagIds } = createPostSchema.parse(body)

    // For demo purposes, we'll use the first user as author
    // In real app, you'd get this from authentication
    const firstUser = await prisma.user.findFirst()
    if (!firstUser) {
      return NextResponse.json(
        { error: 'No users found' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        published,
        publishedAt: published ? new Date() : null,
        authorId: firstUser.id,
        categoryId,
        ...(tagIds && {
          tags: {
            connect: tagIds.map(id => ({ id })),
          },
        }),
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        category: true,
        tags: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('POST /api/posts error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}