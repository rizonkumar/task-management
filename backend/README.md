# Task Management Backend API

## Quick Start

### 1. Database Setup

**Option A: Neon (Recommended - Serverless PostgreSQL)**

1. Go to [neon.tech](https://neon.tech)
2. Create a free account and new project
3. Copy your connection string
4. Update `DATABASE_URL` in `.env`

**Option B: Local PostgreSQL**
Keep the current DATABASE_URL and ensure PostgreSQL is running locally.

### 2. Generate Prisma Client & Run Migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Start the Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Todos (Protected)

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

### Logs (Protected)

- `GET /api/logs?category=...&startDate=...&endDate=...` - Get logs with filters
- `GET /api/logs/:id` - Get single log
- `POST /api/logs` - Create log
- `PUT /api/logs/:id` - Update log
- `DELETE /api/logs/:id` - Delete log

### Goals (Protected)

- `GET /api/goals?period=...&category=...` - Get goals with filters
- `GET /api/goals/:id` - Get single goal
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal
- `PATCH /api/goals/:id/progress` - Update goal progress

## Authentication

The API uses JWT tokens stored in HTTP-only cookies:

- Access Token: 15 minutes expiry
- Refresh Token: 7 days expiry

Protected routes require authentication. Include cookies in requests or use `Authorization: Bearer <token>` header.

## Testing Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}' \
  -c cookies.txt

# Create Todo (with authentication)
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"My First Todo","priority":"high","category":"work"}'
```

## Project Structure

```
backend/
├── config/
│   └── prisma.js          # Prisma client setup
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── todoController.js  # Todo CRUD
│   ├── logController.js   # Log CRUD
│   └── goalController.js  # Goal CRUD
├── middlewares/
│   └── auth.js            # JWT authentication middleware
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── todoRoutes.js      # Todo endpoints
│   ├── logRoutes.js       # Log endpoints
│   └── goalRoutes.js      # Goal endpoints
├── utils/
│   └── jwt.js             # JWT utilities
├── prisma/
│   └── schema.prisma      # Database schema
├── app.js                 # Express app setup
├── server.js              # Server entry point
├── .env                   # Environment variables
└── package.json           # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (DB GUI)

## Security Features

- Helmet.js for HTTP headers security
- CORS configured
- Rate limiting (100 requests per 15 minutes)
- Password hashing with bcrypt
- HTTP-only cookies for tokens
- JWT token verification
- Input validation with express-validator
- User-scoped data access

## Environment Variables

See `.env` file for all configuration options. Make sure to:

1. Update `DATABASE_URL` with your database connection string
2. Change JWT secrets in production
3. Set `COOKIE_SECURE=true` in production
4. Update `CLIENT_URL` to your frontend URL

## Next Steps

1. Set up Neon database and update `.env`
2. Run migrations: `npx prisma migrate dev --name init`
3. Start server: `npm run dev`
4. Test authentication endpoints
5. Connect frontend to backend API
6. Deploy to production (Vercel, Railway, etc.)

---

**Backend is ready!**
