const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateDemoData() {
    console.log('📝 Updating demo deals to WON status...\n')

    try {
        // Get all deals
        const deals = await prisma.deal.findMany()

        if (deals.length === 0) {
            console.log('❌ No deals found in database')
            return
        }

        // Update 2 deals to WON status
        const deal1 = await prisma.deal.update({
            where: { id: deals[0].id },
            data: { status: 'WON' }
        })
        console.log(`✅ Updated deal: ${deal1.title} → WON ($${deal1.value})`)

        if (deals[1]) {
            const deal2 = await prisma.deal.update({
                where: { id: deals[1].id },
                data: { status: 'WON' }
            })
            console.log(`✅ Updated deal: ${deal2.title} → WON ($${deal2.value})`)
        }

        console.log('\n🎉 Demo data updated!')
        console.log('\nNow run: node scripts/push-to-plecto.js')

    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

updateDemoData()
