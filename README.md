# Real Estate Marketplace Microservices

## Quick Start

To run the entire project (all microservices + client), simply double-click the `start-all.bat` file in this directory.

Or run from the command line:
```cmd
.\start-all.bat
```

This will launch:
*   **Auth Service**: Port 3001
*   **Property Service**: Port 3002
*   **Transaction Service**: Port 3003
*   **Search Service**: Port 3004
*   **Analysis Service**: Port 3005
*   **API Gateway**: Port 4000
*   **Client**: Port 3000 (React App)

## Project Structure

*   **/client**: React Frontend
*   **/microservices**: NestJS Backend Services
    *   **api-gateway**: Entry point
    *   **auth-service**: Authentication
    *   **property-service**: Property Listings
    *   **transaction-service**: Transactions
    *   **search-service**: Searching Properties
    *   **analysis-service**: Market Analysis

## Prerequisites

*   Node.js
*   MongoDB running (locally or Atlas)
