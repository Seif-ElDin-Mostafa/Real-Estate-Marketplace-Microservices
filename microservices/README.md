# Real Estate Marketplace - NestJS Microservices

This project is a microservices-based real estate marketplace backend built with NestJS, converted from the original Node.js/Express implementation.

## Architecture

The application consists of 4 independent services:

- **Auth Service** (Port 3001): Handles user authentication and management
- **Property Service** (Port 3002): Manages property listings
- **Transaction Service** (Port 3003): Handles property transactions
- **API Gateway** (Port 4000): Single entry point for all client requests

## Technology Stack

- **Framework**: NestJS
- **Database**: MongoDB (Shared database with separate collections)
- **Authentication**: JWT with Passport
- **Communication**: HTTP/REST between microservices
- **Validation**: class-validator and class-transformer

## Project Structure

```
microservices/
├── auth-service/          # User authentication & management
├── property-service/      # Property CRUD operations
├── transaction-service/   # Transaction handling
└── api-gateway/          # API Gateway (single entry point)
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Installation

Each microservice needs its dependencies installed:

```bash
# Install dependencies for all services
cd microservices/auth-service && npm install
cd ../property-service && npm install
cd ../transaction-service && npm install
cd ../api-gateway && npm install
```

## Environment Variables

Each service has its own `.env` file with the following structure:

### Auth Service (.env)
```
PORT=3001
DATABASE=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

### Property Service (.env)
```
PORT=3002
DATABASE=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

### Transaction Service (.env)
```
PORT=3003
DATABASE=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PROPERTY_SERVICE_URL=http://localhost:3002
```

### API Gateway (.env)
```
PORT=4000
AUTH_SERVICE_URL=http://localhost:3001/auth
PROPERTY_SERVICE_URL=http://localhost:3002/property
TRANSACTION_SERVICE_URL=http://localhost:3003/transaction
```

## Running the Services

You need to run each service in a separate terminal:

### Terminal 1 - Auth Service
```bash
cd microservices/auth-service
npm run start:dev
```

### Terminal 2 - Property Service
```bash
cd microservices/property-service
npm run start:dev
```

### Terminal 3 - Transaction Service
```bash
cd microservices/transaction-service
npm run start:dev
```

### Terminal 4 - API Gateway
```bash
cd microservices/api-gateway
npm run start:dev
```

## API Endpoints

All requests should go through the **API Gateway** on port 4000:

### Auth Endpoints (via Gateway: http://localhost:4000/auth)

- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `GET /auth/user` - Get current user or all users (admin)
- `PUT /auth/me` - Update current user
- `PUT /auth/user/:id` - Update user by ID (admin only)
- `DELETE /auth/user/:id` - Delete user by ID (admin only)
- `DELETE /auth/me` - Delete current user
- `POST /auth/change-password` - Change password

### Property Endpoints (via Gateway: http://localhost:4000/property)

- `POST /property` - Create property (requires authentication)
- `GET /property/:id` - Get property by ID
- `GET /property` - Get all properties
- `PUT /property/:id` - Update property
- `DELETE /property/:id` - Delete property

### Transaction Endpoints (via Gateway: http://localhost:4000/transaction)

- `GET /transaction/:id?` - Get transaction(s) (requires authentication)
- `POST /transaction` - Create transaction (requires authentication)
- `DELETE /transaction/:id` - Delete transaction (requires authentication)

## Business Logic Separation

Each microservice follows the NestJS best practices with business logic properly separated:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain all business logic
- **DTOs**: Validate incoming data
- **Schemas**: Define database models

## Inter-Service Communication

The Transaction Service communicates with the Property Service via HTTP to mark properties as sold when a transaction is created. If the property update fails, the transaction is automatically rolled back.

## Key Features

✅ Proper separation of concerns (Controller → Service → Repository pattern)
✅ JWT authentication across all services
✅ Role-based access control (admin/user)
✅ Input validation with class-validator
✅ CORS enabled for frontend integration
✅ Error handling and rollback mechanisms
✅ Shared MongoDB database with separate collections

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Production Build

```bash
# Build each service
cd microservices/auth-service && npm run build
cd ../property-service && npm run build
cd ../transaction-service && npm run build
cd ../api-gateway && npm run build

# Run production
npm run start:prod
```

## Migration from Original Project

This microservices architecture maintains the same functionality as the original Node.js/Express backend but with:

- Better modularity and scalability
- Independent deployment of services
- Improved type safety with TypeScript
- Better testability
- Clean separation of business logic
- Professional NestJS structure

## Troubleshooting

**Port already in use:**
```bash
# Find and kill process on port
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**MongoDB Connection Issues:**
- Verify your MongoDB connection string in `.env` files
- Ensure your IP is whitelisted in MongoDB Atlas
- Check network connectivity

**JWT Token Issues:**
- Ensure all services use the same `JWT_SECRET`
- Token format: `Bearer <token>`
- Check token expiration (default: 7 days)

## License

ISC
