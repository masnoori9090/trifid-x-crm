# Integration Setup Guide

## Overview
This guide will help you set up integrations with Outlook, QuickBooks, Plecto, and Zapier.

---

## Microsoft Outlook Integration

### Prerequisites
- Microsoft Azure account
- Admin access to register an application

### Setup Steps

1. **Register App in Azure Portal**
   - Go to [Azure Portal](https://portal.azure.com)
   - Navigate to "Azure Active Directory" → "App registrations"
   - Click "New registration"
   - Name: "Trifid X CRM"
   - Redirect URI: `http://localhost:3000/api/integrations/outlook/callback`

2. **Configure API Permissions**
   - Add Microsoft Graph permissions:
     - `Mail.Read`
     - `Mail.Send`
     - `Calendars.ReadWrite`
     - `Contacts.Read`
   - Grant admin consent

3. **Get Credentials**
   - Copy the "Application (client) ID"
   - Create a client secret under "Certificates & secrets"
   - Add to `.env`:
   ```
   OUTLOOK_CLIENT_ID=your-client-id
   OUTLOOK_CLIENT_SECRET=your-client-secret
   ```

4. **Test Connection**
   - Go to Integrations page in CRM
   - Click "Connect" on Outlook card
   - Authorize access

---

## QuickBooks Integration

### Prerequisites
- QuickBooks Online account
- Intuit Developer account

### Setup Steps

1. **Create App in Intuit**
   - Go to [Intuit Developer Portal](https://developer.intuit.com)
   - Create new app
   - Select "QuickBooks Online and Payments"
   - App name: "Trifid X CRM"

2. **Configure Keys & OAuth**
   - Redirect URI: `http://localhost:3000/api/integrations/quickbooks/callback`
   - Scopes: `com.intuit.quickbooks.accounting`

3. **Get Credentials**
   - Copy Client ID and Client Secret
   - Add to `.env`:
   ```
   QUICKBOOKS_CLIENT_ID=your-client-id
   QUICKBOOKS_CLIENT_SECRET=your-client-secret
   ```

4. **Test Connection**
   - Connect from Integrations page
   - Select company to connect

---

## Plecto Integration

### Prerequisites
- Plecto account
- API access enabled

### Setup Steps

1. **Get API Credentials**
   - Login to Plecto
   - Go to Settings → API
   - Generate new API key

2. **Configure Webhook (Optional)**
   - Webhook URL: `https://your-domain.com/api/integrations/plecto`
   - Select metrics to push

3. **Add to Environment**
   ```
   PLECTO_API_KEY=your-api-key
   PLECTO_WORKSPACE_ID=your-workspace-id
   ```

4. **Data Flow**
   - **Push to Plecto:** Your CRM sends metrics to Plecto dashboards
   - **Pull from Plecto:** Display Plecto data in CRM

---

## Zapier Integration

### Prerequisites
- Zapier account (free or paid)

### Setup Steps

1. **Create Zap**
   - Trigger: Choose your trigger app (Gmail, Forms, etc.)
   - Action: Webhooks by Zapier
   - Action Event: POST

2. **Configure Webhook**
   - URL: `https://your-domain.com/api/webhooks/zapier`
   - Payload Type: JSON
   - Data: Map fields from trigger

3. **Secure Webhook (Optional)**
   - Add secret to `.env`:
   ```
   ZAPIER_WEBHOOK_SECRET=your-random-secret
   ```
   - Verify signature in webhook handler

4. **Common Zaps**
   - Gmail → Create Contact
   - Google Forms → Create Lead
   - Calendly → Create Activity
   - Stripe → Update Deal

---

## API Access

### Generate API Key

1. Go to Settings → API tab
2. Click "Generate API Key"
3. Copy and secure your key
4. Use in API requests:
   ```
   Authorization: Bearer trifidx_live_sk_your_key
   ```

### Using the API

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for:
- All available endpoints
- Request/response formats
- Code examples
- Rate limits

---

## Webhook Security

### Verify Zapier Webhooks
```javascript
const crypto = require('crypto');

function verifyZapierWebhook(payload, signature) {
  const secret = process.env.ZAPIER_WEBHOOK_SECRET;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return hash === signature;
}
```

---

## Troubleshooting

### Outlook Connection Issues
- Verify redirect URI matches exactly
- Check API permissions are granted
- Ensure admin consent is provided

### QuickBooks Errors
- Confirm company is connected
- Check token expiration (refresh tokens)
- Verify scope permissions

### Webhook Not Receiving Data
- Test with Postman first
- Check server logs for errors
- Verify webhook URL is publicly accessible
- Ensure HTTPS in production

---

## Support

Need help setting up integrations?
- Email: support@trifidx.com
- Documentation: https://docs.trifidx.com
- Community: https://community.trifidx.com
