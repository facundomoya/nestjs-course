# NestJS Course – Backend Projects

## Project Description

This repository contains four independent backend projects built with NestJS as part of a backend development course. Each project demonstrates different architectures, databases, and patterns ranging from in-memory CRUD operations to full-featured REST APIs with authentication, WebSockets, and real-time communication.

**Note:** All projects are backend-only. One frontend client (`ws-client`) is included as a WebSocket test client.

---

## Projects Overview

| Project | Database | Description |
|---------|----------|-------------|
| **teslo-shop** | PostgreSQL (TypeORM) | Full-featured e-commerce API with JWT auth, roles, WebSockets, file uploads, and Swagger docs |
| **pokedex** | MongoDB (Mongoose) | Pokemon REST API that fetches data from PokeAPI, with pagination and seed system |
| **car-dealership** | In-memory (UUID) | Simple CRUD API for cars and brands with seed data |
| **ws-client** | None | Vite + TypeScript client for testing Socket.IO connections with teslo-shop |

---

## Technologies Used

### Backend Core (All Projects)
- **Node.js** – Runtime environment
- **NestJS v11** – Progressive Node.js framework
- **TypeScript v5** – Type-safe JavaScript
- **Express.js** – HTTP adapter
- **class-validator / class-transformer** – DTO validation and transformation

### Databases & ORMs
- **PostgreSQL** + **TypeORM** – Relational database (teslo-shop)
- **MongoDB** + **Mongoose** – NoSQL database (pokedex)

### Authentication & Security
- **JWT (JSON Web Tokens)** – Token-based authentication (teslo-shop)
- **Passport.js** – Authentication middleware (teslo-shop)
- **bcrypt** – Password hashing (teslo-shop)

### Real-time Communication
- **Socket.IO** – WebSocket server and client (teslo-shop + ws-client)

### API Documentation
- **Swagger / OpenAPI** – Auto-generated API docs (teslo-shop)

### DevOps & Deployment
- **Docker** – Containerization (pokedex, teslo-shop)
- **Render** – Cloud deployment (teslo-shop)

---

## Project Details

### 1. teslo-shop

A Tesla-inspired e-commerce REST API for a clothing store.

**Features:**
- JWT authentication with role-based access control (admin, super-user, user)
- Full CRUD operations for products with image management
- File upload (Multer) with UUID-based file naming
- WebSocket real-time messaging with authenticated connections
- PostgreSQL persistence with TypeORM
- Swagger/OpenAPI documentation at `/api`
- Database seed system (43 Tesla products + 2 test users)
- Global validation pipe with whitelist and forbidNonWhitelisted
- Comprehensive PostgreSQL error handling
- Transactional product updates with QueryRunner

**Modules:**
- `AuthModule` – Registration, login, JWT tokens, role guards
- `ProductsModule` – Product CRUD with pagination, image relations, slug generation
- `FilesModule` – Image upload and static file serving
- `MessagesWsModule` – WebSocket gateway with JWT-authenticated connections
- `SeedModule` – Database seeding with Tesla product catalog

**Tech Stack:** NestJS, TypeORM, PostgreSQL, Passport-JWT, bcrypt, Socket.IO, Multer, Swagger

---

### 2. pokedex

A Pokemon REST API that fetches data from the PokeAPI and stores it locally.

**Features:**
- Fetches 650 Pokemon from PokeAPI and stores them in MongoDB
- Smart findOne: accepts Pokedex number, MongoDB ObjectId, or name
- Case-insensitive name search
- Pagination with configurable default limit
- Joi validation for environment variables at startup
- Docker multi-stage build (deps → build → production)
- Static file serving from `public/`
- Duplicate key error handling with friendly messages

**Modules:**
- `PokemonModule` – Pokemon CRUD with Mongoose schemas
- `SeedModule` – Fetches and inserts Pokemon from PokeAPI
- `CommonModule` – Shared Axios HTTP adapter and utilities

**Tech Stack:** NestJS, Mongoose, MongoDB, Axios, Joi, Docker

---

### 3. car-dealership

A simple in-memory CRUD API for managing cars and brands.

**Features:**
- Full CRUD for cars and brands
- In-memory data storage (no database)
- UUID-based entity identification
- Seed data system (3 cars + 3 brands)
- DTO validation with class-validator

**Modules:**
- `CarsModule` – Car CRUD operations
- `BrandsModule` – Brand CRUD operations
- `SeedModule` – Populates in-memory data

**Tech Stack:** NestJS, uuid, class-validator

---

### 4. ws-client

A Vite + TypeScript WebSocket client for testing the teslo-shop real-time chat.

**Features:**
- JWT-authenticated WebSocket connection
- Real-time list of connected clients
- Send and receive messages in real time
- Online/Offline status indicator

**Tech Stack:** Vite, TypeScript, Socket.IO Client

---

## Project Structure

```
nestjs-course/
├── teslo-shop/              # E-commerce API (PostgreSQL + TypeORM)
│   ├── src/
│   │   ├── auth/            # JWT authentication & role guards
│   │   ├── products/        # Product CRUD with images
│   │   ├── files/           # File upload & serving
│   │   ├── messages-ws/     # WebSocket gateway
│   │   ├── seed/            # Database seeding
│   │   ├── common/          # Shared DTOs & interceptors
│   │   ├── utils/           # DB error handling utilities
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── static/
│   ├── docker-compose.yaml
│   └── package.json
│
├── pokedex/                 # Pokemon API (MongoDB + Mongoose)
│   ├── src/
│   │   ├── pokemon/         # Pokemon CRUD
│   │   ├── seed/            # PokeAPI data fetcher
│   │   ├── config/          # Environment config & Joi validation
│   │   ├── common/          # Shared adapters, pipes, DTOs
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── public/
│   ├── Dockerfile
│   ├── docker-compose.yaml
│   └── package.json
│
├── car-dealership/          # In-memory CRUD API
│   ├── src/
│   │   ├── cars/            # Car CRUD
│   │   ├── brands/          # Brand CRUD
│   │   ├── seed/            # Seed data
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
└── ws-client/               # WebSocket test client
    ├── src/
    │   ├── main.ts
    │   └── socket-client.ts
    ├── index.html
    └── package.json
```

---

## Getting Started

### Prerequisites
- **Node.js** v18+ (v24 recommended)
- **Docker** (optional, for database containers)
- **PostgreSQL** (for teslo-shop, or use Docker)
- **MongoDB** (for pokedex, or use Docker)

### Clone the Repository
```bash
git clone https://github.com/facundomoya/nestjs-course.git
```

---

### teslo-shop Setup
```bash
cd teslo-shop
npm install
```

**Environment Configuration:**
Rename `.env.template` to `.env` and fill in your values:
```env
STAGE=dev
DB_HOST=localhost
DB_PORT=5432
DB_NAME=teslo_shop
DB_USERNAME=your_user
DB_PASSWORD=your_password
PORT=3000
HOST_API=http://localhost:3000
JWT_SECRET=your_jwt_secret
```

**Run with Docker (PostgreSQL):**
```bash
docker-compose up -d
```

**Run the app:**
```bash
npm run start:dev
```

**Seed the database:**
```bash
curl http://localhost:3000/api/seed
```

**Swagger docs:** `http://localhost:3000/api`

---

### pokedex Setup
```bash
cd pokedex
npm install
```

**Environment Configuration:**
```env
MONGODB=mongodb://localhost:27017/nest-pokemon
PORT=3000
DEFAULT_LIMIT=5
```

**Run with Docker (MongoDB):**
```bash
docker-compose up -d
```

**Run the app:**
```bash
npm run start:dev
```

**Seed the database:**
```bash
curl http://localhost:3000/api/v2/seed
```

---

### car-dealership Setup
```bash
cd car-dealership
npm install
npm run start:dev
```

No database required – data is stored in memory.

**Seed the data:**
```bash
curl http://localhost:3000/seed
```

---

### ws-client Setup
```bash
cd ws-client
npm install
npm run dev
```

Open the browser, paste a JWT token from teslo-shop, and connect to the WebSocket chat.

**Live Demo:** https://nest-teslo-shop-project.netlify.app/

---

## Learning Objectives

### NestJS Framework
- Module architecture and dependency injection
- Controllers, services, and providers
- Guards, interceptors, pipes, and decorators
- Custom decorators for parameter extraction

### REST API Design
- Full CRUD operations with proper HTTP status codes
- DTO validation with class-validator
- Global error handling and exception filters
- Pagination and query parameter handling

### Database Operations
- TypeORM with PostgreSQL (entities, relations, QueryRunner transactions)
- Mongoose with MongoDB (schemas, models, validators)
- Database seeding patterns

### Authentication & Authorization
- JWT token generation and validation with Passport
- Role-based access control (RBAC)
- Custom guards and decorators

### Real-time Communication
- WebSocket gateways with Socket.IO
- JWT-authenticated WebSocket connections
- Event-based message broadcasting

### DevOps
- Docker multi-stage builds
- Docker Compose for local development
- Cloud deployment with Render

---

## Development Team

These projects were developed by **Facundo Moya** as part of the NestJS backend development course, student of Information Systems Engineering at the **Universidad Tecnológica Nacional - Facultad Regional Tucumán (UTN-FRT)**.

## Projects Status

Finished ✔️

Development has been completed.
