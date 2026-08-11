# SCIC/EJP-13 Backend API

A production-ready, scalable REST API built with Express.js, TypeScript, Prisma ORM, and PostgreSQL. Designed for seamless integration with a frontend application.

## Tech Stack

| Technology | Purpose |
|---|---|
| Express.js | Web framework |
| TypeScript | Type safety |
| PostgreSQL | Relational database |
| Prisma ORM | Database access & migrations |
| JWT (jsonwebtoken) | Authentication |
| bcrypt | Password hashing |
| Zod | Request validation |
| CORS | Cross-origin resource sharing |

## Project Structure

```
server/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   ├── services/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── category/
│   │   ├── product/
│   │   └── review/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── jwt.ts
│   │   ├── auth.middleware.ts
│   │   ├── sendResponse.ts
│   │   ├── catchAsync.ts
│   │   └── globalErrorHandler.ts
│   └── generated/prisma/  (auto-generated, gitignored)
├── .env
├── package.json
└── tsconfig.json
```

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd server
npm install
```

### 2. Environment Variables

Create a `.env` file in the root:

```
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

### 3. Database Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run the Server

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

### 5. Explore the Database (optional)

```bash
npx prisma studio
```

## Authentication

Protected routes require a JWT sent in the `Authorization` header:

```
Authorization: Bearer <token>
```

Token is returned from `/api/auth/register` and `/api/auth/login`.

## API Response Format

All responses follow a consistent structure:

```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "Validation error",
  "data": null,
  "errors": [
    { "field": "email", "message": "Invalid email address" }
  ]
}
```

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | Public | Register a new user |
| POST | `/login` | Public | Log in and receive a JWT |

**POST `/api/auth/register`**

Request body:
```json
{
  "name": "MD Limon",
  "email": "limon@example.com",
  "password": "123456"
}
```

Response (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": "uuid", "name": "MD Limon", "email": "limon@example.com", "role": "USER" },
    "token": "eyJhbGciOi..."
  }
}
```

**POST `/api/auth/login`**

Request body:
```json
{
  "email": "limon@example.com",
  "password": "123456"
}
```

Response (200): same shape as register.

---

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/me` | Any logged-in user | Get own profile |
| PATCH | `/me` | Any logged-in user | Update own profile |
| GET | `/` | ADMIN | Get all users |
| GET | `/:id` | ADMIN | Get user by ID |
| DELETE | `/:id` | ADMIN | Soft delete a user |

**GET `/api/users/me`**

Response (200):
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": { "id": "uuid", "name": "MD Limon", "email": "limon@example.com", "role": "USER" }
}
```

**PATCH `/api/users/me`**

Request body:
```json
{ "name": "MD Limon Updated" }
```

---

### Categories — `/api/categories`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | ADMIN | Create a category |
| GET | `/` | Public | Get all categories |
| GET | `/:id` | Public | Get category by ID (with products) |
| PATCH | `/:id` | ADMIN | Update a category |
| DELETE | `/:id` | ADMIN | Soft delete a category |

**POST `/api/categories`**

Request body:
```json
{ "name": "Electronics", "description": "Gadgets and devices" }
```

Response (201):
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": { "id": "uuid", "name": "Electronics", "description": "Gadgets and devices", "isDeleted": false, "createdAt": "...", "updatedAt": "..." }
}
```

---

### Products — `/api/products`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | ADMIN | Create a product |
| GET | `/` | Public | Get all products (supports `?categoryId=` and `?search=`) |
| GET | `/:id` | Public | Get product by ID (with category & reviews) |
| PATCH | `/:id` | ADMIN | Update a product |
| DELETE | `/:id` | ADMIN | Soft delete a product |

**POST `/api/products`**

Request body:
```json
{
  "title": "Wireless Mouse",
  "price": 599,
  "stock": 20,
  "categoryId": "uuid-of-existing-category"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "uuid",
    "title": "Wireless Mouse",
    "price": 599,
    "stock": 20,
    "status": "ACTIVE",
    "categoryId": "uuid",
    "isDeleted": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**GET `/api/products?categoryId=uuid&search=mouse`**

Response (200): array of products with category included.

---

### Reviews — `/api/reviews`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Any logged-in user | Create a review |
| GET | `/` | Public | Get all reviews (supports `?productId=`) |
| GET | `/:id` | Public | Get review by ID |
| PATCH | `/:id` | Owner | Update a review |
| DELETE | `/:id` | Owner | Soft delete a review |

**POST `/api/reviews`**

Request body:
```json
{
  "rating": 5,
  "comment": "Great product, very fast delivery!",
  "productId": "uuid-of-existing-product"
}
```

`userId` is taken automatically from the JWT — do not include it in the body.

Response (201):
```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "id": "uuid",
    "rating": 5,
    "comment": "Great product, very fast delivery!",
    "userId": "uuid",
    "productId": "uuid",
    "user": { "id": "uuid", "name": "MD Limon" },
    "product": { "id": "uuid", "title": "Wireless Mouse" }
  }
}
```

## Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Resource created |
| 400 | Validation error / bad request |
| 401 | Not authenticated (missing/invalid token) |
| 403 | Forbidden (wrong role) |
| 404 | Resource not found |
| 409 | Conflict (e.g. duplicate email) |
| 500 | Server error |

## Database Models

- **User** — `id, name, email, password, role (ADMIN/USER), isDeleted, createdAt, updatedAt`
- **Category** — `id, name, description, isDeleted, createdAt, updatedAt`
- **Product** — `id, title, price, stock, status (ACTIVE/INACTIVE/OUT_OF_STOCK), categoryId, isDeleted, createdAt, updatedAt`
- **Review** — `id, rating, comment, userId, productId, isDeleted, createdAt, updatedAt`
- **Order** — `id, quantity, totalPrice, userId, productId, isDeleted, createdAt, updatedAt`

All models use soft delete (`isDeleted` flag) instead of hard deletion.

## Live Deployment

- **Live API URL:** https://scic-13-backend.onrender.com
- **GitHub Repository:** https://github.com/Programing360/scic-13-backend

## Author

MD Limon — [GitHub](https://github.com/Programming360)
