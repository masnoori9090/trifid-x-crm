'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Plus, MoreVertical, DollarSign, Calendar, User, Loader2 } from 'lucide-react'
import { formatCurrency, getInitials } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useRouter } from 'next/navigation'

interface Deal {
    id: string
    title: string
    value: number
    contactId: string
    contact?: { firstName: string; lastName: string; company: string }
    stage: string
    probability: number
    ownerId: string
    owner?: { name: string }
    expectedCloseDate: string
}

function DealCard({ deal }: { deal: Deal }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: deal.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    const contactName = deal.contact ? `${deal.contact.firstName} ${deal.contact.lastName}` : 'Unknown Contact'
    const companyName = deal.contact?.company || 'Unknown Company'
    const ownerName = deal.owner?.name || 'Unknown'

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="mb-3"
        >
            <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h4 className="font-semibold mb-1">{deal.title}</h4>
                            <p className="text-sm text-muted-foreground">{companyName}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{formatCurrency(deal.value)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{contactName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getInitials(ownerName)}
                            </AvatarFallback>
                        </Avatar>
                        <Badge variant="outline" className="text-xs">
                            {deal.probability}%
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function PipelineColumn({ stage, deals }: { stage: string; deals: Deal[] }) {
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)

    return (
        <div className="flex flex-col h-full">
            <div className="mb-4 sticky top-0 bg-background z-10">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{stage}</h3>
                    <Badge variant="secondary">{deals.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{formatCurrency(totalValue)}</p>
            </div>

            <SortableContext items={deals.map(d => d.id)} strategy={verticalListSortingStrategy}>
                <div className="flex-1 overflow-y-auto space-y-3 min-h-[100px]">
                    {deals.map((deal) => (
                        <DealCard key={deal.id} deal={deal} />
                    ))}
                </div>
            </SortableContext>
        </div>
    )
}

export default function DealsPage() {
    const stages = ['Qualification', 'Proposal', 'Negotiation', 'Closing']
    const [deals, setDeals] = useState<Deal[]>([])
    const [loading, setLoading] = useState(true)
    const [activeId, setActiveId] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        value: '',
        stage: 'Qualification',
        probability: '20',
        expectedCloseDate: '',
        contactId: '' // In a real app, this would be a select dropdown of contacts
    })

    const fetchDeals = async () => {
        try {
            const response = await fetch('/api/v1/deals')
            if (response.ok) {
                const data = await response.json()
                setDeals(data)
            }
        } catch (error) {
            console.error('Failed to fetch deals:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDeals()
    }, [])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = async (event: any) => {
        const { active, over } = event

        if (!over) {
            setActiveId(null)
            return
        }

        const activeDeal = deals.find(d => d.id === active.id)
        if (!activeDeal) return

        // Determine target stage
        // If dropped on a container (stage name), use that
        // If dropped on another card, find that card's stage
        let targetStage = ''

        if (stages.includes(over.id)) {
            targetStage = over.id
        } else {
            const overDeal = deals.find(d => d.id === over.id)
            if (overDeal) {
                targetStage = overDeal.stage
            }
        }

        if (targetStage && activeDeal.stage !== targetStage) {
            // Optimistic update
            const oldStage = activeDeal.stage
            setDeals(deals.map(d =>
                d.id === active.id ? { ...d, stage: targetStage } : d
            ))

            // API call
            try {
                const response = await fetch('/api/v1/deals', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: active.id,
                        stage: targetStage
                    })
                })

                if (!response.ok) {
                    // Revert if failed
                    setDeals(deals.map(d =>
                        d.id === active.id ? { ...d, stage: oldStage } : d
                    ))
                    alert('Failed to update deal stage')
                }
            } catch (error) {
                console.error('Failed to update deal:', error)
                // Revert
                setDeals(deals.map(d =>
                    d.id === active.id ? { ...d, stage: oldStage } : d
                ))
            }
        }

        setActiveId(null)
    }

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

        try {
            // Note: In a real app, we'd need a valid contactId. 
            // For this demo, we'll try to use the first contact if available, or fail gracefully.
            // This is a simplification.

            const response = await fetch('/api/v1/deals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    value: parseFloat(formData.value),
                    probability: parseInt(formData.probability),
                    // For demo purposes, we might need to fetch a contact ID first if not provided
                    // This part depends on how strict the API validation is
                })
            })

            if (response.ok) {
                setIsDialogOpen(false)
                setFormData({
                    title: '',
                    value: '',
                    stage: 'Qualification',
                    probability: '20',
                    expectedCloseDate: '',
                    contactId: ''
                })
                fetchDeals()
                router.refresh()
            } else {
                alert('Failed to create deal. Ensure you have contacts created first.')
            }
        } catch (error) {
            console.error('Error creating deal:', error)
            alert('An error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    const getDealsByStage = (stage: string) => {
        return deals.filter(deal => deal.stage === stage)
    }

    return (
        <div className="space-y-6 animate-fade-in h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Sales Pipeline</h1>
                    <p className="text-muted-foreground mt-1">Drag and drop deals between stages</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gradient-primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Deal
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add New Deal</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Deal Title</Label>
                                <Input id="title" value={formData.title} onChange={handleInputChange} placeholder="Enterprise License" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="value">Value ($)</Label>
                                    <Input id="value" type="number" value={formData.value} onChange={handleInputChange} placeholder="10000" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="probability">Probability (%)</Label>
                                    <Input id="probability" type="number" value={formData.probability} onChange={handleInputChange} placeholder="50" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stage">Stage</Label>
                                <Select value={formData.stage} onValueChange={handleSelectChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select stage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {stages.map(stage => (
                                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
                                <Input id="expectedCloseDate" type="date" value={formData.expectedCloseDate} onChange={handleInputChange} required />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="submit" className="flex-1 gradient-primary" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {isSubmitting ? 'Creating...' : 'Create Deal'}
                                </Button>
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Pipeline Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                {stages.map((stage) => {
                    const stageDeals = getDealsByStage(stage)
                    const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)

                    return (
                        <Card key={stage}>
                            <CardContent className="p-4">
                                <p className="text-sm font-medium text-muted-foreground mb-1">{stage}</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                                <p className="text-xs text-muted-foreground mt-1">{stageDeals.length} deals</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Pipeline Board */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="flex-1 overflow-hidden">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="grid grid-cols-4 gap-4 h-full pb-6">
                            {stages.map((stage) => (
                                <Card key={stage} className="flex flex-col h-full overflow-hidden bg-muted/30 border-dashed">
                                    <CardContent className="p-4 flex-1 overflow-y-auto">
                                        <PipelineColumn
                                            stage={stage}
                                            deals={getDealsByStage(stage)}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <DragOverlay>
                            {activeId ? (
                                <div className="opacity-50 rotate-3 scale-105 cursor-grabbing">
                                    <DealCard deal={deals.find(d => d.id === activeId)!} />
                                </div>
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            )}
        </div>
    )
}
