# TaskFlow - Single-Page Task Management Application

TaskFlow is a single-page Next.js 15 task management application that allows you to efficiently manage your tasks. It features add, edit, delete, and drag & drop functionality with real-time updates. The app uses Supabase for production backend and db.json (via JSON Server) for local mock database.

## Features

- 🚀 **Next.js 15** with App Router and React Server Components
- 🔄 **TanStack Query (React Query)** for server state management
- 🗄️ **Supabase** for production backend
- 🗄️ **JSON Server** with db.json for local mock database
- ⚡ **Real-time updates** with optimistic UI
- 🎯 **TypeScript** for type safety
- 📋 **Task Management**: Add, edit, and delete tasks
- 🔄 **Task Status**: Mark tasks as done, in-progress, etc.
- 🏷️ **Task Organization**: Drag & drop tasks to reorganize them
- 💅 **Tailwind CSS** with shadcn/ui components
- 📦 **Modern tooling** including ESLint, PostCSS, and more

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Backend**: Supabase (production), JSON Server with db.json (local mock)
- **UI Components**: Radix UI primitives with shadcn/ui wrapper
- **Icons**: Lucide React
- **Drag & Drop**: @hello-pangea/dnd

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Development

To run the development server with both the Next.js app and JSON server:

```bash
npm run dev:json-server
```

This command will start both the JSON server (on port 3001) and the Next.js development server (on port 3000) simultaneously.

Alternatively, you can start them separately:

```bash
# Terminal 1: Start JSON server
npm run json-server

# Terminal 2: Start Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Scripts

- `npm run dev` - Start Next.js development server with TurboPack
- `npm run dev:json-server` - Start both JSON server and Next.js dev server
- `npm run build` - Build the application with TurboPack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run json-server` - Start JSON mock server

## Project Structure

```
src/
├── app/              # Next.js 15 App Router pages
│   ├── edit/[id]/    # Edit task page
│   ├── task/[id]/    # Task detail page
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Main single-page app
│   └── globals.css   # Global styles
├── components/       # Reusable React components
│   ├── ui/           # shadcn/ui components
│   └── providers/    # Context providers
├── features/         # Feature-based modules
│   └── todo/         # Todo feature
│       ├── mutation/ # TanStack Query mutations
│       └── query/    # TanStack Query queries
├── lib/              # Utilities and shared functions
│   ├── supabase.ts   # Supabase client
│   └── utils.ts      # Utility functions
├── services/         # API service layer
│   └── api/          # API functions
├── types/            # TypeScript type definitions
└── utils/            # Helper utilities
```

## Data Fetching Patterns

This project demonstrates several modern data fetching patterns:

1. **Server-Side Data Fetching**: Using Next.js `async` components and server functions
2. **Client-Side Data Fetching**: With TanStack Query for caching, deduplication, and background updates
3. **Optimistic Updates**: Providing immediate UI feedback during mutations
4. **State Synchronization**: Managing both server and client state efficiently
5. **Error Handling**: Proper error boundaries and error states
6. **Loading States**: Skeletons and loading indicators for better UX

## API Endpoints

### Local Development (JSON Server with db.json)

The project uses JSON Server for local development with the following endpoints (hosted on port 3001):

- `GET    /todos` - Get all todos
- `POST   /todos` - Create a new todo
- `GET    /todos/:id` - Get a specific todo
- `PUT    /todos/:id` - Update a specific todo
- `PATCH  /todos/:id` - Partially update a specific todo
- `DELETE /todos/:id` - Delete a specific todo

### Production (Supabase)

For production, the app integrates with Supabase for backend services. Configure your Supabase project and update the environment variables accordingly.

## Deployment

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For deployment, you'll need to configure your production API endpoints appropriately.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [TanStack Query Documentation](https://tanstack.com/query) - Server state management
- [Zustand Documentation](https://docs.pmnd.rs/zustand) - Client state management
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [shadcn/ui Documentation](https://ui.shadcn.com) - Accessible UI components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
