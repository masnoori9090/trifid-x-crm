import { NextResponse } from 'next/server'

// QuickBooks OAuth callback
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const code = searchParams.get('code')
        const realmId = searchParams.get('realmId')
        const error = searchParams.get('error')

        if (error) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=quickbooks_auth_failed`)
        }

        if (!code || !realmId) {
            return NextResponse.json(
                { success: false, error: 'Missing authorization code or realm ID' },
                { status: 400 }
            )
        }

        // TODO: Exchange code for access token with QuickBooks API
        // const tokenResponse = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Basic ${Buffer.from(`${process.env.QUICKBOOKS_CLIENT_ID}:${process.env.QUICKBOOKS_CLIENT_SECRET}`).toString('base64')}`,
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   body: new URLSearchParams({
        //     grant_type: 'authorization_code',
        //     code,
        //     redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/quickbooks/callback`
        //   })
        // })

        // Store realmId and tokens in database

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?success=quickbooks_connected&realmId=${realmId}`)
    } catch (error) {
        console.error('QuickBooks OAuth Error:', error)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=quickbooks_error`)
    }
}

// Initiate QuickBooks OAuth flow
export async function POST(request: Request) {
    const authUrl = new URL('https://appcenter.intuit.com/connect/oauth2')

    authUrl.searchParams.append('client_id', process.env.QUICKBOOKS_CLIENT_ID || 'YOUR_CLIENT_ID')
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('scope', 'com.intuit.quickbooks.accounting')
    authUrl.searchParams.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/quickbooks/callback`)
    authUrl.searchParams.append('state', 'security_token')

    return NextResponse.json({
        success: true,
        authUrl: authUrl.toString()
    })
}
