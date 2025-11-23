'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Users, Target, TrendingUp, CheckSquare, ArrowUp, ArrowDown, Phone, Mail, Calendar, Sparkles, Activity } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

export default function DashboardPage() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/v1/dashboard')
                if (res.ok) {
                    const json = await res.json()
                    setData(json)
                }
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Mock data for the Area Chart (Revenue Trend) - since we don't have historical data yet
    const trendData = [
        { name: 'Mon', value: 4000 },
        { name: 'Tue', value: 3000 },
        { name: 'Wed', value: 2000 },
        { name: 'Thu', value: 2780 },
        { name: 'Fri', value: 1890 },
        { name: 'Sat', value: 2390 },
        { name: 'Sun', value: 3490 },
    ]

    if (loading) {
        return <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-primary">Loading Command Center...</div>
        </div>
    }

    const stats = [
        {
            title: 'Total Revenue',
            value: formatCurrency(data?.stats?.totalValue || 0),
            change: '+12.5%',
            isPositive: true,
            icon: DollarIcon,
        },
        {
            title: 'Active Deals',
            value: data?.stats?.totalDeals || 0,
            change: '+4',
            isPositive: true,
            icon: Target,
        },
        {
            title: 'Win Rate',
            value: `${data?.stats?.winRate}%`,
            change: '+2.1%',
            isPositive: true,
            icon: TrendingUp,
        },
        {
            title: 'Total Contacts',
            value: data?.stats?.activeContacts || 0,
            change: '+12',
            isPositive: true,
            icon: Users,
        },
    ]

    return (
        <div className="space-y-6 animate-fade-in pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Command Center
                    </h1>
                    <p className="text-muted-foreground mt-1">Real-time insights and AI-driven recommendations.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 7 Days
                    </Button>
                    <Button className="gradient-primary">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Ask AI Assistant
                    </Button>
                </div>
            </div>

            {/* AI Insight Banner */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100 dark:from-indigo-950/20 dark:to-purple-950/20 dark:border-indigo-900">
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full mt-1">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary">AI Insight</h3>
                        <p className="text-sm text-muted-foreground">
                            Your pipeline velocity has increased by 15% this week.
                            Focus on closing the <strong>Acme Corp</strong> deal (Stage: Negotiation) to hit your monthly target.
                            <span className="text-primary cursor-pointer hover:underline ml-1">View Deal &rarr;</span>
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                </div>
                                <div className="p-2 bg-primary/5 rounded-lg">
                                    <stat.icon className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs mt-3">
                                {stat.isPositive ? (
                                    <ArrowUp className="h-3 w-3 text-green-500" />
                                ) : (
                                    <ArrowDown className="h-3 w-3 text-red-500" />
                                )}
                                <span className={stat.isPositive ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                                    {stat.change}
                                </span>
                                <span className="text-muted-foreground ml-1">vs last week</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                        <CardDescription>Daily revenue performance over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Pipeline Funnel */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pipeline Health</CardTitle>
                        <CardDescription>Active deals by stage</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data?.pipeline || []} layout="vertical" margin={{ left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={80}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={32}>
                                        {data?.pipeline?.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={['#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7'][index % 4]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {data?.pipeline?.map((stage: any) => (
                                <div key={stage.name} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{stage.name}</span>
                                    <span className="font-medium">{formatCurrency(stage.value)}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Feed */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Live Activity Feed
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {data?.recentActivity?.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">No recent activity</p>
                        ) : (
                            data?.recentActivity?.map((activity: any, index: number) => (
                                <div key={index} className="flex gap-4 relative">
                                    {/* Timeline Line */}
                                    {index !== data.recentActivity.length - 1 && (
                                        <div className="absolute left-[19px] top-8 bottom-[-24px] w-[2px] bg-muted" />
                                    )}

                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10">
                                        <CheckSquare className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-sm">{activity.action}</h4>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Target: <span className="text-foreground font-medium">{activity.target}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function DollarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}
