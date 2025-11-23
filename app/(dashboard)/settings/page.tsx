'use client'

import { Info } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function SettingsPage() {
    return (
        <div className="p-8 max-w-5xl">
            <div className="flex items-center gap-2 mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Memberships</h1>
                <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-gray-900">Organization</th>
                            <th className="px-6 py-3 font-semibold text-gray-900">Your Role</th>
                            <th className="px-6 py-3 font-semibold text-gray-900">Users</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">tilt media</td>
                            <td className="px-6 py-4 text-gray-600">Admin</td>
                            <td className="px-6 py-4 text-gray-600">1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
