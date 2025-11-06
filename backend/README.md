# Monster Energy Catalog - Backend API

Backend REST API for Monster Energy product catalog application.

## Features

- RESTful API architecture
- TypeScript for type safety
- Express.js framework
- In-memory data storage (no database)
- CORS enabled for frontend integration
- Comprehensive error handling
- Request validation with Zod
- API versioning support

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
NODE_ENV=development
PORT=3000
API_VERSION=v1
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## Development

Start development server with hot reload:

```bash
npm run dev
```

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

## Production

Start production server:

```bash
npm start
```

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Linting

Check code quality:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

## API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Health Check

```
GET /health
```

Returns server health status.

### API Endpoints

#### External Routes (Public)

```
/api/v1/external/*
```

Public endpoints accessible without authentication.

#### Internal Routes (Authenticated)

```
/api/v1/internal/*
```

Protected endpoints requiring authentication.

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # Version 1 endpoints
│       ├── external/       # Public endpoints
│       └── internal/       # Protected endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── config/                 # Configuration
└── server.ts               # Application entry point
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "metadata": {
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {}
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Development Guidelines

- Follow TypeScript strict mode
- Use ESLint for code quality
- Write tests for all business logic
- Document API endpoints with TSDoc
- Use semantic commit messages
- Keep functions small and focused
- Implement proper error handling

## License

ISC
