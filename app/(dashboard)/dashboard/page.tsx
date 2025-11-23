import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, TrendingUp, CheckSquare, ArrowUp, ArrowDown, Phone, Mail, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatRelativeDate } from '@/lib/utils'

export default async function DashboardPage() {
    // Mock data - will be replaced with real data from API
    const stats = [
        {
            title: 'Total Deals',
            value: '127',
            change: '+12%',
            isPositive: true,
            icon: Target,
        },
        {
            title: 'Deal Value',
            value: formatCurrency(487500),
            change: '+23%',
            isPositive: true,
            icon: TrendingUp,
        },
        {
            title: 'Active Contacts',
            value: '1,234',
            change: '+8%',
            isPositive: true,
            icon: Users,
        },
        {
            title: 'Open Tasks',
            value: '24',
            change: '-15%',
            isPositive: true,
            icon: CheckSquare,
        },
    ]

    const recentActivities = [
        { type: 'email', contact: 'John Smith', company: 'Acme Corp', action: 'Sent proposal email', time: '2 minutes ago' },
        { type: 'call', contact: 'Sarah Johnson', company: 'Tech Solutions', action: 'Completed discovery call', time: '1 hour ago' },
        { type: 'meeting', contact: 'Mike Brown', company: 'Global Inc', action: 'Scheduled demo meeting', time: '3 hours ago' },
        { type: 'email', contact: 'Emily Davis', company: 'Startup XYZ', action: 'Received reply', time: '5 hours ago' },
    ]

    const upcomingTasks = [
        { title: 'Follow up with Acme Corp', due: '2 hours', priority: 'high', contact: 'John Smith' },
        { title: 'Send proposal to Tech Solutions', due: '4 hours', priority: 'high', contact: 'Sarah Johnson' },
        { title: 'Demo preparation for Global Inc', due: 'Tomorrow', priority: 'medium', contact: 'Mike Brown' },
        { title: 'Contract review', due: '2 days', priority: 'low', contact: 'Emily Davis' },
    ]

    const pipelineStages = [
        { name: 'Qualification', count: 12, value: formatCurrency(145000) },
        { name: 'Proposal', count: 8, value: formatCurrency(98000) },
        { name: 'Negotiation', count: 5, value: formatCurrency(127000) },
        { name: 'Closing', count: 3, value: formatCurrency(87500) },
    ]

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'email': return <Mail className="h-4 w-4" />
            case 'call': return <Phone className="h-4 w-4" />
            case 'meeting': return <Calendar className="h-4 w-4" />
            default: return null
        }
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <stat.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    {stat.isPositive ? (
                                        <ArrowUp className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <ArrowDown className="h-4 w-4 text-red-500" />
                                    )}
                                    <span className={stat.isPositive ? 'text-green-500' : 'text-red-500'}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                    <div className="p-2 bg-muted rounded-lg">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{activity.contact}</p>
                                        <p className="text-sm text-muted-foreground">{activity.company}</p>
                                        <p className="text-sm mt-1">{activity.action}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingTasks.map((task, index) => (
                                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium">{task.title}</p>
                                            <Badge
                                                variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'secondary'}
                                                className="text-xs"
                                            >
                                                {task.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{task.contact}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{task.due}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Pipeline Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Pipeline Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        {pipelineStages.map((stage) => (
                            <div key={stage.name} className="text-center p-4 bg-muted/50 rounded-lg">
                                <h3 className="font-semibold text-sm text-muted-foreground mb-2">{stage.name}</h3>
                                <p className="text-2xl font-bold">{stage.count}</p>
                                <p className="text-sm text-muted-foreground mt-1">{stage.value}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
