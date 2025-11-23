'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, DollarSign, Zap, BarChart3, Database, Key, Copy, CheckCircle2, ExternalLink } from 'lucide-react'

export default function IntegrationsPage() {
    const [apiKeyCopied, setApiKeyCopied] = useState(false)
    const apiKey = 'trifidx_live_sk_1234567890abcdef' // This would come from database

    const integrations = [
        {
            id: 'outlook',
            name: 'Microsoft Outlook',
            description: 'Sync emails, calendar events, and contacts with Outlook',
            icon: Mail,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            connected: false,
            features: ['Email sync', 'Calendar integration', 'Contact sync'],
        },
        {
            id: 'quickbooks',
            name: 'QuickBooks',
            description: 'Sync invoices, payments, and customer data',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            connected: false,
            features: ['Invoice sync', 'Payment tracking', 'Customer data'],
        },
        {
            id: 'zapier',
            name: 'Zapier',
            description: 'Connect with 5000+ apps through Zapier automations',
            icon: Zap,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            connected: true,
            features: ['Automated workflows', 'Multi-app connections', 'Triggers & actions'],
        },
        {
            id: 'plecto',
            name: 'Plecto',
            description: 'Visualize your CRM data on Plecto dashboards',
            icon: BarChart3,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            connected: false,
            features: ['Real-time dashboards', 'Performance metrics', 'Team leaderboards'],
        },
    ]

    const handleConnect = async (integrationId: string) => {
        console.log('Connecting to:', integrationId)
        // Handle OAuth flow or webhook setup
    }

    const copyApiKey = () => {
        navigator.clipboard.writeText(apiKey)
        setApiKeyCopied(true)
        setTimeout(() => setApiKeyCopied(false), 2000)
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold">Integrations</h1>
                <p className="text-muted-foreground mt-1">Connect Trifid X with your favorite tools</p>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="all">All Integrations</TabsTrigger>
                    <TabsTrigger value="connected">Connected</TabsTrigger>
                    <TabsTrigger value="api">API & Webhooks</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {integrations.map((integration) => (
                            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-lg ${integration.bgColor}`}>
                                                <integration.icon className={`h-6 w-6 ${integration.color}`} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{integration.name}</CardTitle>
                                                <CardDescription className="mt-1">{integration.description}</CardDescription>
                                            </div>
                                        </div>
                                        {integration.connected && (
                                            <Badge variant="success" className="flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Connected
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium mb-2">Features:</p>
                                            <ul className="text-sm text-muted-foreground space-y-1">
                                                {integration.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex gap-2">
                                            {integration.connected ? (
                                                <>
                                                    <Button variant="outline" className="flex-1">Configure</Button>
                                                    <Button variant="outline">Disconnect</Button>
                                                </>
                                            ) : (
                                                <Button
                                                    onClick={() => handleConnect(integration.id)}
                                                    className="flex-1 gradient-primary"
                                                >
                                                    Connect
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="connected" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {integrations.filter(i => i.connected).map((integration) => (
                            <Card key={integration.id}>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-lg ${integration.bgColor}`}>
                                            <integration.icon className={`h-6 w-6 ${integration.color}`} />
                                        </div>
                                        <div>
                                            <CardTitle>{integration.name}</CardTitle>
                                            <Badge variant="success" className="mt-2 flex items-center gap-1 w-fit">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Active
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Last sync:</span>
                                            <span className="font-medium">2 minutes ago</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Status:</span>
                                            <span className="text-green-600 font-medium">Healthy</span>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <Button variant="outline" size="sm" className="flex-1">Settings</Button>
                                            <Button variant="outline" size="sm">Disconnect</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="api" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Key</CardTitle>
                            <CardDescription>Use this key to authenticate API requests</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Your API Key</Label>
                                <div className="flex gap-2">
                                    <Input value={apiKey} readOnly className="font-mono text-sm" />
                                    <Button onClick={copyApiKey} variant="outline">
                                        {apiKeyCopied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Keep your API key secret. Do not share it in publicly accessible areas.
                                </p>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <div>
                                    <p className="font-medium text-orange-900">Regenerate API Key</p>
                                    <p className="text-sm text-orange-700">This will invalidate your current key</p>
                                </div>
                                <Button variant="outline">Regenerate</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>API Endpoints</CardTitle>
                            <CardDescription>Available REST API endpoints</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary">GET</Badge>
                                            <code className="text-sm">/api/v1/contacts</code>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Retrieve all contacts with filtering and pagination</p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-green-600">POST</Badge>
                                            <code className="text-sm">/api/v1/contacts</code>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Create a new contact</p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary">GET</Badge>
                                            <code className="text-sm">/api/v1/deals</code>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Retrieve all deals with filtering</p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-green-600">POST</Badge>
                                            <code className="text-sm">/api/v1/deals</code>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Create a new deal</p>
                                </div>

                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-green-600">POST</Badge>
                                            <code className="text-sm">/api/v1/activities</code>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Log a new activity (email, call, note)</p>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full mt-4">
                                <Database className="mr-2 h-4 w-4" />
                                View Full API Documentation
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Webhook Endpoints</CardTitle>
                            <CardDescription>Receive real-time updates from external services</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="font-medium">Zapier Webhook</p>
                                        <code className="text-xs text-muted-foreground">/api/webhooks/zapier</code>
                                    </div>
                                    <Badge>Active</Badge>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="font-medium">Plecto Data Push</p>
                                        <code className="text-xs text-muted-foreground">/api/integrations/plecto</code>
                                    </div>
                                    <Badge variant="secondary">Ready</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
