# Go-Lotus-AI

This is a full-stack application featuring a Next.js frontend and a NestJS backend. The application is designed for managing clients and staff, with a robust user authentication and invitation system.

## 🚀 Tech Stack

### Frontend (Web)

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCn](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **State Management**: React Hooks & Context API
- **Form Handling**: React Hook Form with Zod for validation

### Backend

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **API**: REST & GraphQL support
- **Code Generation**: Apso CLI for scaffolding

## ✨ Key Features

- **User Authentication**: Secure user sign-up, sign-in, and session management powered by Clerk.
- **Staff Management**: Invite new staff members via email, manage roles, and view staff details.
- **Client Management**: Functionality to add, view, and manage client information.
- **Profile Management**: Users can manage their own profile information.
- **Role-Based Access Control**: Different access levels for admins and staff.
- **API Integration**: Seamless communication between the Next.js frontend and the NestJS backend.

## 📂 Project Structure

The repository is a monorepo containing two main packages:

- `web/`: The Next.js frontend application.
- `backend/`: The NestJS backend application.

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [pnpm](https://pnpm.io/installation) (or npm/yarn)

### 1. Backend Setup

You'll need a running instance of PostgreSQL.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
pnpm install

# Run database migrations
pnpm run db:migrate

# Start the backend development server
pnpm run start:dev
```

The backend server will be running on `http://localhost:3001`.

### 2. Frontend Setup

The frontend requires environment variables for Clerk and the backend API URL.

```bash
# Navigate to the frontend directory
cd web

# Install dependencies
pnpm install

# Create a .env.local file from the example
cp .env.example .env.local
```

Update `.env.local` with your Clerk credentials and other necessary environment variables.

```bash
# Start the frontend development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔧 Backend Development

The backend is built using the Apso CLI, which automates CRUD generation.

### Code Generation

After modifying the `.apsorc` file to define new entities or relationships, run the scaffold command:

```bash
apso server scaffold
```

### Database Migrations

After scaffolding or changing an entity, generate a migration:

```bash
# Generate a migration from entity changes
pnpm run db:generate

# Run all pending migrations
pnpm run db:migrate
```

## 🎨 Frontend Development

The frontend uses ShadCn for UI components, built on top of Tailwind CSS and Radix UI.

### UI Components

- Reusable UI components are located in `web/src/components/ui/`.
- Before creating a new component, always check if a suitable one already exists.
- Follow the established patterns for creating and documenting new components.

### Authentication

Authentication is handled by Clerk. Ensure your Clerk credentials are set up in `web/.env.local`. Middleware in `web/src/middleware.ts` protects routes and handles redirects.
