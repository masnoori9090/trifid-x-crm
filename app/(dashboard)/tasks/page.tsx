'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Calendar, User, AlertCircle } from 'lucide-react'

export default function TasksPage() {
    const [activeTab, setActiveTab] = useState('all')

    const tasks = [
        { id: 1, title: 'Follow up with Acme Corp', description: 'Send proposal follow-up email', dueDate: 'Today, 2:00 PM', priority: 'high', status: 'TODO', contact: 'John Smith', assignedTo: 'You' },
        { id: 2, title: 'Prepare demo for Tech Solutions', description: 'Create custom demo presentation', dueDate: 'Today, 4:00 PM', priority: 'high', status: 'IN_PROGRESS', contact: 'Sarah Johnson', assignedTo: 'You' },
        { id: 3, title: 'Contract review', description: 'Review and finalize contract terms', dueDate: 'Tomorrow, 10:00 AM', priority: 'medium', status: 'TODO', contact: 'Mike Brown', assignedTo: 'You' },
        { id: 4, title: 'Schedule meeting with Global Inc', description: 'Set up discovery call', dueDate: 'Tomorrow, 3:00 PM', priority: 'medium', status: 'TODO', contact: 'Mike Brown', assignedTo: 'You' },
        { id: 5, title: 'Send pricing to Startup XYZ', description: 'Prepare and send custom pricing', dueDate: 'Dec 5, 2024', priority: 'low', status: 'TODO', contact: 'Emily Davis', assignedTo: 'You' },
        { id: 6, title: 'Update CRM records', description: 'Add notes from last week\'s calls', dueDate: 'Dec 8, 2024', priority: 'low', status: 'DONE', contact: null, assignedTo: 'You' },
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'destructive'
            case 'medium': return 'warning'
            case 'low': return 'secondary'
            default: return 'default'
        }
    }

    const filteredTasks = activeTab === 'all'
        ? tasks
        : activeTab === 'my-tasks'
            ? tasks.filter(t => t.assignedTo === 'You')
            : activeTab === 'overdue'
                ? tasks.filter(t => t.dueDate.includes('Today') && t.status !== 'DONE')
                : tasks.filter(t => t.status === activeTab.toUpperCase())

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Tasks</h1>
                    <p className="text-muted-foreground mt-1">Manage your to-dos and reminders</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gradient-primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Task</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input placeholder="Task title" />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea placeholder="Task description..." rows={3} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Priority</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Due Date</Label>
                                    <Input type="datetime-local" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Related Contact</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select contact (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">John Smith - Acme Corp</SelectItem>
                                        <SelectItem value="2">Sarah Johnson - Tech Solutions</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full gradient-primary">Create Task</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                    <TabsTrigger value="done">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                    <div className="space-y-3">
                        {filteredTasks.map((task) => (
                            <Card key={task.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                        <Checkbox
                                            checked={task.status === 'DONE'}
                                            className="mt-1"
                                        />

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className={`font-semibold ${task.status === 'DONE' ? 'line-through text-muted-foreground' : ''}`}>
                                                            {task.title}
                                                        </h3>
                                                        <Badge variant={getPriorityColor(task.priority) as any}>
                                                            {task.priority}
                                                        </Badge>
                                                        {task.status === 'IN_PROGRESS' && (
                                                            <Badge variant="default">In Progress</Badge>
                                                        )}
                                                    </div>
                                                    {task.description && (
                                                        <p className="text-sm text-muted-foreground">{task.description}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                                {task.dueDate && (
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        <span className={task.dueDate.includes('Today') && task.status !== 'DONE' ? 'text-orange-500 font-medium' : ''}>
                                                            {task.dueDate}
                                                        </span>
                                                    </div>
                                                )}
                                                {task.contact && (
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        <span>{task.contact}</span>
                                                    </div>
                                                )}
                                                {task.dueDate.includes('Today') && task.status !== 'DONE' && (
                                                    <div className="flex items-center gap-1 text-orange-500">
                                                        <AlertCircle className="h-4 w-4" />
                                                        <span className="font-medium">Due today</span>
                                                    </div>
                                                )}
                                            </div>
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
