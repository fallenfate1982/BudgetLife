BudgetLife
==========

A React-based frontend application for the BudgetLife project, helping users manage their personal finances effectively.

## Features
- Modern React (v16.9.0) frontend with Material-UI
- Webpack-based build system with hot reloading
- JWT authentication system
- Responsive dashboard with financial analytics
- ESLint configuration for code quality

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Running backend service (see Services/README.md)

### Environment Configuration
The frontend is configured to proxy API requests to the backend service. By default, it expects the backend to be running at:
```
http://localhost:60960
```

### Installation and Running
1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
export NODE_OPTIONS=--openssl-legacy-provider  # Required for older Node.js versions
npm run build
```

3. Start the development server:
```bash
npm start
```
The application will be available at `http://localhost:3000`

## Authentication

### Test Credentials
You can use these test accounts to log in:

1. Default test account:
   - Email: test@example.com
   - Password: Test123!

2. Alternative test account:
   - Email: test1736564120@example.com
   - Password: Test123!

### Login Flow
1. Navigate to http://localhost:3000/login
2. Enter your email and password
3. On successful login, you will be redirected to the dashboard
4. Use the logout button in the top-right corner to end your session

## Project Structure
- `/app` - Main application source code
  - `/components` - React components
  - `/context` - React context providers
  - `/services` - API service integrations
- `/dist` - Build output directory

## API Integration
The frontend communicates with the backend API using axios. All API calls are proxied through webpack-dev-server to avoid CORS issues during development. The API configuration can be found in:
- `app/services/api.js` - API client configuration
- `webpack.config.js` - Development proxy settings
