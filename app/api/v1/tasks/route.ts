import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
    try {
        // In a real app, we would filter by the logged-in user
        // For now, we fetch all tasks
        const tasks = await prisma.task.findMany({
            orderBy: { dueDate: 'asc' },
            include: {
                contact: true,
                deal: true,
                assignedTo: true
            }
        })
        return NextResponse.json(tasks)
    } catch (error) {
        console.error("Failed to fetch tasks:", error)
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { title, description, dueDate, priority, contactId, dealId } = body

        // We need a user ID. For now, we'll find the first user (admin)
        const admin = await prisma.user.findFirst()
        if (!admin) {
            return NextResponse.json({ error: "No users found" }, { status: 500 })
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority,
                createdById: admin.id,
                assignedToId: admin.id, // Auto-assign to self
                contactId: contactId || null,
                dealId: dealId || null
            }
        })

        return NextResponse.json(task)
    } catch (error) {
        console.error("Failed to create task:", error)
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { id, status, ...updates } = body

        const task = await prisma.task.update({
            where: { id },
            data: {
                status,
                ...updates
            }
        })

        return NextResponse.json(task)
    } catch (error) {
        console.error("Failed to update task:", error)
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
    }
}
