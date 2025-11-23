import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, Users, Target, DollarSign, Phone, Mail, Calendar } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function ReportsPage() {
    const salesMetrics = [
        { label: 'Total Revenue', value: formatCurrency(487500), change: '+23%', trend: 'up' },
        { label: 'Deals Closed', value: '42', change: '+12%', trend: 'up' },
        { label: 'Win Rate', value: '68%', change: '+5%', trend: 'up' },
        { label: 'Avg Deal Size', value: formatCurrency(11607), change: '+8%', trend: 'up' },
    ]

    const activityMetrics = [
        { type: 'Emails Sent', count: 324, icon: Mail, color: 'text-blue-500' },
        { type: 'Calls Made', count: 156, icon: Phone, color: 'text-green-500' },
        { type: 'Meetings', count: 48, icon: Calendar, color: 'text-purple-500' },
        { type: 'New Contacts', count: 89, icon: Users, color: 'text-orange-500' },
    ]

    const topPerformers = [
        { name: 'You', deals: 42, revenue: formatCurrency(487500), winRate: '68%' },
        { name: 'Sarah Mitchell', deals: 38, revenue: formatCurrency(425000), winRate: '64%' },
        { name: 'Mike Thompson', deals: 35, revenue: formatCurrency(398000), winRate: '61%' },
        { name: 'Emily Chen', deals: 31, revenue: formatCurrency(367000), winRate: '59%' },
    ]

    const pipelineHealth = [
        { stage: 'Qualification', deals: 28, value: formatCurrency(345000), avgAge: '12 days' },
        { stage: 'Proposal', deals: 18, value: formatCurrency(267000), avgAge: '18 days' },
        { stage: 'Negotiation', deals: 12, value: formatCurrency(198000), avgAge: '24 days' },
        { stage: 'Closing', deals: 8, value: formatCurrency(145000), avgAge: '31 days' },
    ]

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                <p className="text-muted-foreground mt-1">Track performance and analyze your sales data</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="sales">Sales Performance</TabsTrigger>
                    <TabsTrigger value="activity">Activity Reports</TabsTrigger>
                    <TabsTrigger value="pipeline">Pipeline Health</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Sales Metrics */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {salesMetrics.map((metric) => (
                            <Card key={metric.label}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                                            <p className="text-2xl font-bold mt-2">{metric.value}</p>
                                            <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
                                                <TrendingUp className="h-3 w-3" />
                                                {metric.change}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <DollarSign className="h-6 w-6 text-primary" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Activity Metrics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Summary (Last 30 Days)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {activityMetrics.map((activity) => (
                                    <div key={activity.type} className="text-center p-4 bg-muted/50 rounded-lg">
                                        <activity.icon className={`h-8 w-8 mx-auto mb-2 ${activity.color}`} />
                                        <p className="text-2xl font-bold">{activity.count}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{activity.type}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Performers */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Performers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topPerformers.map((performer, index) => (
                                    <div key={performer.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{performer.name}</p>
                                                <p className="text-sm text-muted-foreground">{performer.deals} deals closed</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{performer.revenue}</p>
                                            <p className="text-sm text-muted-foreground">Win rate: {performer.winRate}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sales" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center text-muted-foreground">
                                <div className="text-center">
                                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                                    <p>Sales charts and visualizations would appear here</p>
                                    <p className="text-sm mt-2">Revenue trends, conversion rates, and forecasting</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                {activityMetrics.map((activity) => (
                                    <Card key={activity.type}>
                                        <CardContent className="p-6 text-center">
                                            <activity.icon className={`h-12 w-12 mx-auto mb-4 ${activity.color}`} />
                                            <p className="text-3xl font-bold">{activity.count}</p>
                                            <p className="text-sm text-muted-foreground mt-2">{activity.type}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pipeline" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pipeline Health</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pipelineHealth.map((stage) => (
                                    <div key={stage.stage} className="p-4 bg-muted/50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold">{stage.stage}</h4>
                                            <span className="text-sm text-muted-foreground">Avg age: {stage.avgAge}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold">{stage.deals}</p>
                                                <p className="text-sm text-muted-foreground">deals</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold">{stage.value}</p>
                                                <p className="text-sm text-muted-foreground">total value</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
