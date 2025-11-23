'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Inbox,
    Trophy,
    Users,
    List,
    Workflow,
    MessageSquare,
    Activity,
    BarChart3,
    Settings,
    HelpCircle,
    Zap,
    ChevronLeft,
    Globe
} from 'lucide-react'

const navigation = [
    { name: 'Getting Started', href: '/getting-started', icon: Globe },
    { name: 'Inbox', href: '/tasks', icon: Inbox },
    { name: 'Opportunities', href: '/deals', icon: Trophy, active: true }, // Highlighted in image
    { name: 'Leads', href: '/leads', icon: List },
    { name: 'Contacts', href: '/contacts', icon: Users },
    { name: 'Workflows', href: '/workflows', icon: Workflow },
    { name: 'Conversations', href: '/conversations', icon: MessageSquare },
    { name: 'Activities', href: '/activities', icon: Activity },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
]

const bottomNavigation = [
    { name: 'Support & FAQs', href: '/support', icon: HelpCircle },
    { name: 'Integrations', href: '/integrations', icon: Zap },
    { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-60 flex-col bg-[#151920] text-[#9ea5b0] border-r border-[#2b313b] text-sm">
            {/* User Profile Dropdown */}
            <div className="h-14 flex items-center px-4 border-b border-[#2b313b] hover:bg-[#1e232d] cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xs">
                        MP
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate text-sm">Mohammad PayPal</p>
                        <p className="text-xs text-muted-foreground truncate">tilt media</p>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <div className="space-y-0.5 px-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (item.name === 'Opportunities' && pathname === '/deals')
                        return (
                            <div key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-md transition-colors group',
                                        isActive
                                            ? 'bg-[#2b313b] text-white'
                                            : 'hover:bg-[#1e232d] hover:text-white'
                                    )}
                                >
                                    <item.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-[#9ea5b0] group-hover:text-white")} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                                {/* Sub-menu for Opportunities (as seen in image) */}
                                {item.name === 'Opportunities' && isActive && (
                                    <div className="ml-9 mt-1 space-y-1">
                                        <Link href="/deals" className="block text-white font-medium py-1">Pipeline</Link>
                                        <Link href="/deals/list" className="block text-[#9ea5b0] hover:text-white py-1">List</Link>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Smart Views Section */}
                <div className="mt-8 px-5">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#5f6774] mb-3">
                        <span>Smart Views</span>
                        <List className="h-3 w-3 cursor-pointer hover:text-white" />
                    </div>
                    <p className="text-xs text-[#5f6774] leading-relaxed">
                        Smart Views are saved searches that dynamically return matching Leads or Contacts based on your filter criteria.
                    </p>
                    <Link href="#" className="text-xs text-[#5f6774] underline mt-2 block hover:text-white">Learn more</Link>
                </div>
            </nav>

            {/* Bottom Navigation */}
            <div className="p-2 border-t border-[#2b313b] space-y-0.5">
                {bottomNavigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1e232d] hover:text-white transition-colors"
                    >
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1e232d] hover:text-white transition-colors text-[#9ea5b0]">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="font-medium">Collapse</span>
                </button>
            </div>
        </div>
    )
}
