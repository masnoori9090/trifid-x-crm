'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Calendar, User, AlertCircle, CheckCircle2, Clock, Phone, Mail, ArrowRight, Loader2 } from 'lucide-react'
import { formatRelativeDate } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Task {
    id: string
    title: string
    description: string
    dueDate: string
    priority: string
    status: string
    contact?: { firstName: string; lastName: string; company: string }
    deal?: { title: string }
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        dueDate: '',
        contactId: ''
    })

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/v1/tasks')
            if (response.ok) {
                const data = await response.json()
                setTasks(data)
                if (data.length > 0 && !selectedTaskId) {
                    setSelectedTaskId(data[0].id)
                }
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, priority: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/v1/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setIsDialogOpen(false)
                setFormData({
                    title: '',
                    description: '',
                    priority: 'MEDIUM',
                    dueDate: '',
                    contactId: ''
                })
                fetchTasks()
            }
        } catch (error) {
            console.error('Error creating task:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE'

        // Optimistic update
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))

        try {
            await fetch('/api/v1/tasks', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: taskId, status: newStatus })
            })
        } catch (error) {
            console.error('Failed to update task:', error)
            fetchTasks() // Revert on error
        }
    }

    const selectedTask = tasks.find(t => t.id === selectedTaskId)

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH': return 'destructive'
            case 'MEDIUM': return 'warning'
            case 'LOW': return 'secondary'
            default: return 'default'
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    }

    const todoTasks = tasks.filter(t => t.status !== 'DONE')
    const doneTasks = tasks.filter(t => t.status === 'DONE')

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Inbox</h1>
                    <p className="text-muted-foreground mt-1">
                        You have <span className="text-primary font-bold">{todoTasks.length}</span> tasks to complete.
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Task</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={formData.title} onChange={handleInputChange} placeholder="Follow up with..." required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={formData.description} onChange={handleInputChange} placeholder="Task details..." rows={3} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={formData.priority} onValueChange={handleSelectChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LOW">Low</SelectItem>
                                            <SelectItem value="MEDIUM">Medium</SelectItem>
                                            <SelectItem value="HIGH">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dueDate">Due Date</Label>
                                    <Input id="dueDate" type="datetime-local" value={formData.dueDate} onChange={handleInputChange} />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                                {isSubmitting ? 'Creating...' : 'Create Task'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Task List (Left Pane) */}
                <div className="w-1/3 flex flex-col bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-4 border-b bg-slate-50">
                        <div className="relative">
                            <Input placeholder="Search tasks..." className="pl-9 bg-white" />
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {todoTasks.length === 0 && doneTasks.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                No tasks found.
                            </div>
                        ) : (
                            <div className="divide-y">
                                {todoTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        onClick={() => setSelectedTaskId(task.id)}
                                        className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${selectedTaskId === task.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'border-l-4 border-transparent'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                checked={false}
                                                onCheckedChange={() => toggleTaskStatus(task.id, task.status)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="mt-1"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-sm truncate">{task.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant={getPriorityColor(task.priority) as any} className="text-[10px] px-1 py-0 h-5">
                                                        {task.priority}
                                                    </Badge>
                                                    {task.dueDate && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(task.dueDate).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {doneTasks.length > 0 && (
                                    <div className="p-4 bg-slate-50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Completed
                                    </div>
                                )}
                                {doneTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        onClick={() => setSelectedTaskId(task.id)}
                                        className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors opacity-60 ${selectedTaskId === task.id ? 'bg-slate-100' : ''}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                checked={true}
                                                onCheckedChange={() => toggleTaskStatus(task.id, task.status)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="mt-1"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-sm truncate line-through">{task.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Task Details (Right Pane) */}
                <div className="flex-1 bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
                    {selectedTask ? (
                        <>
                            <div className="p-6 border-b flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge variant={getPriorityColor(selectedTask.priority) as any}>
                                            {selectedTask.priority} Priority
                                        </Badge>
                                        {selectedTask.status === 'DONE' && (
                                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                                                Completed
                                            </Badge>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
                                </div>
                                <Button
                                    variant={selectedTask.status === 'DONE' ? 'outline' : 'default'}
                                    className={selectedTask.status === 'DONE' ? '' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                                    onClick={() => toggleTaskStatus(selectedTask.id, selectedTask.status)}
                                >
                                    {selectedTask.status === 'DONE' ? 'Mark as Undone' : 'Mark Complete'}
                                </Button>
                            </div>

                            <div className="flex-1 p-6 overflow-y-auto">
                                <div className="grid grid-cols-3 gap-8">
                                    <div className="col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                                            <p className="text-sm leading-relaxed">
                                                {selectedTask.description || 'No description provided.'}
                                            </p>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="p-4 bg-slate-50 rounded-lg border">
                                            <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                                            <div className="flex gap-3">
                                                <Button variant="outline" className="flex-1 bg-white">
                                                    <Phone className="mr-2 h-4 w-4" />
                                                    Call Contact
                                                </Button>
                                                <Button variant="outline" className="flex-1 bg-white">
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Email Contact
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-4 rounded-lg border bg-slate-50">
                                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                                Details
                                            </h3>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span>{selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : 'No due date'}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span>{selectedTask.contact ? `${selectedTask.contact.firstName} ${selectedTask.contact.lastName}` : 'No contact'}</span>
                                                </div>
                                                {selectedTask.contact?.company && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-4 w-4 flex items-center justify-center text-xs font-bold text-muted-foreground">C</span>
                                                        <span>{selectedTask.contact.company}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                            <CheckCircle2 className="h-12 w-12 mb-4 opacity-20" />
                            <p>Select a task to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
