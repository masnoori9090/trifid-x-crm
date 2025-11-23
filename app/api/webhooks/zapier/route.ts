import { NextResponse } from 'next/server'

// Webhook endpoint for Zapier integrations
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { event, data, zapier_hook_id } = body

        console.log('Zapier webhook received:', { event, zapier_hook_id })

        // Handle different event types
        switch (event) {
            case 'contact.created':
                // Process new contact from Zapier
                // You can create contact in your database here
                break

            case 'deal.created':
                // Process new deal from Zapier
                break

            case 'activity.created':
                // Process new activity from Zapier
                break

            default:
                console.log('Unknown event type:', event)
        }

        return NextResponse.json({
            success: true,
            message: 'Webhook processed successfully',
            received: {
                event,
                timestamp: new Date().toISOString()
            }
        })
    } catch (error) {
        console.error('Webhook Error:', error)
        return NextResponse.json(
            { success: false, error: 'Webhook processing failed' },
            { status: 500 }
        )
    }
}

// GET endpoint for Zapier to verify the webhook
export async function GET(request: Request) {
    return NextResponse.json({
        success: true,
        message: 'Zapier webhook endpoint is active',
        endpoints: {
            contacts: '/api/v1/contacts',
            deals: '/api/v1/deals',
            activities: '/api/v1/activities',
            webhooks: '/api/webhooks/zapier'
        }
    })
}
