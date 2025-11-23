// Plecto API Integration Service
import { prisma } from '@/lib/db'

interface PlectoRegistration {
    data_source: string
    member?: string
    member_api_provider?: string
    member_api_id?: string
    member_name?: string
    team?: string
    date?: string
    external_id: string
    value?: number
}

export class PlectoService {
    private apiUrl = 'https://app.plecto.com/api/v2'
    private dataSourceId = '7e3cae2cdb524e9d89add18c75366fad' // Trifidx UUID
    private email = process.env.PLECTO_EMAIL || 'mohammad@tilt.ae'
    private password = process.env.PLECTO_PASSWORD || ''

    private async makeRequest(endpoint: string, data: any) {
        const auth = Buffer.from(`${this.email}:${this.password}`).toString('base64')

        const response = await fetch(`${this.apiUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Plecto API Error: ${error}`)
        }

        return response.json()
    }

    // Push deal won event to Plecto
    async pushDealWon(dealId: string, userId: string) {
        const deal = await prisma.deal.findUnique({
            where: { id: dealId },
            include: {
                owner: true,
                contact: true
            }
        })

        if (!deal) throw new Error('Deal not found')

        const registration: PlectoRegistration = {
            data_source: this.dataSourceId,
            member_api_provider: 'trifidx-crm',
            member_api_id: deal.owner.id,
            member_name: deal.owner.name || deal.owner.email,
            external_id: `deal_${deal.id}_${Date.now()}`,
            value: deal.value,
            date: new Date().toISOString()
        }

        return this.makeRequest('/registrations/', [registration])
    }

    // Push multiple sales metrics to Plecto
    async pushSalesMetrics() {
        const users = await prisma.user.findMany()
        const registrations: PlectoRegistration[] = []

        for (const user of users) {
            // Get deals won this month
            const startOfMonth = new Date()
            startOfMonth.setDate(1)
            startOfMonth.setHours(0, 0, 0, 0)

            const dealsWon = await prisma.deal.findMany({
                where: {
                    ownerId: user.id,
                    status: 'WON',
                    updatedAt: {
                        gte: startOfMonth
                    }
                }
            })

            const totalValue = dealsWon.reduce((sum, deal) => sum + deal.value, 0)
            const dealsCount = dealsWon.length

            // Push total revenue metric
            if (totalValue > 0) {
                registrations.push({
                    data_source: this.dataSourceId,
                    member_api_provider: 'trifidx-crm',
                    member_api_id: user.id,
                    member_name: user.name || user.email,
                    external_id: `revenue_${user.id}_${startOfMonth.getTime()}`,
                    value: totalValue,
                    date: new Date().toISOString()
                })
            }

            // Push deals count metric
            if (dealsCount > 0) {
                registrations.push({
                    data_source: this.dataSourceId,
                    member_api_provider: 'trifidx-crm',
                    member_api_id: user.id,
                    member_name: user.name || user.email,
                    external_id: `deals_count_${user.id}_${startOfMonth.getTime()}`,
                    value: dealsCount,
                    date: new Date().toISOString()
                })
            }
        }

        if (registrations.length > 0) {
            return this.makeRequest('/registrations/', registrations)
        }

        return { message: 'No metrics to push' }
    }

    // Push activity metrics (calls, emails, etc.)
    async pushActivityMetrics(userId: string, period: 'day' | 'week' | 'month' = 'month') {
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) throw new Error('User not found')

        const startDate = new Date()
        if (period === 'day') {
            startDate.setHours(0, 0, 0, 0)
        } else if (period === 'week') {
            startDate.setDate(startDate.getDate() - 7)
        } else {
            startDate.setDate(1)
            startDate.setHours(0, 0, 0, 0)
        }

        const activities = await prisma.activity.findMany({
            where: {
                userId,
                createdAt: {
                    gte: startDate
                }
            }
        })

        const registrations: PlectoRegistration[] = []

        // Count activities by type
        const activityCounts = activities.reduce((acc, activity) => {
            acc[activity.type] = (acc[activity.type] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        // Push each activity type count
        for (const [type, count] of Object.entries(activityCounts)) {
            registrations.push({
                data_source: this.dataSourceId,
                member_api_provider: 'trifidx-crm',
                member_api_id: userId,
                member_name: user.name || user.email,
                external_id: `activity_${type}_${userId}_${startDate.getTime()}`,
                value: count,
                date: new Date().toISOString()
            })
        }

        if (registrations.length > 0) {
            return this.makeRequest('/registrations/', registrations)
        }

        return { message: 'No activities to push' }
    }

    // Get CRM metrics for Plecto to pull
    async getCRMMetrics() {
        const deals = await prisma.deal.findMany({
            include: {
                owner: true
            }
        })

        const wonDeals = deals.filter(d => d.status === 'WON')
        const openDeals = deals.filter(d => d.status === 'OPEN')

        const totalRevenue = wonDeals.reduce((sum, deal) => sum + deal.value, 0)
        const pipelineValue = openDeals.reduce((sum, deal) => sum + deal.value, 0)

        const contacts = await prisma.contact.count()
        const users = await prisma.user.count()

        return {
            total_deals: deals.length,
            total_revenue: totalRevenue,
            pipeline_value: pipelineValue,
            deals_won: wonDeals.length,
            deals_open: openDeals.length,
            total_contacts: contacts,
            total_users: users,
            conversion_rate: wonDeals.length / (wonDeals.length + deals.filter(d => d.status === 'LOST').length) || 0,
            average_deal_size: wonDeals.length > 0 ? totalRevenue / wonDeals.length : 0,
            timestamp: new Date().toISOString()
        }
    }
}

export const plectoService = new PlectoService()
