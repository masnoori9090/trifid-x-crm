#!/usr/bin/env node

// Script to send all demo data to Plecto
const baseUrl = 'http://localhost:3000'

async function pushToPlecto() {
    console.log('🚀 Starting Plecto data push...\n')

    try {
        // 1. Push all sales metrics
        console.log('📊 Pushing sales metrics...')
        const salesResponse = await fetch(`${baseUrl}/api/integrations/plecto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'push_sales_metrics' })
        })

        const salesData = await salesResponse.json()
        console.log('✅ Sales metrics pushed:', salesData)
        console.log('')

        // 2. Get all users to push their activities
        console.log('📧 Pushing activity metrics for all users...')

        // Demo user IDs from seed
        const demoUserIds = [
            'admin-user-id', // You'll need to get actual IDs
            'sales-user-id'
        ]

        // For now, let's push for the admin user
        // You can get the actual user ID from the database

        console.log('Note: To push activity metrics for specific users,')
        console.log('you need to provide their user IDs.')
        console.log('')

        // 3. Check what was sent
        console.log('📈 Retrieving CRM metrics summary...')
        const metricsResponse = await fetch(`${baseUrl}/api/integrations/plecto`)
        const metricsData = await metricsResponse.json()

        console.log('✅ Current CRM Metrics:')
        console.log(JSON.stringify(metricsData.data, null, 2))
        console.log('')

        console.log('🎉 Data push complete!')
        console.log('')
        console.log('📱 Next steps:')
        console.log('1. Login to Plecto at https://app.plecto.com')
        console.log('2. Check your Trifidx data source')
        console.log('3. Create widgets using the pushed data')

    } catch (error) {
        console.error('❌ Error pushing to Plecto:', error.message)
        console.log('')
        console.log('💡 Make sure:')
        console.log('- The dev server is running (npm run dev)')
        console.log('- PLECTO_PASSWORD is set in .env')
        console.log('- You have network connectivity')
    }
}

pushToPlecto()
