'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Users,
    Upload,
    BarChart3,
    Mail,
    Phone,
    CheckCircle2,
    TrendingUp,
    Plus,
    Search,
    MoreVertical
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

// Mock Data for Charts
const sparklineData = [
    { value: 10 }, { value: 15 }, { value: 12 }, { value: 20 }, { value: 18 }, { value: 25 }, { value: 22 },
    { value: 30 }, { value: 28 }, { value: 35 }, { value: 32 }, { value: 40 }, { value: 38 }, { value: 45 }
]

const leaderboardData = [
    { name: 'Sarah Reddington', score: 142, rank: 1, avatar: '/avatars/01.png' },
    { name: 'Thomas Steinsan', score: 89, rank: 2, avatar: '/avatars/02.png' },
    { name: 'Matt Morris', score: 65, rank: 3, avatar: '/avatars/03.png' },
    { name: 'Jake Wilson', score: 61, rank: 4, avatar: '/avatars/04.png' },
    { name: 'Mary Fulburn', score: 56, rank: 5, avatar: '/avatars/05.png' },
    { name: 'Max Davis', score: 42, rank: 6, avatar: '/avatars/06.png' },
]

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Admin Portal</h1>
                    <p className="text-muted-foreground mt-1">Manage your team, data, and performance.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setActiveTab('import')}>
                        <Upload className="mr-2 h-4 w-4" />
                        Import Leads
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setActiveTab('team')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-slate-100 p-1">
                    <TabsTrigger value="overview">Overview & Analytics</TabsTrigger>
                    <TabsTrigger value="team">Team Management</TabsTrigger>
                    <TabsTrigger value="import">Bulk Import</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB - The "Dark Mode" Dashboard from the Image */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="bg-[#0f172a] p-6 rounded-xl text-white shadow-2xl border border-slate-800">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-semibold">Performance Overview</h2>
                            <div className="flex gap-4 text-sm text-slate-400">
                                <span className="hover:text-white cursor-pointer transition-colors">Today</span>
                                <span className="text-white font-medium cursor-pointer">This Week</span>
                                <span className="hover:text-white cursor-pointer transition-colors">This Month</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Metrics Grid */}
                            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                <MetricCard title="Created Leads" value="568" icon={Users} color="#3b82f6" />
                                <MetricCard title="Outbound Calls" value="1,422" icon={Phone} color="#8b5cf6" />
                                <MetricCard title="Inbound Calls" value="875" icon={Phone} color="#10b981" />
                                <MetricCard title="Call Duration" value="2m 8s" icon={Phone} color="#f59e0b" />
                                <MetricCard title="Sent Emails" value="2,349" icon={Mail} color="#3b82f6" />
                                <MetricCard title="Received Emails" value="1,389" icon={Mail} color="#8b5cf6" />
                                <MetricCard title="Opportunities" value="287" icon={TrendingUp} color="#10b981" />
                                <MetricCard title="Opportunities Won" value="182" icon={CheckCircle2} color="#f59e0b" />
                            </div>

                            {/* Leaderboard */}
                            <div className="bg-[#1e293b] rounded-xl p-6 border border-slate-700">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="font-semibold text-lg">Leaderboard</h3>
                                        <p className="text-xs text-slate-400">Opportunities Won</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {leaderboardData.map((user, index) => (
                                        <div key={user.name} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className={`
                                                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                                    ${index === 0 ? 'bg-yellow-500 text-black' :
                                                        index === 1 ? 'bg-slate-300 text-black' :
                                                            index === 2 ? 'bg-amber-700 text-white' : 'bg-slate-700 text-slate-300'}
                                                `}>
                                                    {user.rank}
                                                </div>
                                                <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                                                    {user.name}
                                                </span>
                                            </div>
                                            <span className="font-bold text-white">{user.score}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* TEAM MANAGEMENT TAB */}
                <TabsContent value="team">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search members..." className="pl-9" />
                                </div>
                                <Button className="bg-blue-600 text-white">Invite Member</Button>
                            </div>

                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">John Doe</h4>
                                                <p className="text-sm text-muted-foreground">john@example.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-sm font-medium">142 Emails</p>
                                                <p className="text-xs text-muted-foreground">Last active: 2m ago</p>
                                            </div>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* BULK IMPORT TAB */}
                <TabsContent value="import">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bulk Import Leads</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-medium text-lg">Drop CSV file here</h3>
                                <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Or paste CSV data directly</Label>
                                <Textarea
                                    placeholder="Name, Email, Company, Phone&#10;John Doe, john@acme.com, Acme Corp, 555-0123"
                                    rows={8}
                                    className="font-mono text-sm"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button className="bg-blue-600 text-white">
                                    Process Import
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function MetricCard({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) {
    return (
        <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{title}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/50">
                    <Icon className="h-4 w-4 text-slate-400" />
                </div>
            </div>
            <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                        <defs>
                            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            fill={`url(#gradient-${title})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
