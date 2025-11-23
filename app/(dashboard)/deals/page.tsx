'use client'

import { useState, useEffect } from 'react'
import {
    Search,
    Phone,
    HelpCircle,
    Link as LinkIcon,
    Calendar,
    GitBranch,
    Users,
    ArrowUpDown,
    Settings,
    Plus
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'

// Mock Data matching the image structure
const initialStages = [
    { id: 'demo-completed', title: 'DEMO COMPLETED', count: 0, value: 0, color: 'bg-yellow-400' },
    { id: 'proposal-sent', title: 'PROPOSAL SENT', count: 0, value: 0, color: 'bg-yellow-400' },
    { id: 'contract-sent', title: 'CONTRACT SENT', count: 0, value: 0, color: 'bg-yellow-400' },
    { id: 'won', title: 'WON', count: 0, value: 0, color: 'bg-green-500' },
]

export default function DealsPage() {
    const [stages, setStages] = useState(initialStages)
    const [deals, setDeals] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        value: '',
        stage: 'demo-completed',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, stage: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsDialogOpen(false)
            // In a real app, we would refresh data here
            alert("Deal created! (Demo)")
        }, 1000)
    }

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Top Bar */}
            <div className="h-16 border-b flex items-center justify-between px-6 bg-white">
                <div className="flex items-center flex-1 max-w-xl">
                    <Search className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                        placeholder="Search..."
                        className="border-none shadow-none focus-visible:ring-0 bg-transparent placeholder:text-gray-400"
                    />
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                        <Phone className="h-4 w-4" />
                        <span className="text-xs">▼</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                        <HelpCircle className="h-4 w-4" />
                        <span className="text-xs">▼</span>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="px-6 py-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
                <div className="flex gap-2">
                    <LinkIcon className="h-4 w-4 text-gray-400 cursor-pointer" />
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Plus className="h-4 w-4 mr-1" /> Add Opportunity
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Opportunity</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Opportunity Name</Label>
                                    <Input id="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Acme Corp Deal" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="value">Value ($)</Label>
                                    <Input id="value" type="number" value={formData.value} onChange={handleInputChange} placeholder="0.00" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stage">Stage</Label>
                                    <Select value={formData.stage} onValueChange={handleSelectChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select stage" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {initialStages.map(stage => (
                                                <SelectItem key={stage.id} value={stage.id}>{stage.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creating...' : 'Create Opportunity'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="px-6 py-2 border-b flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <FilterItem icon={Calendar} label="Close date: All Time" />
                    <FilterItem icon={GitBranch} label="Sales" />
                    <FilterItem icon={Users} label="All Leads" />
                    <FilterItem icon={Users} label="All Users" />
                    <div className="flex items-center gap-2 ml-4">
                        <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-gray-500">Needs attention</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                        <ArrowUpDown className="h-3 w-3" />
                        <span>Actual Value (Annualized)</span>
                        <span className="text-xs">▼</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                        <Settings className="h-3 w-3" />
                        <span>Options</span>
                        <span className="text-xs">▼</span>
                    </div>
                </div>
            </div>

            {/* Pipeline Grid */}
            <div className="flex-1 overflow-x-auto">
                <div className="flex h-full min-w-max">
                    {stages.map((stage) => (
                        <div key={stage.id} className="w-80 border-r flex flex-col h-full bg-white">
                            {/* Column Header */}
                            <div className="p-3 border-b bg-white">
                                <div className="flex items-center justify-between mb-1">
                                    <Badge className={`${stage.color} text-black hover:${stage.color} text-[10px] font-bold px-2 py-0.5 rounded-sm border-none`}>
                                        {stage.title}
                                    </Badge>
                                </div>
                                <div className="text-xs text-gray-400 font-medium tracking-wide">
                                    {stage.count} OPPORTUNITIES
                                </div>
                            </div>
                            {/* Value Summary */}
                            <div className="px-3 py-2 bg-blue-50/30 border-b flex justify-between items-center text-xs font-semibold text-blue-600">
                                <span>ANNUALIZED VALUE</span>
                                <span>$0</span>
                            </div>

                            {/* Column Content */}
                            <div className="flex-1 p-2 bg-white relative">
                                {/* Empty State Illustration (Only shown if no deals) */}
                                {deals.length === 0 && stage.id === 'proposal-sent' && (
                                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] text-center pointer-events-none z-10">
                                        <div className="mb-6 flex justify-center">
                                            {/* Simplified Illustration Placeholder */}
                                            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="80" y="40" width="40" height="60" fill="#E2E8F0" rx="4" />
                                                <circle cx="100" cy="30" r="15" fill="#CBD5E1" />
                                                <path d="M100 100 L80 140 L120 140 Z" fill="#1E293B" />
                                                <rect x="110" y="90" width="20" height="15" fill="#7C3AED" rx="2" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">You don't have any Opportunities</h3>
                                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                            Opportunities help you keep track of deals.
                                            <br />
                                            When you create some, they'll show up here.
                                        </p>
                                        <Button variant="link" className="text-blue-600 hover:text-blue-700 pointer-events-auto">
                                            Learn about creating Opportunities ↗
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {/* Extra empty column space */}
                    <div className="flex-1 bg-gray-50/30 min-w-[200px]"></div>
                </div>
            </div>
        </div>
    )
}

function FilterItem({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 transition-colors">
            <Icon className="h-3.5 w-3.5" />
            <span className="font-medium">{label}</span>
            <span className="text-[10px] opacity-50">▼</span>
        </div>
    )
}
