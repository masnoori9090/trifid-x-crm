# Trifid X CRM - API Documentation

## Overview

Trifid X provides a comprehensive REST API for integrating with external tools and platforms. All API endpoints use JSON for requests and responses.

## Base URL

```
https://your-domain.com/api/v1
```

## Authentication

All API requests require authentication using an API key. Include your API key in the `Authorization` header:

```
Authorization: Bearer trifidx_live_sk_your_api_key_here
```

## Rate Limiting

- **100 requests per minute** per API key
- Rate limit headers are included in all responses

## API Endpoints

### Contacts

#### List Contacts
```http
GET /api/v1/contacts
```

**Query Parameters:**
- `status` (string): Filter by status (LEAD, PROSPECT, CUSTOMER)
- `limit` (number): Number of results (default: 100, max: 500)
- `offset` (number): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "contact_123",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@acmecorp.com",
      "phone": "+1 234 567 8900",
      "company": "Acme Corp",
      "position": "CEO",
      "status": "CUSTOMER",
      "createdAt": "2024-01-15T10:00:00Z",
      "owner": {
        "id": "user_456",
        "name": "Sales Rep",
        "email": "sales@trifidx.com"
      }
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 100,
    "offset": 0,
    "hasMore": true
  }
}
```

#### Create Contact
```http
POST /api/v1/contacts
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "+1 555 123 4567",
  "company": "Tech Corp",
  "position": "VP Marketing",
  "status": "LEAD",
  "ownerId": "user_456",
  "customFields": {
    "industry": "Technology",
    "employees": "50-100"
  }
}
```

### Deals

#### List Deals
```http
GET /api/v1/deals
```

**Query Parameters:**
- `stage` (string): Filter by pipeline stage
- `status` (string): Filter by status (OPEN, WON, LOST)
- `limit` (number): Number of results
- `offset` (number): Pagination offset

#### Create Deal
```http
POST /api/v1/deals
```

**Request Body:**
```json
{
  "title": "Enterprise Solution",
  "value": 125000,
  "probability": 75,
  "stage": "NEGOTIATION",
  "contactId": "contact_123",
  "ownerId": "user_456",
  "pipelineId": "pipeline_789",
  "expectedCloseDate": "2024-12-31"
}
```

#### Update Deal
```http
PATCH /api/v1/deals
```

**Request Body:**
```json
{
  "id": "deal_123",
  "stage": "CLOSING",
  "probability": 90,
  "value": 130000
}
```

### Activities

#### Log Activity
```http
POST /api/v1/activities
```

**Request Body:**
```json
{
  "type": "EMAIL",
  "subject": "Follow-up on proposal",
  "content": "Sent detailed proposal with pricing",
  "userId": "user_456",
  "contactId": "contact_123",
  "dealId": "deal_789"
}
```

**Activity Types:**
- `EMAIL` - Email communication
- `CALL` - Phone call
- `SMS` - Text message
- `NOTE` - Internal note
- `MEETING` - Meeting or appointment

#### Get Activities
```http
GET /api/v1/activities
```

**Query Parameters:**
- `type` (string): Filter by activity type
- `contactId` (string): Filter by contact
- `dealId` (string): Filter by deal
- `limit` (number): Number of results

---

## Webhook Integration

### Zapier Webhook

**Endpoint:** `POST /api/webhooks/zapier`

**Use Case:** Receive events from Zapier automations

**Request Format:**
```json
{
  "event": "contact.created",
  "data": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com"
  },
  "zapier_hook_id": "hook_123"
}
```

**Supported Events:**
- `contact.created`
- `contact.updated`
- `deal.created`
- `deal.updated`
- `activity.created`

---

## Platform Integrations

### Microsoft Outlook

**OAuth Flow:**
1. Initiate: `POST /api/integrations/outlook/callback`
2. User authorizes in Microsoft
3. Callback: `GET /api/integrations/outlook/callback?code=...`

**Scopes Required:**
- `Mail.Read` - Read emails
- `Mail.Send` - Send emails
- `Calendars.ReadWrite` - Calendar access

### QuickBooks

**OAuth Flow:**
1. Initiate: `POST /api/integrations/quickbooks/callback`
2. User authorizes in QuickBooks
3. Callback: `GET /api/integrations/quickbooks/callback?code=...&realmId=...`

**Features:**
- Sync invoices
- Track payments
- Customer data integration

### Plecto

**Push Data:** `POST /api/integrations/plecto`

**Pull Metrics:** `GET /api/integrations/plecto`

**Metrics Available:**
- Total deals
- Revenue
- Conversion rates
- Pipeline value
- Win rates

---

## Error Handling

All errors return with appropriate HTTP status codes and a JSON response:

```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Server Error

---

## Example Code

### JavaScript/Node.js
```javascript
const axios = require('axios');

const apiKey = 'trifidx_live_sk_your_key';
const baseURL = 'https://your-domain.com/api/v1';

// List contacts
const response = await axios.get(`${baseURL}/contacts`, {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  params: {
    status: 'CUSTOMER',
    limit: 50
  }
});

console.log(response.data);
```

### Python
```python
import requests

api_key = 'trifidx_live_sk_your_key'
base_url = 'https://your-domain.com/api/v1'

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

# Create contact
data = {
    'firstName': 'Jane',
    'lastName': 'Doe',
    'email': 'jane@example.com',
    'status': 'LEAD'
}

response = requests.post(
    f'{base_url}/contacts',
    json=data,
    headers=headers
)

print(response.json())
```

### cURL
```bash
curl -X GET "https://your-domain.com/api/v1/contacts?limit=10" \
  -H "Authorization: Bearer trifidx_live_sk_your_key" \
  -H "Content-Type: application/json"
```

---

## Support

For API support, contact: api@trifidx.com

**Need help?**
- View examples in our [GitHub repository](https://github.com/trifidx/api-examples)
- Join our [Developer Community](https://community.trifidx.com)
- Read our [Integration Guides](https://docs.trifidx.com/integrations)
