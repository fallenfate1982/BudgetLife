# BudgetLife Backend Service

A .NET 7.0 Web API service providing authentication, budget management, and transaction tracking functionality.

## Features
- JWT-based authentication system
- MySQL database integration
- RESTful API endpoints for budgets and transactions
- Comprehensive test suite

## Prerequisites
- .NET SDK 7.0
- MySQL Server
- Python 3.x (for running test scripts)

## Environment Configuration

The application requires the following environment variables to be set:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_NAME=BudgetLifeDB
DB_USER=budgetlife_user
DB_PASSWORD=your_password_here
```

Create a `.env` file in the project root with these variables or set them in your environment.

## Database Setup

The application uses MySQL for data storage. The connection string is constructed using the environment variables above. Make sure your MySQL server is running and accessible with the configured credentials.

### Database Migrations
The application uses Entity Framework Core migrations. To update your database:

```bash
dotnet ef database update
```

## Development Setup

1. Restore dependencies:
```bash
dotnet restore
```

2. Run the application:
```bash
dotnet run --urls="http://localhost:60960"
```

The API will be available at `http://localhost:60960`

## API Testing

### Using test_endpoints.py
A Python script is provided to test the main API endpoints:

```bash
cd Source/Services/Services
python3 test_endpoints.py
```

This script tests:
- User registration
- Authentication
- Budget creation and retrieval

### Manual API Testing
You can use the following test credentials:
- Email: test@example.com
- Password: Test123!

## Project Structure

### Key Components
- `Controllers/` - API endpoint implementations
  - `AuthController.cs` - Authentication endpoints
  - `BudgetController.cs` - Budget management
  - `TransactionController.cs` - Transaction handling
- `Models/` - Data models and DTOs
- `Data/` - Database context and configurations
- `Migrations/` - Database migration files

## API Documentation

### Authentication Endpoints
- POST `/api/Auth/register` - Register new user
- POST `/api/Auth/login` - Authenticate user
- GET `/api/Auth/ping` - Health check endpoint

### Budget Endpoints
- GET `/api/Budget` - List all budgets
- POST `/api/Budget` - Create new budget
- GET `/api/Budget/{id}` - Get specific budget

### Transaction Endpoints
- GET `/api/Transaction` - List all transactions
- POST `/api/Transaction` - Create new transaction
- GET `/api/Transaction/budget/{budgetId}` - Get transactions for budget

## Development Notes
- The application uses JWT tokens with a 7-day expiration
- CORS is configured to allow requests from the frontend application
- Swagger documentation is available at `/swagger` when running in Development mode
