import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/v1/activities - Create activity (for email/call logging)
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const activity = await prisma.activity.create({
            data: {
                type: body.type, // EMAIL, CALL, SMS, NOTE, MEETING
                subject: body.subject,
                content: body.content,
                outcome: body.outcome,
                duration: body.duration,
                scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
                completedAt: body.completedAt ? new Date(body.completedAt) : new Date(),
                userId: body.userId,
                contactId: body.contactId,
                dealId: body.dealId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                contact: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        company: true,
                    }
                },
                deal: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            data: activity
        }, { status: 201 })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create activity' },
            { status: 500 }
        )
    }
}

// GET /api/v1/activities - Get activities
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')
        const contactId = searchParams.get('contactId')
        const dealId = searchParams.get('dealId')
        const limit = parseInt(searchParams.get('limit') || '50')

        const where: any = {}
        if (type) where.type = type
        if (contactId) where.contactId = contactId
        if (dealId) where.dealId = dealId

        const activities = await prisma.activity.findMany({
            where,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                contact: {
                    select: {
                        firstName: true,
                        lastName: true,
                        company: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({
            success: true,
            data: activities
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch activities' },
            { status: 500 }
        )
    }
}
