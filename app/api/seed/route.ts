import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function GET() {
    try {
        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: "admin@trifidx.com" }
        })

        if (existingAdmin) {
            return NextResponse.json({ message: "Admin already exists!" }, { status: 200 })
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash("admin123", 12)

        const admin = await prisma.user.create({
            data: {
                email: "admin@trifidx.com",
                name: "Admin User",
                password: hashedPassword,
                role: "ADMIN",
            }
        })

        // Create default pipeline
        const pipeline = await prisma.pipeline.create({
            data: {
                name: "Default Sales Pipeline",
                stages: JSON.stringify(["Qualification", "Proposal", "Negotiation", "Closing"]),
                isDefault: true,
            }
        })

        return NextResponse.json({
            message: "Database seeded successfully!",
            user: admin.email
        }, { status: 200 })

    } catch (error) {
        console.error("Seeding error:", error)
        return NextResponse.json({ error: "Failed to seed database", details: error }, { status: 500 })
    }
}
