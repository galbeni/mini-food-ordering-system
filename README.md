# Mini Food Ordering System

A small fullstack food ordering application built as a home assignment.

The goal of the project is to demonstrate a clean fullstack architecture with authentication, basic CRUD-like flows, database persistence, API documentation and a simple responsive UI.

## Tech Stack

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcrypt password hashing
- class-validator / class-transformer
- Swagger / OpenAPI
- Jest unit tests

### Frontend

- Next.js App Router
- React
- TypeScript
- Redux Toolkit
- RTK Query
- Tailwind CSS
- shadcn/ui
- Lightweight dictionary-based i18n
- Jest

### Infrastructure

- pnpm workspace monorepo
- Docker Compose for local PostgreSQL
- Backend Dockerfile

## Project Structure

```txt
.
├── apps
│   ├── api
│   │   ├── prisma
│   │   │   ├── migrations
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   └── src
│   │       ├── auth
│   │       ├── orders
│   │       ├── prisma
│   │       └── restaurants
│   │
│   └── web
│       └── src
│           ├── app
│           ├── components
│           ├── features
│           ├── i18n
│           ├── lib
│           ├── store
│           └── types
│
├── docker-compose.yml
├── pnpm-workspace.yaml
└── README.md
```

## Features

### Authentication

- Customer registration
- Customer login
- JWT-based authentication
- Password hashing with bcrypt
- Protected current-user endpoint

### Restaurants

- Restaurant list
- SEO-friendly restaurant detail URLs using slugs
- Restaurant detail page with menu items

### Orders

- Authenticated users can place orders
- Local frontend cart state
- Order detail page
- Customer order history page
- Order status is initialized as `PENDING`

### UI / UX

- Responsive layout
- Header navigation
- Skeleton loading states
- Page fade-in animation
- Basic i18n dictionary structure
- Clean order and restaurant cards

## API Endpoints

### Auth

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| POST   | `/auth/register` | Register a customer               |
| POST   | `/auth/login`    | Login and receive JWT             |
| GET    | `/auth/who-am-i` | Return current authenticated user |

### Restaurants

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| GET    | `/restaurants`       | List all restaurants                     |
| GET    | `/restaurants/:slug` | Return restaurant details including menu |

### Orders

| Method | Endpoint      | Description                                    |
| ------ | ------------- | ---------------------------------------------- |
| POST   | `/orders`     | Create an order for the logged-in user         |
| GET    | `/orders`     | List orders for the logged-in user             |
| GET    | `/orders/:id` | Return a specific order for the logged-in user |

## Local URLs

| App          | URL                          |
| ------------ | ---------------------------- |
| Frontend     | `http://localhost:3000`      |
| Backend API  | `http://localhost:3001`      |
| Swagger Docs | `http://localhost:3001/docs` |
| PostgreSQL   | `localhost:5432`             |

## Requirements

- Node.js 22+
- pnpm
- Docker / Docker Compose

## Environment Variables

### Backend

Create `apps/api/.env`:

```env
DATABASE_URL="postgresql://food_user:food_password2026@localhost:5432/mini_food?schema=public"
JWT_SECRET="super-secret-dev-key"
JWT_EXPIRES_IN="1d"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### Frontend

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## Install Dependencies

From the repository root:

```bash
pnpm install
```

## Database Setup

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Run Prisma migrations:

```bash
pnpm --filter api exec prisma migrate dev
```

Seed the database:

```bash
pnpm --filter api exec prisma db seed
```

The seed script creates several restaurants with menu items.

## Run The Application

From the repository root:

```bash
pnpm dev
```

This starts:

- PostgreSQL through Docker Compose
- NestJS API on port `3001`
- Next.js frontend on port `3000`

## Useful Commands

### Start only the backend

```bash
pnpm --filter api start:dev
```

### Start only the frontend

```bash
pnpm --filter web dev
```

### Run all tests

```bash
pnpm test
```

### Run backend tests

```bash
pnpm --filter api test
```

### Run frontend tests

```bash
pnpm --filter web test
```

### Build all apps

```bash
pnpm build
```

### Open Prisma Studio

```bash
pnpm --filter api exec prisma studio
```

### Reset the database

```bash
pnpm --filter api exec prisma migrate reset
```

## API Documentation

Swagger/OpenAPI documentation is available at:

```txt
http://localhost:3001/docs
```

The protected endpoints use JWT Bearer authentication.

After logging in through `/auth/login`, copy the returned `accessToken`, click the **Authorize** button in Swagger and paste the token.

## Testing

The project includes minimal Jest coverage as requested by the assignment.

Current coverage focuses on:

- Backend service-level unit testing with mocked Prisma dependencies
- Frontend utility-level testing for price formatting

Generated placeholder specs were removed where they did not provide meaningful coverage.

## Notes on API Calls

The frontend uses RTK Query instead of raw Fetch/Axios.

RTK Query internally uses `fetchBaseQuery`, which is built on top of Fetch, while providing:

- typed API hooks
- centralized API definitions
- request state management
- cache invalidation
- cleaner scaling for larger applications

## Git Workflow

For this assignment, I used a structured feature-branch workflow to keep changes reviewable.

In a real project, I would typically use a flow similar to:

```txt
main
develop
feature/*
staging / release branches when needed
```

Given the time-boxed nature of the assignment, the implementation was split into focused commits and feature branches to mimic a review-friendly workflow.

## Trade-offs

The assignment was time-boxed, so the implementation intentionally focuses on a stable, working MVP.

Some conscious trade-offs:

- The cart is stored in local component state instead of persisted storage.
- The i18n solution is dictionary-based and lightweight instead of full locale routing.
- Order status is static and initialized as `PENDING`.
- There is no restaurant admin interface, as it was explicitly out of scope.
- The frontend uses localStorage for JWT storage for simplicity in this assignment context.
- The order detail route uses an order ID because orders are private customer resources and do not need SEO-friendly slugs.
- The restaurant detail route uses slugs for more user-friendly URLs.
- SEO was not deeply optimized beyond the basic Next.js setup. Since Next.js is strong in metadata handling and server-rendered experiences, a production version should include richer page-level metadata, Open Graph tags, structured data and better social sharing previews.
- The application uses the default/basic favicon setup. A production-ready version should include a proper branded favicon set and app icons.
- The bonus real-time order status update feature was not implemented due to the time-boxed scope.

## Further Improvements

Given more time, I would add:

- Real-time order status updates with Socket.io
- Refresh token flow
- HTTP-only cookie based authentication
- More comprehensive backend unit and integration tests
- Frontend component tests for pages and forms
- Pagination for restaurants and orders
- Admin restaurant/menu management
- Better form validation with React Hook Form and Zod
- Production Docker setup for the full monorepo
- Deployment to Render/Railway/Fly.io for the API and Vercel for the frontend
- Improve SEO with page-specific metadata, Open Graph images, structured data and better server-rendered content where needed
- Add a branded favicon, app icons and social preview assets

## Assignment Scope Checklist

The implemented solution covers:

- NestJS backend
- Next.js frontend
- PostgreSQL database
- Prisma ORM and migrations
- JWT authentication
- bcrypt password hashing
- Swagger documentation
- Docker Compose database setup
- Backend Dockerfile
- Seed script
- Minimal Jest coverage
- Restaurant browsing
- Menu display
- Local cart
- Order creation
- Order detail page
- Customer order history
