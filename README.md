# Real Estate Marketplace Microservices

A microservices-based real estate marketplace application with property listings, search, market analysis, and transactions.

## Quick Start

**Install dependencies (one-time):**
```bash
npm install
```

**Start all services:**
```bash
npm run start:all
```

This will launch all services in one terminal:
- **Auth Service**: Port 3001
- **Property Service**: Port 3002
- **Transaction Service**: Port 3003
- **Search Service**: Port 3004
- **Analysis Service**: Port 3005
- **API Gateway**: Port 4000
- **Client (React)**: Port 3000

Access the app at: **http://localhost:3000**

To stop all services: Press `Ctrl+C`

---

## Project Structure

- **/client**: React Frontend
- **/microservices**: NestJS Backend Services
  - **api-gateway**: Entry point (Port 4000)
  - **auth-service**: User authentication
  - **property-service**: Property listings management
  - **transaction-service**: Transaction handling
  - **search-service**: Advanced property search
  - **analysis-service**: Market insights & analytics

---

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)

---

## Features

- 🏠 Property browsing and listing
- 🔍 Advanced search with filters
- 📊 Market analysis dashboard
- 👤 User authentication
- 💼 Admin panel
- 💳 Transaction management
