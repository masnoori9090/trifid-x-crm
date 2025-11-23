'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Plus, Search, Filter, Mail, Phone, Building2, MoreVertical } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getInitials } from '@/lib/utils'

export default function ContactsPage() {
    const [searchTerm, setSearchTerm] = useState('')

    // Mock contacts data
    const contacts = [
        { id: 1, name: 'John Smith', email: 'john@acmecorp.com', phone: '+1 234 567 8900', company: 'Acme Corp', position: 'CEO', status: 'CUSTOMER', lastContact: '2 days ago' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@techsolutions.com', phone: '+1 234 567 8901', company: 'Tech Solutions', position: 'CTO', status: 'PROSPECT', lastContact: '1 hour ago' },
        { id: 3, name: 'Mike Brown', email: 'mike@globalinc.com', phone: '+1 234 567 8902', company: 'Global Inc', position: 'VP Sales', status: 'LEAD', lastContact: '3 hours ago' },
        { id: 4, name: 'Emily Davis', email: 'emily@startupxyz.com', phone: '+1 234 567 8903', company: 'Startup XYZ', position: 'Founder', status: 'CUSTOMER', lastContact: '5 hours ago' },
        { id: 5, name: 'Robert Wilson', email: 'robert@enterprise.com', phone: '+1 234 567 8904', company: 'Enterprise Co', position: 'Director', status: 'PROSPECT', lastContact: '1 day ago' },
        { id: 6, name: 'Lisa Anderson', email: 'lisa@innovations.com', phone: '+1 234 567 8905', company: 'Innovations Ltd', position: 'Manager', status: 'LEAD', lastContact: '3 days ago' },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CUSTOMER': return 'success'
            case 'PROSPECT': return 'warning'
            case 'LEAD': return 'default'
            default: return 'secondary'
        }
    }

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Contacts</h1>
                    <p className="text-muted-foreground mt-1">Manage your leads and customers</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gradient-primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Contact
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add New Contact</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Smith" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" placeholder="+1 234 567 8900" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" placeholder="Acme Corp" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input id="position" placeholder="CEO" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LEAD">Lead</SelectItem>
                                        <SelectItem value="PROSPECT">Prospect</SelectItem>
                                        <SelectItem value="CUSTOMER">Customer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button type="submit" className="flex-1 gradient-primary">Create Contact</Button>
                                <Button type="button" variant="outline" className="flex-1">Cancel</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* Contacts Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContacts.map((contact) => (
                    <Card key={contact.id} className="hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            {getInitials(contact.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{contact.name}</h3>
                                        <p className="text-sm text-muted-foreground">{contact.position}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
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

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Building2 className="h-4 w-4" />
                                    <span>{contact.company}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span className="truncate">{contact.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{contact.phone}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <Badge variant={getStatusColor(contact.status) as any}>
                                    {contact.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">Last contact: {contact.lastContact}</span>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Mail className="mr-2 h-3 w-3" />
                                    Email
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Phone className="mr-2 h-3 w-3" />
                                    Call
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
