# Plecto Integration Guide

## Overview
This guide shows how to push Trifid X CRM data to Plecto dashboards.

## Configuration

### 1. Add Credentials to .env

```bash
PLECTO_EMAIL="mohammad@tilt.ae"
PLECTO_PASSWORD="your-plecto-password"
PLECTO_DATA_SOURCE_ID="7e3cae2cdb524e9d89add18c75366fad"
```

### 2. Test the Connection

```bash
curl -X GET http://localhost:3000/api/integrations/plecto
```

This will return your CRM metrics in a format ready for Plecto.

---

## Pushing Data to Plecto

### Method 1: Push All Sales Metrics

Send all sales data to Plecto:

```bash
curl -X POST http://localhost:3000/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{
    "action": "push_sales_metrics"
  }'
```

This will push:
- Total revenue per user
- Number of deals won per user  
- Monthly metrics

### Method 2: Push When Deal is Won

When a deal is marked as won, push it to Plecto:

```bash
curl -X POST http://localhost:3000/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{
    "action": "push_deal_won",
    "dealId": "deal-uuid-here",
    "userId": "user-uuid-here"
  }'
```

### Method 3: Push Activity Metrics

Push email, call, and meeting counts:

```bash
curl -X POST http://localhost:3000/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{
    "action": "push_activities",
    "userId": "user-uuid-here",
    "period": "month"
  }'
```

Period options: `day`, `week`, `month`

---

## Automated Sync

### Set up Cron Job (Production)

Add to your server's crontab to sync every hour:

```bash
# Sync sales metrics to Plecto every hour
0 * * * * curl -X POST http://your-domain.com/api/integrations/plecto -H "Content-Type: application/json" -d '{"action":"push_sales_metrics"}'
```

### Using Vercel Cron (for Vercel deployments)

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/integrations/plecto/sync",
    "schedule": "0 * * * *"
  }]
}
```

---

## Available Metrics

When you push data to Plecto, these metrics are sent:

### Sales Metrics
- **Total Revenue**: Sum of all won deals
- **Deals Count**: Number of deals won
- **Pipeline Value**: Value of open deals
- **Conversion Rate**: Won deals / (Won + Lost deals)
- **Average Deal Size**: Total revenue / deals won

### Activity Metrics
- **Emails Sent**: Count of email activities
- **Calls Made**: Count of call activities
- **Meetings Held**: Count of meeting activities
- **SMS Sent**: Count of SMS activities

---

## Plecto Dashboard Setup

### In Plecto:

1. **Go to Data Sources**
   - Your Trifidx data source should appear
   - UUID: `7e3cae2cdb524e9d89add18c75366fad`

2. **Create Formulas**
   - Revenue: Sum of registration values
   - Deals: Count of registrations
   - Activities: Count by type

3. **Build Widgets**
   - Leaderboards for top performers
   - Charts for revenue trends
   - Gauges for targets vs actuals

4. **Set up Notifications**
   - Alerts when deals are won
   - Milestones for revenue targets

---

## Testing

### 1. Check Current Metrics

```bash
curl http://localhost:3000/api/integrations/plecto
```

Expected response:
```json
{
  "success": true,
  "data": {
    "total_deals": 127,
    "total_revenue": 487500,
    "pipeline_value": 1250000,
    "deals_won": 42,
    "deals_open": 85,
    "total_contacts": 1234,
    "conversion_rate": 0.68,
    "average_deal_size": 11607,
    "timestamp": "2024-11-23T12:00:00.000Z"
  }
}
```

### 2. Push Test Data

```bash
curl -X POST http://localhost:3000/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{"action":"push_sales_metrics"}'
```

### 3. Verify in Plecto

- Log into Plecto dashboard
- Check if data appears in your widgets
- Verify team members see their metrics

---

## Troubleshooting

### Error: "Plecto API Error: 401 Unauthorized"
- Check your email and password in `.env`
- Verify credentials work in Plecto web interface

### Error: "Deal not found"
- Verify the dealId exists in your database
- Check that the deal has `status: 'WON'`

### No data appearing in Plecto
- Wait 5-10 minutes for Plecto to process
- Check Plecto's data source logs
- Verify your data source UUID is correct

### Rate limiting errors
- Plecto has API rate limits
- Reduce sync frequency
- Batch registrations together

---

## Advanced Usage

### Custom Metrics

You can modify `/lib/plecto.ts` to add custom metrics:

```typescript
// Push custom KPI
const registration = {
  data_source: '7e3cae2cdb524e9d89add18c75366fad',
  member_api_provider: 'trifidx-crm',
  member_api_id: userId,
  member_name: userName,
  external_id: `custom_kpi_${Date.now()}`,
  value: yourCustomValue,
  date: new Date().toISOString()
}
```

### Webhook Integration

Set up Plecto to trigger actions in your CRM:

1. In Plecto, create a webhook
2. Point to: `https://your-domain.com/api/webhooks/plecto`
3. Handle events in your webhook endpoint

---

## Support

- Plecto API Docs: https://app.plecto.com/api_v2
- Trifid X Support: support@trifidx.com
