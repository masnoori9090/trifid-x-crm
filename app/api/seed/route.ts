import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

// Create a fresh Prisma Client for this operation
const prisma = new PrismaClient()

export async function GET() {
    const logs: string[] = []

    try {
        logs.push("🚀 Starting database setup...")

        // Test database connection
        logs.push("📡 Testing database connection...")
        await prisma.$connect()
        logs.push("✅ Database connection successful")

        // Check if User table exists by trying a simple query
        logs.push("🔍 Checking if tables exist...")
        try {
            const userCount = await prisma.user.count()
            logs.push(`✅ User table exists (${userCount} users found)`)

            if (userCount > 0) {
                const adminExists = await prisma.user.findUnique({
                    where: { email: "admin@trifidx.com" }
                })

                if (adminExists) {
                    await prisma.$disconnect()
                    return NextResponse.json({
                        success: true,
                        message: "✅ Database already seeded! Admin user exists.",
                        logs,
                        credentials: {
                            email: "admin@trifidx.com",
                            password: "admin123"
                        }
                    })
                }
            }
        } catch (error) {
            logs.push("⚠️ Tables don't exist yet - they will be created automatically on first use")
        }

        // Create admin user
        logs.push("👤 Creating admin user...")
        const hashedPassword = await bcrypt.hash("admin123", 12)

        const admin = await prisma.user.create({
            data: {
                email: "admin@trifidx.com",
                name: "Admin User",
                password: hashedPassword,
                role: "ADMIN",
            }
        })
        logs.push(`✅ Admin user created: ${admin.email}`)

        // Create sales rep
        logs.push("👤 Creating sales rep user...")
        const salesRep = await prisma.user.create({
            data: {
                email: "sales@trifidx.com",
                name: "Sales Rep",
                password: await bcrypt.hash("sales123", 12),
                role: "SALES_REP",
            }
        })
        logs.push(`✅ Sales rep created: ${salesRep.email}`)

        // Create default pipeline
        logs.push("📊 Creating default pipeline...")
        const pipeline = await prisma.pipeline.create({
            data: {
                name: "Default Sales Pipeline",
                stages: JSON.stringify(["Qualification", "Proposal", "Negotiation", "Closing"]),
                isDefault: true,
            }
        })
        logs.push("✅ Pipeline created")

        // Create sample contacts
        logs.push("📇 Creating sample contacts...")
        const contacts = await Promise.all([
            prisma.contact.create({
                data: {
                    firstName: "John",
                    lastName: "Smith",
                    email: "john@acmecorp.com",
                    phone: "+1 234 567 8900",
                    company: "Acme Corp",
                    position: "CEO",
                    status: "CUSTOMER",
                    ownerId: admin.id,
                }
            }),
            prisma.contact.create({
                data: {
                    firstName: "Sarah",
                    lastName: "Johnson",
                    email: "sarah@techsolutions.com",
                    phone: "+1 234 567 8901",
                    company: "Tech Solutions",
                    position: "CTO",
                    status: "PROSPECT",
                    ownerId: admin.id,
                }
            }),
        ])
        logs.push(`✅ Created ${contacts.length} sample contacts`)

        // Create sample deals
        logs.push("💰 Creating sample deals...")
        const deals = await Promise.all([
            prisma.deal.create({
                data: {
                    title: "Enterprise Solution",
                    value: 125000,
                    probability: 25,
                    stage: "Qualification",
                    status: "OPEN",
                    contactId: contacts[0].id,
                    ownerId: admin.id,
                    pipelineId: pipeline.id,
                    expectedCloseDate: new Date("2024-12-15"),
                }
            }),
            prisma.deal.create({
                data: {
                    title: "SaaS Package",
                    value: 45000,
                    probability: 50,
                    stage: "Proposal",
                    status: "OPEN",
                    contactId: contacts[1].id,
                    ownerId: admin.id,
                    pipelineId: pipeline.id,
                    expectedCloseDate: new Date("2024-12-20"),
                }
            }),
        ])
        logs.push(`✅ Created ${deals.length} sample deals`)

        await prisma.$disconnect()
        logs.push("🎉 Database seeded successfully!")

        return NextResponse.json({
            success: true,
            message: "🎉 Database setup complete! You can now log in.",
            logs,
            credentials: {
                email: "admin@trifidx.com",
                password: "admin123"
            }
        })

    } catch (error: any) {
        logs.push(`❌ Error: ${error.message}`)
        console.error("Seeding error:", error)

        await prisma.$disconnect()

        return NextResponse.json({
            success: false,
            error: "Failed to seed database",
            message: error.message,
            logs,
            hint: "Make sure DATABASE_URL or POSTGRES_PRISMA_URL is set in Vercel environment variables"
        }, { status: 500 })
    }
}
