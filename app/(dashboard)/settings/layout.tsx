'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const settingsNav = [
    {
        category: 'Account',
        items: [
            { name: 'Account', href: '/settings/account' },
            { name: 'Appearance', href: '/settings/appearance' },
            { name: 'Memberships', href: '/settings/memberships' },
        ]
    },
    {
        category: 'Organization',
        items: [
            { name: 'General', href: '/settings/general' },
            { name: 'Team Management', href: '/settings/team' },
            { name: 'Roles & Permissions', href: '/settings/roles' },
        ]
    },
    {
        category: 'Customization',
        items: [
            { name: 'Custom Activities', href: '/settings/custom-activities' },
            { name: 'Custom Fields', href: '/settings/custom-fields' },
            { name: 'Custom Objects', href: '/settings/custom-objects' },
            { name: 'Integration Links', href: '/settings/integration-links' },
            { name: 'Scheduling Links', href: '/settings/scheduling-links' },
            { name: 'Statuses & Pipelines', href: '/settings/statuses' },
            { name: 'AI Knowledge Sources', href: '/settings/ai-knowledge' },
        ]
    },
    {
        category: 'Communication',
        items: [
            { name: 'Phone & Voicemail', href: '/settings/phone' },
            { name: 'Dialer', href: '/settings/dialer' },
            { name: 'Outcomes', href: '/settings/outcomes' },
            { name: 'Notetaker', href: '/settings/notetaker', badge: 'BETA' },
            { name: 'Email', href: '/settings/email' },
            { name: 'Templates & Snippets', href: '/settings/templates' },
            { name: 'Send As', href: '/settings/send-as' },
            { name: 'Blackout Dates', href: '/settings/blackout-dates' },
        ]
    },
    {
        category: 'Connect',
        items: [
            { name: 'Integrations', href: '/settings/integrations' },
            { name: 'Accounts & Apps', href: '/settings/accounts' },
            { name: 'Developer', href: '/settings/developer' },
        ]
    },
    {
        category: 'Billing',
        items: [
            { name: 'Plan', href: '/settings/plan' },
            { name: 'Usage', href: '/settings/usage' },
        ]
    }
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="flex h-full bg-white">
            {/* Secondary Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-gray-50/50 overflow-y-auto py-6 px-4">
                <div className="space-y-8">
                    {settingsNav.map((section) => (
                        <div key={section.category}>
                            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 px-2">
                                {section.category}
                            </h3>
                            <div className="space-y-0.5">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href || (item.name === 'Memberships' && pathname === '/settings')
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-colors",
                                                isActive
                                                    ? "bg-blue-50 text-blue-600 font-medium"
                                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                            )}
                                        >
                                            <span>{item.name}</span>
                                            {item.badge && (
                                                <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Settings Content */}
            <main className="flex-1 overflow-y-auto bg-white">
                {children}
            </main>
        </div>
    )
}
