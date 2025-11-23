import { NextResponse } from 'next/server'
import { plectoService } from '@/lib/plecto'

// POST - Push CRM data to Plecto
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { action, userId, dealId } = body

        let result

        switch (action) {
            case 'push_sales_metrics':
                // Push all sales metrics to Plecto
                result = await plectoService.pushSalesMetrics()
                break

            case 'push_deal_won':
                // Push a specific won deal
                if (!dealId || !userId) {
                    return NextResponse.json(
                        { success: false, error: 'dealId and userId required' },
                        { status: 400 }
                    )
                }
                result = await plectoService.pushDealWon(dealId, userId)
                break

            case 'push_activities':
                // Push activity metrics for a user
                if (!userId) {
                    return NextResponse.json(
                        { success: false, error: 'userId required' },
                        { status: 400 }
                    )
                }
                const period = body.period || 'month'
                result = await plectoService.pushActivityMetrics(userId, period)
                break

            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid action. Use: push_sales_metrics, push_deal_won, or push_activities' },
                    { status: 400 }
                )
        }

        return NextResponse.json({
            success: true,
            message: 'Data pushed to Plecto successfully',
            data: result
        })
    } catch (error: any) {
        console.error('Plecto Push Error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to push data to Plecto' },
            { status: 500 }
        )
    }
}

// GET - Provide metrics for Plecto to pull
export async function GET(request: Request) {
    try {
        const metrics = await plectoService.getCRMMetrics()

        return NextResponse.json({
            success: true,
            data: metrics,
            message: 'CRM metrics ready for Plecto to pull'
        })
    } catch (error: any) {
        console.error('Plecto Metrics Error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch metrics' },
            { status: 500 }
        )
    }
}
