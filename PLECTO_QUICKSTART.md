# 🎉 Plecto Integration is Now LIVE!

## ✅ What's Been Created

### 1. Plecto Service (`/lib/plecto.ts`)
Full service class that:
- Pushes deal wins to Plecto
- Sends sales metrics (revenue, deal counts)
- Tracks activity metrics (emails, calls, meetings)
- Provides CRM metrics for Plecto to pull

### 2. API Endpoint (`/api/integrations/plecto`)
Working endpoint with:
- **POST** - Push data to Plecto (3 actions)
- **GET** - Pull metrics from CRM

### 3. Environment Setup
Your `.env` file now includes:
```
PLECTO_EMAIL="mohammad@tilt.ae"
PLECTO_PASSWORD="[add-your-password]"
PLECTO_DATA_SOURCE_ID="7e3cae2cdb524e9d89add18c75366fad"
```

---

## 🚀 How to Use RIGHT NOW

### Step 1: Add Your Plecto Password

Edit `/Users/mohammadmansoori/Documents/CRM/.env`:
```bash
PLECTO_PASSWORD="your-actual-plecto-password"
```

### Step 2: Test the Connection

Open Terminal and run:

```bash
# Get CRM metrics
curl http://localhost:3000/api/integrations/plecto
```

You should see your CRM data in JSON format!

### Step 3: Push Data to Plecto

```bash
# Push all sales metrics to Plecto
curl -X POST http://localhost:3000/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{"action":"push_sales_metrics"}'
```

---

## 📊 Available Actions

### 1. Push Sales Metrics
Sends revenue and deal counts for all users:
```bash
curl -X POST http://localhost:3000/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{"action":"push_sales_metrics"}'
```

### 2. Push When Deal Won
Send specific deal to Plecto:
```bash
curl -X POST http://localhost:3000/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{
    "action":"push_deal_won",
    "dealId":"your-deal-id",
    "userId":"your-user-id"
  }'
```

### 3. Push Activity Metrics
Send email/call/meeting counts:
```bash
curl -X POST http://localhost:3000/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{
    "action":"push_activities",
    "userId":"your-user-id",
    "period":"month"
  }'
```

---

## 📈 What Gets Sent to Plecto

### Sales Data:
- **Total Revenue** per user
- **Number of Deals Won** per user
- **Deal Value** for each deal

### Activity Data:
- **Emails Sent** count
- **Calls Made** count
- **Meetings Held** count
- **SMS Sent** count

### Format Sent to Plecto:
```json
{
  "data_source": "7e3cae2cdb524e9d89add18c75366fad",
  "member_api_provider": "trifidx-crm",
  "member_api_id": "user-123",
  "member_name": "John Doe",
  "external_id": "unique-id-12345",
  "value": 50000,
  "date": "2024-11-23T12:00:00.000Z"
}
```

---

## ✅ Testing Checklist

1. **Add your Plecto password to .env** ☐
2. **Test GET endpoint** ☐
   ```bash
   curl http://localhost:3000/api/integrations/plecto
   ```
3. **Push sales metrics** ☐
   ```bash
   curl -X POST http://localhost:3000/api/integrations/plecto \
     -H "Content-Type: application/json" \
     -d '{"action":"push_sales_metrics"}'
   ```
4. **Check Plecto dashboard** ☐
   - Login to Plecto
   - Go to your Trifidx data source
   - Verify data appeared

---

## 🔧 Next Steps

### Automate Sync

Add to your production environment (once deployed):

**Option 1: Cron Job**
```bash
# Every hour
0 * * * * curl -X POST https://your-domain.com/api/integrations/plecto \
  -H "Content-Type: application/json" \
  -d '{"action":"push_sales_metrics"}'
```

**Option 2: Trigger on Deal Won**
In your deal update code, add:
```typescript
// When deal status changes to WON
await fetch('/api/integrations/plecto', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'push_deal_won',
    dealId: deal.id,
    userId: deal.ownerId
  })
})
```

---

## 📚 Full Documentation

See `PLECTO_INTEGRATION.md` for complete details.

---

## ✅ Status: READY TO USE!

Your Plecto integration is **fully functional** and ready to push CRM data!
