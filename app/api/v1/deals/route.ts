import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/v1/deals - Get all deals
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const stage = searchParams.get('stage')
        const status = searchParams.get('status')
        const limit = parseInt(searchParams.get('limit') || '100')
        const offset = parseInt(searchParams.get('offset') || '0')

        const where: any = {}
        if (stage) where.stage = stage
        if (status) where.status = status

        const deals = await prisma.deal.findMany({
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
                contact: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        company: true,
                    }
                },
                pipeline: true,
                activities: true,
                tasks: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const total = await prisma.deal.count({ where })

        return NextResponse.json({
            success: true,
            data: deals,
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
            { success: false, error: 'Failed to fetch deals' },
            { status: 500 }
        )
    }
}

// POST /api/v1/deals - Create a new deal
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const deal = await prisma.deal.create({
            data: {
                title: body.title,
                value: body.value,
                probability: body.probability || 50,
                stage: body.stage || 'QUALIFICATION',
                status: body.status || 'OPEN',
                expectedCloseDate: body.expectedCloseDate ? new Date(body.expectedCloseDate) : null,
                notes: body.notes,
                customFields: body.customFields ? JSON.stringify(body.customFields) : null,
                contactId: body.contactId,
                ownerId: body.ownerId,
                pipelineId: body.pipelineId,
            },
            include: {
                owner: true,
                contact: true,
                pipeline: true,
            }
        })

        return NextResponse.json({
            success: true,
            data: deal
        }, { status: 201 })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create deal' },
            { status: 500 }
        )
    }
}

// PATCH /api/v1/deals/:id - Update deal stage
export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { id, stage, status, value, probability } = body

        const deal = await prisma.deal.update({
            where: { id },
            data: {
                ...(stage && { stage }),
                ...(status && { status }),
                ...(value !== undefined && { value }),
                ...(probability !== undefined && { probability }),
            },
            include: {
                owner: true,
                contact: true,
                pipeline: true,
            }
        })

        return NextResponse.json({
            success: true,
            data: deal
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update deal' },
            { status: 500 }
        )
    }
}
