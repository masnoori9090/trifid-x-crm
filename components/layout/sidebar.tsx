'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Users,
    Target,
    MessageSquare,
    CheckSquare,
    BarChart3,
    Settings,
    Zap
} from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Contacts', href: '/contacts', icon: Users },
    { name: 'Deals', href: '/deals', icon: Target },
    { name: 'Activities', href: '/activities', icon: MessageSquare },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Integrations', href: '/integrations', icon: Zap },
    { name: 'Admin', href: '/admin', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col bg-[#1e293b] text-white border-r border-slate-700">
            <div className="flex h-16 items-center px-6 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white p-1.5 rounded-md">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight">Trifid X</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all',
                                isActive
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800/50">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
                        ME
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">My Account</p>
                        <p className="text-xs text-slate-400 truncate">Pro Plan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
