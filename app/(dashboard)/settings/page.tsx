'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { User, Bell, Shield, Palette, Mail, Key } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { getInitials } from '@/lib/utils'

export default function SettingsPage() {
    const { data: session } = useSession()
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [pushNotifications, setPushNotifications] = useState(true)
    const [marketingEmails, setMarketingEmails] = useState(false)

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information and profile details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                        {session?.user?.name ? getInitials(session.user.name) : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="outline">Change Avatar</Button>
                                    <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue={session?.user?.name || ''} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={session?.user?.email || ''} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" placeholder="+1 234 567 8900" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input id="role" defaultValue={session?.user?.role || ''} disabled />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" placeholder="Brief description about yourself" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select defaultValue="utc">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                                        <SelectItem value="est">EST (GMT-5)</SelectItem>
                                        <SelectItem value="pst">PST (GMT-8)</SelectItem>
                                        <SelectItem value="gst">GST (GMT+4)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-3">
                                <Button className="gradient-primary">Save Changes</Button>
                                <Button variant="outline">Cancel</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your account preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Account Status</Label>
                                        <p className="text-sm text-muted-foreground">Your account is active</p>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">Active</span>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Language</Label>
                                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                                    </div>
                                    <Select defaultValue="en">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="de">Deutsch</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Date Format</Label>
                                        <p className="text-sm text-muted-foreground">Choose how dates are displayed</p>
                                    </div>
                                    <Select defaultValue="mdy">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-red-600">Danger Zone</CardTitle>
                            <CardDescription>Irreversible account actions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                                <div>
                                    <p className="font-medium">Delete Account</p>
                                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                                </div>
                                <Button variant="destructive">Delete Account</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Manage how you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                    </div>
                                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                                    </div>
                                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Marketing Emails</Label>
                                        <p className="text-sm text-muted-foreground">Receive product updates and offers</p>
                                    </div>
                                    <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Email Preferences</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="new-deals" defaultChecked className="rounded" />
                                        <Label htmlFor="new-deals" className="text-sm font-normal cursor-pointer">
                                            New deals assigned to me
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="task-reminders" defaultChecked className="rounded" />
                                        <Label htmlFor="task-reminders" className="text-sm font-normal cursor-pointer">
                                            Task reminders and deadlines
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="activity-updates" defaultChecked className="rounded" />
                                        <Label htmlFor="activity-updates" className="text-sm font-normal cursor-pointer">
                                            Activity updates from contacts
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="weekly-summary" className="rounded" />
                                        <Label htmlFor="weekly-summary" className="text-sm font-normal cursor-pointer">
                                            Weekly performance summary
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <Button className="gradient-primary">Save Preferences</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance Settings</CardTitle>
                            <CardDescription>Customize how Trifid X looks</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Theme</Label>
                                <p className="text-sm text-muted-foreground mb-4">Select your preferred theme</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="cursor-pointer border-2 border-primary rounded-lg p-4 bg-white">
                                        <div className="aspect-video bg-gradient-to-br from-purple-100 to-white rounded mb-2"></div>
                                        <p className="text-sm font-medium text-center">Light</p>
                                    </div>
                                    <div className="cursor-pointer border-2 border-border rounded-lg p-4 bg-gray-50 opacity-50">
                                        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                                        <p className="text-sm font-medium text-center">Dark</p>
                                    </div>
                                    <div className="cursor-pointer border-2 border-border rounded-lg p-4 bg-gray-50 opacity-50">
                                        <div className="aspect-video bg-gradient-to-br from-blue-800 to-purple-800 rounded mb-2"></div>
                                        <p className="text-sm font-medium text-center">Auto</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label>Accent Color</Label>
                                <p className="text-sm text-muted-foreground mb-4">Choose your accent color</p>
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 border-2 border-purple-600 cursor-pointer"></div>
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-transparent hover:border-blue-600 cursor-pointer"></div>
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 border-2 border-transparent hover:border-green-600 cursor-pointer"></div>
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 border-2 border-transparent hover:border-red-600 cursor-pointer"></div>
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 border-2 border-transparent hover:border-orange-600 cursor-pointer"></div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Compact Mode</Label>
                                        <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Animations</Label>
                                        <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password & Security</CardTitle>
                            <CardDescription>Manage your password and security settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                            </div>

                            <Button className="gradient-primary">Update Password</Button>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Two-Factor Authentication</h4>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Authenticator App</p>
                                        <p className="text-sm text-muted-foreground">Use an app to generate codes</p>
                                    </div>
                                    <Button variant="outline">Enable</Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Active Sessions</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 border rounded-lg bg-purple-50">
                                        <div>
                                            <p className="font-medium">Current Session</p>
                                            <p className="text-sm text-muted-foreground">Chrome on macOS - San Francisco, US</p>
                                        </div>
                                        <span className="text-xs text-green-600 font-medium">Active now</span>
                                    </div>
                                </div>
                                <Button variant="outline">Sign Out All Other Sessions</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
