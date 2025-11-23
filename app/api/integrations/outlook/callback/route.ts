import { NextResponse } from 'next/server'

// OAuth callback for Outlook integration
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
            return NextResponse.redirect(`$ENV/settings?error=outlook_auth_failed`)
        }

        if (!code) {
            return NextResponse.json(
                { success: false, error: 'Missing authorization code' },
                { status: 400 }
            )
        }

        // TODO: Exchange code for access token with Microsoft Graph API
        // const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
        //   method: 'POST',
        //   body: new URLSearchParams({
        //     client_id: process.env.OUTLOOK_CLIENT_ID,
        //     client_secret: process.env.OUTLOOK_CLIENT_SECRET,
        //     code,
        //     redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/outlook/callback`,
        //     grant_type: 'authorization_code',
        //   })
        // })

        // Store the access token and refresh token in database
        // associated with the user

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?success=outlook_connected`)
    } catch (error) {
        console.error('Outlook OAuth Error:', error)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/settings?error=outlook_error`)
    }
}

// Initiate Outlook OAuth flow
export async function POST(request: Request) {
    const authUrl = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize')

    authUrl.searchParams.append('client_id', process.env.OUTLOOK_CLIENT_ID || 'YOUR_CLIENT_ID')
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/outlook/callback`)
    authUrl.searchParams.append('scope', 'openid profile email Mail.Read Mail.Send Calendars.ReadWrite')
    authUrl.searchParams.append('response_mode', 'query')

    return NextResponse.json({
        success: true,
        authUrl: authUrl.toString()
    })
}
