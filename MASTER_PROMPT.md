# Ultimate Master Prompt: Trifid X CRM

**Role:** You are a Senior Full Stack Engineer and UI/UX Designer specializing in building enterprise-grade SaaS applications.

**Objective:** Build "Trifid X," a modern, high-performance CRM (Customer Relationship Management) system. The goal is to create a production-ready application with a premium "Wow" factor design, robust backend, and extensive integration capabilities.

---

## 🛠️ Tech Stack (Strict Requirements)

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS + `tailwindcss-animate`
- **UI Library:** Radix UI (Primitives) + Lucide React (Icons)
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** NextAuth.js (v5)
- **State Management:** React Hooks + Context
- **Drag & Drop:** `@dnd-kit/core` (for Kanban board)
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod

---

## 🎨 Design System & Aesthetics

**Theme:** "Modern Professional"
- **Background:** Clean White (`#FFFFFF`)
- **Primary Color:** Vibrant Purple (`#7C3AED` to `#6D28D9` gradients)
- **Secondary Accents:** Soft Grays (`#F3F4F6`)
- **Typography:** Inter (Google Fonts)
- **Visual Style:**
  - Glassmorphism effects on cards and overlays
  - Smooth, premium transitions and micro-interactions
  - Rounded corners (`rounded-xl`)
  - Subtle shadows for depth
  - **CRITICAL:** The UI must look expensive and polished. No basic Bootstrap looks.

---

## 🗄️ Database Schema (Prisma)

Create the following models:
1.  **User:** id, email, password (hashed), name, role, image.
2.  **Contact:** id, firstName, lastName, email, phone, company, status (Lead, Prospect, Customer), customFields (JSON), ownerId.
3.  **Deal:** id, title, value, stage (Qualification, Proposal, Negotiation, Closing), status (Open, Won, Lost), probability, expectedCloseDate, contactId, ownerId.
4.  **Activity:** id, type (Email, Call, Meeting, Note), subject, content, date, contactId, dealId, userId.
5.  **Task:** id, title, dueDate, priority (High, Medium, Low), status (Pending, Completed), assignedToId.

---

## 🚀 Core Features & Pages

### 1. Authentication
- Beautiful Login & Register pages with split-screen design (Image + Form).
- Glassmorphism form container.
- Form validation with Zod.

### 2. Dashboard (`/dashboard`)
- **Metrics Cards:** Total Revenue, Active Deals, New Contacts, Win Rate (with trend indicators).
- **Activity Feed:** Timeline of recent actions.
- **Upcoming Tasks:** List of tasks due soon.
- **Pipeline Preview:** Mini bar chart of deal stages.

### 3. Contact Management (`/contacts`)
- Data Grid view with sortable columns.
- Avatar generation based on initials.
- Status badges with color coding.
- "Add Contact" slide-over or dialog.
- Real-time search and filtering.

### 4. Sales Pipeline (`/deals`)
- **Kanban Board:** Fully interactive drag-and-drop.
- Columns: Qualification, Proposal, Negotiation, Closing.
- Deal Cards: Show title, value, owner avatar, and probability bar.
- Dragging a card updates the stage via API.
- Total value calculation per column.

### 5. Activities & Tasks (`/activities`, `/tasks`)
- **Activities:** Tabbed view (All, Emails, Calls). Log new activity dialog.
- **Tasks:** List view with checkboxes to complete. Filter by priority.

### 6. Reports (`/reports`)
- Interactive charts using Recharts.
- Revenue over time (Area Chart).
- Deals by Stage (Bar Chart).
- Activity breakdown (Pie Chart).

### 7. Settings (`/settings`) - **Comprehensive**
- **Tabs:** Profile, Account, Notifications, Appearance, Security.
- **Profile:** Avatar upload, bio, timezone.
- **Appearance:** Theme toggle (Light/Dark), Accent color picker.
- **Security:** Change password, 2FA toggle.

---

## 🔌 Integrations & API (`/integrations`)

Create a dedicated "Integrations" page listing these services with "Connect" buttons:

### 1. Microsoft Outlook
- **Feature:** Two-way email and calendar sync.
- **Implementation:** OAuth2 flow setup.
- **API Route:** `/api/integrations/outlook/callback`

### 2. QuickBooks Online
- **Feature:** Sync invoices and customer data.
- **Implementation:** OAuth2 flow setup.
- **API Route:** `/api/integrations/quickbooks/callback`

### 3. Plecto
- **Feature:** Real-time dashboard metrics push.
- **Implementation:** API Key authentication.
- **Functionality:** Create a service to push "Deal Won" events to Plecto API.

### 4. Zapier
- **Feature:** Webhook integration for automation.
- **Implementation:** REST Hook subscription.
- **API Route:** `/api/webhooks/zapier` (Handle `contact.created`, `deal.updated`).

---

## 📡 API Architecture

Build a robust REST API at `/api/v1/`:
- `GET /api/v1/contacts`: List with pagination & filtering.
- `POST /api/v1/contacts`: Create contact.
- `GET /api/v1/deals`: List deals.
- `PATCH /api/v1/deals`: Update stage (drag-and-drop).
- `POST /api/webhooks/zapier`: Endpoint to receive external events.

---

## 📝 Implementation Steps

1.  **Setup:** Initialize Next.js project, configure Tailwind and Shadcn/Radix UI.
2.  **Database:** Set up Prisma schema and seed script with demo data.
3.  **Components:** Build reusable UI (Button, Input, Card, Avatar, Badge, Dialog, Sidebar).
4.  **Pages:** Implement Dashboard, Contacts, and Kanban Board first.
5.  **API:** Build the REST endpoints.
6.  **Integrations:** Build the Integrations page and stub out the OAuth routes.
7.  **Polish:** Apply the "White & Purple" theme, add animations, and ensure responsiveness.

**Deliverable:** A fully functional, production-ready CRM codebase.
