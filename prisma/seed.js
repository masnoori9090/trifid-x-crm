const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)

    const admin = await prisma.user.create({
        data: {
            email: 'admin@trifidx.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log('✅ Created admin user:', admin.email)

    // Create a sales rep user
    const salesRep = await prisma.user.create({
        data: {
            email: 'sales@trifidx.com',
            name: 'Sales Rep',
            password: await bcrypt.hash('sales123', 12),
            role: 'SALES_REP',
        },
    })

    console.log('✅ Created sales user:', salesRep.email)

    // Create default pipeline
    const pipeline = await prisma.pipeline.create({
        data: {
            name: 'Default Sales Pipeline',
            stages: JSON.stringify(['Qualification', 'Proposal', 'Negotiation', 'Closing']),
            isDefault: true,
        },
    })

    console.log('✅ Created default pipeline')

    // Create sample contacts
    const contacts = await Promise.all([
        prisma.contact.create({
            data: {
                firstName: 'John',
                lastName: 'Smith',
                email: 'john@acmecorp.com',
                phone: '+1 234 567 8900',
                company: 'Acme Corp',
                position: 'CEO',
                status: 'CUSTOMER',
                ownerId: admin.id,
            },
        }),
        prisma.contact.create({
            data: {
                firstName: 'Sarah',
                lastName: 'Johnson',
                email: 'sarah@techsolutions.com',
                phone: '+1 234 567 8901',
                company: 'Tech Solutions',
                position: 'CTO',
                status: 'PROSPECT',
                ownerId: admin.id,
            },
        }),
        prisma.contact.create({
            data: {
                firstName: 'Mike',
                lastName: 'Brown',
                email: 'mike@globalinc.com',
                phone: '+1 234 567 8902',
                company: 'Global Inc',
                position: 'VP Sales',
                status: 'LEAD',
                ownerId: admin.id,
            },
        }),
    ])

    console.log(`✅ Created ${contacts.length} contacts`)

    // Create sample deals
    const deals = await Promise.all([
        prisma.deal.create({
            data: {
                title: 'Enterprise Solution',
                value: 125000,
                probability: 25,
                stage: 'Qualification',
                status: 'OPEN',
                contactId: contacts[0].id,
                ownerId: admin.id,
                pipelineId: pipeline.id,
                expectedCloseDate: new Date('2024-12-15'),
            },
        }),
        prisma.deal.create({
            data: {
                title: 'SaaS Package',
                value: 45000,
                probability: 50,
                stage: 'Proposal',
                status: 'OPEN',
                contactId: contacts[1].id,
                ownerId: admin.id,
                pipelineId: pipeline.id,
                expectedCloseDate: new Date('2024-12-20'),
            },
        }),
        prisma.deal.create({
            data: {
                title: 'Consulting Services',
                value: 75000,
                probability: 75,
                stage: 'Negotiation',
                status: 'OPEN',
                contactId: contacts[2].id,
                ownerId: admin.id,
                pipelineId: pipeline.id,
                expectedCloseDate: new Date('2024-12-10'),
            },
        }),
    ])

    console.log(`✅ Created ${deals.length} deals`)

    // Create sample activities
    const activities = await Promise.all([
        prisma.activity.create({
            data: {
                type: 'EMAIL',
                subject: 'Proposal Follow-up',
                content: 'Sent product proposal and pricing details',
                userId: admin.id,
                contactId: contacts[0].id,
                dealId: deals[0].id,
            },
        }),
        prisma.activity.create({
            data: {
                type: 'CALL',
                subject: 'Discovery Call',
                content: 'Discussed requirements and pain points',
                outcome: 'Connected',
                duration: 45,
                userId: admin.id,
                contactId: contacts[1].id,
                dealId: deals[1].id,
            },
        }),
    ])

    console.log(`✅ Created ${activities.length} activities`)

    // Create sample tasks
    const tasks = await Promise.all([
        prisma.task.create({
            data: {
                title: 'Follow up with Acme Corp',
                description: 'Send proposal follow-up email',
                priority: 'HIGH',
                status: 'TODO',
                dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
                createdById: admin.id,
                assignedToId: admin.id,
                contactId: contacts[0].id,
                dealId: deals[0].id,
            },
        }),
        prisma.task.create({
            data: {
                title: 'Prepare demo for Tech Solutions',
                description: 'Create custom demo presentation',
                priority: 'HIGH',
                status: 'IN_PROGRESS',
                dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
                createdById: admin.id,
                assignedToId: admin.id,
                contactId: contacts[1].id,
                dealId: deals[1].id,
            },
        }),
    ])

    console.log(`✅ Created ${tasks.length} tasks`)

    // Create email template
    const template = await prisma.emailTemplate.create({
        data: {
            name: 'Introduction Email',
            subject: 'Nice to meet you!',
            body: 'Hi {{firstName}},\n\nIt was great speaking with you today. I wanted to follow up on our conversation...\n\nBest regards,\n{{senderName}}',
        },
    })

    console.log('✅ Created email template')

    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📝 Demo Accounts:')
    console.log('   Admin: admin@trifidx.com / admin123')
    console.log('   Sales: sales@trifidx.com / sales123')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
