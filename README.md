# Payment Task - Full-Stack Monorepo

A production-ready full-stack monorepo for a payment application using pnpm workspaces.

## Tech Stack

### Monorepo
- **pnpm workspaces** - Fast, disk-efficient package manager
- **TypeScript** - Shared strict configuration across packages

### Backend (`apps/api`)
- **Node.js** + **Express** - REST API server
- **TypeScript** - Type-safe backend development
- **Prisma ORM** - Type-safe database access with MySQL
- **MySQL** - Relational database
- **Zod** - Runtime validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend (`apps/web`)
- **React 18** - UI library
- **Vite 5** - Fast build tool and dev server
- **TypeScript** - Type-safe frontend development
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Server state management
- **Axios** - HTTP client

### Shared (`packages/shared-types`)
- **TypeScript** - Shared type definitions

## Project Structure

```
payment-task/
├── package.json              # Root package.json with workspace scripts
├── pnpm-workspace.yaml       # pnpm workspace configuration
├── tsconfig.base.json        # Base TypeScript configuration
├── .gitignore
├── apps/
│   ├── api/                  # Backend Express application
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── .env.example
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       ├── index.ts      # Application entry point
│   │       ├── app.ts        # Express app factory
│   │       ├── config/       # Configuration
│   │       ├── routes/       # API routes
│   │       ├── middleware/   # Express middleware
│   │       ├── services/     # Business logic
│   │       ├── utils/        # Utilities
│   │       └── db/           # Database client
│   └── web/                  # Frontend React application
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── .env.example
│       ├── index.html
│       ├── public/
│       └── src/
│           ├── main.tsx      # React entry point
│           ├── App.tsx       # Root component
│           ├── styles/       # Global styles
│           ├── components/   # React components
│           ├── hooks/        # Custom hooks
│           ├── services/     # API services
│           ├── types/        # TypeScript types
│           ├── utils/        # Utilities
│           └── providers/    # React context providers
└── packages/
    └── shared-types/         # Shared TypeScript types
```

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0
- MySQL >= 8.0

### Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Set up environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
# Edit the .env files with your configuration
```

### Database Setup

```bash
# Run migrations
pnpm db:migrate

# Or push schema directly (development)
pnpm db:push

# Open Prisma Studio
pnpm db:studio
```

### Development

```bash
# Start both frontend and backend
pnpm dev

# Or start individually
pnpm --filter @payment/api dev
pnpm --filter @payment/web dev
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @payment/api build
pnpm --filter @payment/web build
```

### Linting & Type Checking

```bash
# Lint all packages
pnpm lint

# Type check all packages
pnpm typecheck
```

## Environment Variables

### Backend (`apps/api/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3001` |
| `API_PREFIX` | API route prefix | `/api` |
| `DATABASE_URL` | MySQL connection string | Required |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend (`apps/web/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | API base URL | `/api` |

## API Endpoints

### Health Checks
- `GET /api/health` - Full health check with database connectivity
- `GET /api/ready` - Readiness probe for Kubernetes

## Scripts

### Root
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type check all packages |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:push` | Push schema to database |

### Backend (`@payment/api`)
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Compile TypeScript |
| `pnpm start` | Run compiled server |
| `pnpm lint` | Lint source files |
| `pnpm typecheck` | Type check without emit |

### Frontend (`@payment/web`)
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Lint source files |
| `pnpm typecheck` | Type check without emit |

## Production Deployment

### Backend
```bash
# Build
pnpm --filter @payment/api build

# Set production environment variables
export NODE_ENV=production
export DATABASE_URL="your-production-db-url"

# Run
pnpm --filter @payment/api start
```

### Frontend
```bash
# Build
pnpm --filter @payment/web build

# The dist/ folder contains the production build
# Serve with any static file server (nginx, Vercel, Netlify, etc.)
```

## License

MIT