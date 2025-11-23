'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Plus, MoreVertical, DollarSign, Calendar, User } from 'lucide-react'
import { formatCurrency, getInitials } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Deal {
    id: string
    title: string
    value: number
    contact: string
    company: string
    stage: string
    probability: number
    owner: string
    closeDate: string
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
                            <p className="text-sm text-muted-foreground">{deal.company}</p>
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
                            <span>{deal.contact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{deal.closeDate}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getInitials(deal.owner)}
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
                <div className="flex-1 overflow-y-auto space-y-3">
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

    const [deals, setDeals] = useState<Deal[]>([
        { id: '1', title: 'Enterprise Solution', value: 125000, contact: 'John Smith', company: 'Acme Corp', stage: 'Qualification', probability: 25, owner: 'You', closeDate: 'Dec 15, 2024' },
        { id: '2', title: 'SaaS Package', value: 45000, contact: 'Sarah Johnson', company: 'Tech Solutions', stage: 'Qualification', probability: 30, owner: 'You', closeDate: 'Dec 20, 2024' },
        { id: '3', title: 'Consulting Services', value: 75000, contact: 'Mike Brown', company: 'Global Inc', stage: 'Proposal', probability: 50, owner: 'You', closeDate: 'Dec 10, 2024' },
        { id: '4', title: 'Platform Migration', value: 98000, contact: 'Emily Davis', company: 'Startup XYZ', stage: 'Proposal', probability: 60, owner: 'You', closeDate: 'Dec 18, 2024' },
        { id: '5', title: 'Custom Development', value: 150000, contact: 'Robert Wilson', company: 'Enterprise Co', stage: 'Negotiation', probability: 75, owner: 'You', closeDate: 'Dec 8, 2024' },
        { id: '6', title: 'Integration Project', value: 62000, contact: 'Lisa Anderson', company: 'Innovations Ltd', stage: 'Closing', probability: 90, owner: 'You', closeDate: 'Dec 5, 2024' },
    ])

    const [activeId, setActiveId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event

        if (!over) {
            setActiveId(null)
            return
        }

        const activeDeal = deals.find(d => d.id === active.id)
        if (!activeDeal) return

        // Check if dropped on a different stage column
        const overStage = stages.find(stage => {
            const stageDeals = deals.filter(d => d.stage === stage)
            return stageDeals.some(d => d.id === over.id) || over.id === stage
        })

        if (overStage && activeDeal.stage !== overStage) {
            setDeals(deals.map(d =>
                d.id === active.id ? { ...d, stage: overStage } : d
            ))
        }

        setActiveId(null)
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
                <Button className="gradient-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Deal
                </Button>
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
            <div className="flex-1 overflow-hidden">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="grid grid-cols-4 gap-4 h-full pb-6">
                        {stages.map((stage) => (
                            <Card key={stage} className="flex flex-col h-full overflow-hidden">
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
                            <div className="opacity-50">
                                <DealCard deal={deals.find(d => d.id === activeId)!} />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    )
}
