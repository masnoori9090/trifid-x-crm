import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
    try {
        // Fetch real data counts
        const [
            dealsCount,
            contactsCount,
            dealsValue,
            recentDeals
        ] = await Promise.all([
            prisma.deal.count(),
            prisma.contact.count(),
            prisma.deal.aggregate({
                _sum: { value: true }
            }),
            prisma.deal.findMany({
                take: 5,
                orderBy: { updatedAt: 'desc' },
                include: { contact: true }
            })
        ])

        // Calculate pipeline stages
        const stages = ["Qualification", "Proposal", "Negotiation", "Closing"]
        const pipelineData = await Promise.all(
            stages.map(async (stage) => {
                const count = await prisma.deal.count({ where: { stage } })
                const value = await prisma.deal.aggregate({
                    where: { stage },
                    _sum: { value: true }
                })
                return {
                    name: stage,
                    count,
                    value: value._sum.value || 0
                }
            })
        )

        return NextResponse.json({
            stats: {
                totalDeals: dealsCount,
                totalValue: dealsValue._sum.value || 0,
                activeContacts: contactsCount,
                winRate: 32 // Hardcoded for now, can be calculated
            },
            pipeline: pipelineData,
            recentActivity: recentDeals.map(deal => ({
                id: deal.id,
                type: 'deal',
                action: `Updated deal "${deal.title}"`,
                target: deal.contact ? `${deal.contact.firstName} ${deal.contact.lastName}` : 'Unknown',
                time: deal.updatedAt
            }))
        })

    } catch (error) {
        console.error("Dashboard API Error:", error)
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
    }
}
