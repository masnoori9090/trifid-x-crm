# Data Storage Guide for Trifid X CRM

## 📊 Current Setup (Development)

### Database: SQLite
**Location:** `/Users/mohammadmansoori/Documents/CRM/prisma/dev.db`

**What's stored:**
- ✅ Users (authentication data)
- ✅ Contacts (3 demo contacts)
- ✅ Deals (3 demo deals)
- ✅ Activities (emails, calls, notes)
- ✅ Tasks (to-dos)
- ✅ Pipelines (sales stages)
- ✅ Email templates

**Pros:**
- ✅ Easy setup (no server needed)
- ✅ Perfect for development
- ✅ All data in one file

**Cons:**
- ❌ Not suitable for production
- ❌ No concurrent users
- ❌ Limited to single server
- ❌ File can get corrupted

---

## 🚀 Production Setup (Recommended)

### Option 1: PostgreSQL (RECOMMENDED) ⭐

**What is it:** Enterprise-grade relational database

**Where to host:**
1. **Vercel Postgres** (easiest)
   - URL: https://vercel.com/storage/postgres
   - Cost: Free tier available
   - Auto-scaling
   - Built-in backups

2. **Supabase** (feature-rich)
   - URL: https://supabase.com
   - Cost: Free tier: 500MB
   - Real-time features
   - Built-in auth

3. **AWS RDS** (enterprise)
   - URL: https://aws.amazon.com/rds/
   - Cost: ~$15/month minimum
   - Full control
   - Multi-region

4. **Railway** (developer-friendly)
   - URL: https://railway.app
   - Cost: $5/month
   - Easy setup
   - Good performance

**Migration from SQLite:**
```bash
# 1. Update .env
DATABASE_URL="postgresql://user:password@host:5432/trifidx"

# 2. Push schema to PostgreSQL
npx prisma db push

# 3. Migrate data
npx prisma db seed
```

**Pros:**
- ✅ Production-ready
- ✅ Handles millions of records
- ✅ Concurrent users
- ✅ ACID compliance
- ✅ Advanced features (full-text search, JSON)

**Storage capacity:**
- Contacts: **Unlimited** (millions)
- Deals: **Unlimited**
- Files: Use separate storage (see below)

---

### Option 2: MySQL

**Where to host:**
1. **PlanetScale** (serverless)
   - Free tier available
   - Auto-scaling
   - Branching (like Git)

2. **AWS RDS MySQL**
   - Enterprise-grade
   - Multi-AZ

**Pros:** Similar to PostgreSQL, more familiar to some devs

---

### Option 3: MongoDB (NoSQL)

**Where to host:**
1. **MongoDB Atlas**
   - Free tier: 512MB
   - Cloud-hosted
   - Easy scaling

**Pros:**
- Flexible schema
- Fast for heavy writes
- Good for unstructured data

**Cons:**
- No joins (need to change code)
- Different query language

---

## 📁 File Storage (Documents, Images, Attachments)

### Current: No file storage implemented

### Production Options:

#### Option 1: AWS S3 (RECOMMENDED) ⭐

**What:** Object storage service

**Setup:**
```bash
npm install @aws-sdk/client-s3
```

**.env:**
```
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=trifidx-files
AWS_REGION=us-east-1
```

**Storage Structure:**
```
trifidx-files/
├── contacts/
│   ├── {contactId}/
│   │   ├── avatar.jpg
│   │   ├── documents/
│   │   │   ├── contract.pdf
│   │   │   └── proposal.docx
├── deals/
│   ├── {dealId}/
│   │   ├── quotes/
│   │   └── attachments/
├── users/
│   └── {userId}/
│       └── avatar.jpg
```

**Costs:**
- $0.023 per GB/month
- First 5GB free
- **Example:** 100GB = $2.30/month

**Pros:**
- ✅ 99.999999999% durability
- ✅ CDN integration
- ✅ Unlimited storage
- ✅ Versioning
- ✅ Backup & restore

---

#### Option 2: Cloudinary

**What:** Image/video optimization service

**Best for:** Profile pictures, marketing images

**Costs:**
- Free: 25GB storage, 25GB bandwidth
- Paid: $89/month for 160GB

**Pros:**
- ✅ Automatic image optimization
- ✅ Transformations (resize, crop)
- ✅ CDN included

---

#### Option 3: Supabase Storage

**What:** S3-compatible storage

**Costs:**
- Free: 1GB
- Pro: 100GB for $25/month

**Pros:**
- ✅ Same dashboard as your database
- ✅ Row-level security
- ✅ Works with Supabase Auth

---

#### Option 4: Vercel Blob

**What:** Simple file storage

**Costs:**
- Hobby: 100GB for $0.15/GB
- Pro: Unlimited

**Pros:**
- ✅ Easy if already on Vercel
- ✅ Fast global CDN
- ✅ Simple API

---

## 🏗️ Complete Production Architecture (RECOMMENDED)

### Database: PostgreSQL on Vercel/Supabase
```
DATABASE_URL="postgresql://..."
```

**Stores:**
- Users, contacts, deals, activities
- Relationships and metadata
- Search indexes
- Audit logs

**Capacity:** Unlimited (millions of records)

### File Storage: AWS S3
```
AWS_S3_BUCKET="trifidx-files"
```

**Stores:**
- Profile pictures
- Document attachments
- Email attachments
- Exported reports
- Uploaded files

**Capacity:** Unlimited

### Cache: Redis (Optional, for performance)
```
REDIS_URL="redis://..."
```

**Stores:**
- Session data
- API rate limiting
- Temporary data
- Queue jobs

**Providers:**
- Upstash (free tier)
- Redis Cloud
- AWS ElastiCache

---

## 💾 Storage Estimates

### For 1,000 Contacts:

**Database:**
- Contacts table: ~1MB
- Related deals: ~2MB
- Activities: ~5MB
- **Total:** ~10MB

**Files (if storing):**
- Avatars (50KB each): 50MB
- Documents (avg 500KB): 500MB
- **Total:** ~550MB

### For 10,000 Contacts:

**Database:** ~100MB
**Files:** ~5.5GB

### For 100,000 Contacts:

**Database:** ~1GB
**Files:** ~55GB

**Costs:**
- PostgreSQL: Free to $25/month
- S3 Storage: ~$1.27/month

---

## 🔐 Backup Strategy

### Database Backups

**Automatic (Recommended):**
- Vercel Postgres: Daily automatic backups
- Supabase: Point-in-time recovery (7 days)
- AWS RDS: Automated snapshots

**Manual:**
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Import database
psql $DATABASE_URL < backup.sql
```

### File Backups

**S3:**
- Enable versioning
- Cross-region replication
- Lifecycle policies

**Schedule:**
- Database: Daily
- Files: Real-time (S3 versioning)

---

## 🌍 Deployment Options

### Option 1: Vercel (EASIEST) ⭐

**What:** Serverless hosting for Next.js

**Setup:**
```bash
npm install -g vercel
vercel login
vercel
```

**Includes:**
- ✅ Automatic deployments
- ✅ Global CDN
- ✅ Built-in database
- ✅ Environment variables
- ✅ Free SSL

**Costs:**
- Hobby: Free
- Pro: $20/month

---

### Option 2: AWS (Full Control)

**Services needed:**
- EC2 or ECS (app hosting)
- RDS (database)
- S3 (files)
- CloudFront (CDN)

**Costs:** ~$50-100/month

---

### Option 3: DigitalOcean (Simple VPS)

**Setup:**
- Droplet: $12/month
- Managed PostgreSQL: $15/month
- Spaces (S3-like): $5/month

**Total:** ~$32/month

---

## 📋 Migration Checklist

### From SQLite to Production:

**1. Choose Database Provider**
- [ ] Sign up for Vercel Postgres / Supabase
- [ ] Create database
- [ ] Copy connection string

**2. Update Environment**
```bash
# .env
DATABASE_URL="postgresql://..."
```

**3. Migrate Schema**
```bash
npx prisma db push
```

**4. Migrate Data**
```bash
npx prisma db seed
# or export/import existing data
```

**5. Choose File Storage**
- [ ] Sign up for AWS S3 / Cloudinary
- [ ] Configure bucket/container
- [ ] Update .env with credentials

**6. Deploy Application**
```bash
vercel --prod
```

**7. Test Everything**
- [ ] Login works
- [ ] Contacts load
- [ ] Deals display
- [ ] File uploads work

---

## 💡 My Recommendation for You:

### Development (Current):
✅ **SQLite** - What you have now

### Production (When ready to launch):

**Starter Plan ($0/month):**
- Database: **Vercel Postgres** (Free tier)
- Files: **Cloudinary** (Free 25GB)
- Hosting: **Vercel** (Free)

**Growth Plan ($20-30/month):**
- Database: **Supabase Pro** ($25/month)
- Files: **AWS S3** (~$5/month)
- Hosting: **Vercel Pro** ($20/month)

**Enterprise Plan ($100+/month):**
- Database: **AWS RDS PostgreSQL** ($50/month)
- Files: **AWS S3** ($10/month)
- Hosting: **AWS ECS/EC2** ($50/month)
- Cache: **Redis** ($10/month)

---

## 🚀 Quick Start: Migrate to Production

**1. Create Vercel Postgres Database (5 minutes)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Create database
vercel postgres create
```

**2. Update .env**

Copy the connection string from Vercel dashboard

**3. Push Schema**

```bash
npx prisma db push
```

**4. Seed Data**

```bash
npx prisma db seed
```

**5. Deploy**

```bash
vercel --prod
```

Done! Your CRM is now production-ready! 🎉

---

## 📊 Current Data Location

**Right now, all your data is in:**
```
/Users/mohammadmansoori/Documents/CRM/prisma/dev.db
```

**To view your data:**
```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555 to browse your database.

---

Need help migrating to production? Let me know which option you prefer!
