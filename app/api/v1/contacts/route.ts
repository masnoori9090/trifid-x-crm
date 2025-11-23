import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/v1/contacts - Get all contacts
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const limit = parseInt(searchParams.get('limit') || '100')
        const offset = parseInt(searchParams.get('offset') || '0')

        const where = status ? { status } : {}

        const contacts = await prisma.contact.findMany({
            where,
            take: limit,
            skip: offset,
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                deals: true,
                activities: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const total = await prisma.contact.count({ where })

        return NextResponse.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                limit,
                offset,
                hasMore: total > offset + limit
            }
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contacts' },
            { status: 500 }
        )
    }
}

// POST /api/v1/contacts - Create a new contact
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const contact = await prisma.contact.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                company: body.company,
                position: body.position,
                status: body.status || 'LEAD',
                source: body.source,
                customFields: body.customFields ? JSON.stringify(body.customFields) : null,
                ownerId: body.ownerId,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            data: contact
        }, { status: 201 })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create contact' },
            { status: 500 }
        )
    }
}
