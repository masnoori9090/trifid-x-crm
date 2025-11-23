# Trifid X - Modern CRM

A comprehensive Customer Relationship Management (CRM) system inspired by Close CRM, built with Next.js 14, TypeScript, and modern web technologies.

## Features

### 🎯 Core CRM Functionality
- **Dashboard**: Real-time metrics, activity feed, and pipeline overview
- **Contact Management**: Organize leads and customers with detailed profiles
- **Sales Pipeline**: Visual drag-and-drop Kanban board for deal management
- **Activity Tracking**: Log emails, calls, SMS, and notes
- **Task Management**: Create, assign, and track to-dos
- **Reports & Analytics**: Performance metrics and sales insights

### ✨ Key Features
- **Beautiful, modern UI** with clean white background and purple accents
- **Drag-and-drop pipeline** management
- **Real-time search** and filtering
- **Responsive design** for all devices
- **Fast and performant** with Next.js 14
- **Type-safe** with TypeScript
- **Premium animations** and transitions
- **API integrations** with Outlook, QuickBooks, Plecto, and Zapier
- **REST API** for custom integrations
- **Webhooks** for real-time data sync

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

3. **Create demo data** (optional):
   ```bash
   npm run seed  # if seed script is added
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Account

For testing, you can use:
- Email: `admin@trifidx.com`
- Password: `admin123`

Or register a new account at `/register`.

## Project Structure

```
CRM/
├── app/
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── contacts/         # Contact management
│   │   ├── deals/            # Pipeline & deals
│   │   ├── activities/       # Communication history
│   │   ├── tasks/            # Task management
│   │   ├── reports/          # Analytics
│   │   └── settings/         # Settings
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth endpoints
│   │   └── register/         # User registration
│   ├── login/                # Login page
│   ├── register/             # Registration page
│   └── globals.css           # Global styles
├── components/
│   ├── layout/               # Layout components
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── auth.ts               # Auth configuration
│   ├── db.ts                 # Database client
│   └── utils.ts              # Utility functions
├── prisma/
│   └── schema.prisma         # Database schema
└── package.json
```

## Database Schema

The application uses the following main models:
- **User**: User accounts with role-based access
- **Contact**: Leads and customers
- **Deal**: Sales opportunities
- **Pipeline**: Customizable sales pipelines
- **Activity**: Communication history
- **Task**: To-dos and reminders
- **EmailTemplate**: Reusable email templates

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Integrations

Trifid X connects with your favorite tools:

### Supported Integrations
- **Microsoft Outlook** - Email and calendar sync
- **QuickBooks** - Invoice and payment tracking  
- **Plecto** - Real-time dashboard metrics
- **Zapier** - Connect with 5000+ apps

### REST API
Full REST API for custom integrations:
- `/api/v1/contacts` - Manage contacts
- `/api/v1/deals` - Handle deals and pipeline
- `/api/v1/activities` - Log communications
- See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for details

### Webhooks
- Zapier webhook support
- Real-time event notifications
- Custom automation workflows

## Features in Detail

### Dashboard
- Key metrics with trend indicators
- Recent activity feed
- Upcoming tasks
- Pipeline overview

### Contact Management
- Add, edit, and delete contacts
- Search and filter contacts
- Track communication history
- Organize by status (Lead, Prospect, Customer)

### Sales Pipeline
- Drag-and-drop deals between stages
- Customizable pipeline stages
- Visual deal cards with key information
- Pipeline value tracking

### Activities
- Log emails, calls, SMS, and notes
- Filter by activity type
- Track communication with each contact
- Activity timeline

### Tasks
- Create and assign tasks
- Priority levels (High, Medium, Low)
- Due date tracking
- Filter by status

### Reports
- Sales performance metrics
- Activity summaries
- Top performers leaderboard
- Pipeline health analysis

## Customization

### Adding Custom Fields
Edit `prisma/schema.prisma` to add custom fields to Contact or Deal models.

### Changing Color Scheme
Modify CSS variables in `app/globals.css` under the `:root` and `.dark` selectors.

### Adding New Stages
Update the pipeline stages in components or add them through the UI.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and modern web technologies**
