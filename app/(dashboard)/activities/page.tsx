'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, MessageSquare, FileText, Plus, Calendar } from 'lucide-react'

export default function ActivitiesPage() {
    const [activeTab, setActiveTab] = useState('all')

    const activities = [
        { id: 1, type: 'email', subject: 'Proposal Follow-up', contact: 'John Smith', company: 'Acme Corp', time: '2 hours ago', content: 'Sent product proposal and pricing details' },
        { id: 2, type: 'call', subject: 'Discovery Call', contact: 'Sarah Johnson', company: 'Tech Solutions', time: '4 hours ago', duration: '45 min', outcome: 'Connected', content: 'Discussed requirements and pain points' },
        { id: 3, type: 'sms', subject: 'Quick Check-in', contact: 'Mike Brown', company: 'Global Inc', time: '1 day ago', content: 'Confirming meeting for tomorrow' },
        { id: 4, type: 'note', subject: 'Meeting Notes', contact: 'Emily Davis', company: 'Startup XYZ', time: '2 days ago', content: 'Client showed strong interest in enterprise plan. Next step: technical demo.' },
        { id: 5, type: 'email', subject: 'Contract Sent', contact: 'Robert Wilson', company: 'Enterprise Co', time: '3 days ago', content: 'Sent final contract for review' },
        { id: 6, type: 'call', subject: 'Follow-up Call', contact: 'Lisa Anderson', company: 'Innovations Ltd', time: '4 days ago', duration: '20 min', outcome: 'Voicemail', content: 'Left message about proposal' },
    ]

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'email': return <Mail className="h-5 w-5 text-blue-500" />
            case 'call': return <Phone className="h-5 w-5 text-green-500" />
            case 'sms': return <MessageSquare className="h-5 w-5 text-purple-500" />
            case 'note': return <FileText className="h-5 w-5 text-orange-500" />
            default: return null
        }
    }

    const getActivityTypeLabel = (type: string) => {
        return type.charAt(0).toUpperCase() + type.slice(1)
    }

    const filteredActivities = activeTab === 'all'
        ? activities
        : activities.filter(a => a.type === activeTab)

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Activities</h1>
                    <p className="text-muted-foreground mt-1">Track all your communications and interactions</p>
                </div>
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Mail className="mr-2 h-4 w-4" />
                                New Email
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Compose Email</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label>To</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select contact" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">John Smith - Acme Corp</SelectItem>
                                            <SelectItem value="2">Sarah Johnson - Tech Solutions</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Subject</Label>
                                    <Input placeholder="Email subject" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Message</Label>
                                    <Textarea placeholder="Type your message..." rows={8} />
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" className="gradient-primary flex-1">Send Email</Button>
                                    <Button type="button" variant="outline">Save Draft</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Phone className="mr-2 h-4 w-4" />
                                Log Call
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Log Call</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label>Contact</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select contact" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">John Smith - Acme Corp</SelectItem>
                                            <SelectItem value="2">Sarah Johnson - Tech Solutions</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Outcome</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select outcome" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="connected">Connected</SelectItem>
                                            <SelectItem value="voicemail">Voicemail</SelectItem>
                                            <SelectItem value="no-answer">No Answer</SelectItem>
                                            <SelectItem value="busy">Busy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Duration (minutes)</Label>
                                        <Input type="number" placeholder="30" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date & Time</Label>
                                        <Input type="datetime-local" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Notes</Label>
                                    <Textarea placeholder="Call notes..." rows={4} />
                                </div>
                                <Button type="submit" className="w-full gradient-primary">Save Call</Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="gradient-primary">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Note
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Note</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label>Contact</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select contact" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">John Smith - Acme Corp</SelectItem>
                                            <SelectItem value="2">Sarah Johnson - Tech Solutions</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Subject</Label>
                                    <Input placeholder="Note subject" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Content</Label>
                                    <Textarea placeholder="Type your note..." rows={6} />
                                </div>
                                <Button type="submit" className="w-full gradient-primary">Save Note</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All Activities</TabsTrigger>
                    <TabsTrigger value="email">Emails</TabsTrigger>
                    <TabsTrigger value="call">Calls</TabsTrigger>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                    <TabsTrigger value="note">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                    <div className="space-y-4">
                        {filteredActivities.map((activity) => (
                            <Card key={activity.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="p-3 bg-muted rounded-lg">
                                                {getActivityIcon(activity.type)}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold">{activity.subject}</h3>
                                                        <Badge variant="outline">{getActivityTypeLabel(activity.type)}</Badge>
                                                        {activity.outcome && (
                                                            <Badge variant={activity.outcome === 'Connected' ? 'success' : 'secondary'}>
                                                                {activity.outcome}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {activity.contact} • {activity.company}
                                                    </p>
                                                </div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                    {activity.duration && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {activity.duration}
                                                        </span>
                                                    )}
                                                    <span>{activity.time}</span>
                                                </div>
                                            </div>

                                            <p className="text-sm mt-2">{activity.content}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
