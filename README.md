# 🍺 Beer Fridge API

A TypeScript REST API for managing a smart beer fridge system built with ExpressoTS, Prisma, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🍺 **Beer Management**: Create, read, update, and delete beer inventory
- 🚪 **Fridge Events**: Track fridge opening, beer consumption, and restocking
- 📊 **Event Logging**: Comprehensive audit trail of all fridge activities
- 🔒 **Type Safety**: Full TypeScript implementation with strict typing
- 🛡️ **Security**: Helmet, CORS, rate limiting, and input validation
- 🗄️ **Database**: PostgreSQL with Prisma ORM
- 📝 **Logging**: Structured logging with Winston
- 🧪 **Testing**: Jest test suite with coverage reporting
- 📚 **Documentation**: Comprehensive API documentation

## 🛠️ Tech Stack

- **Framework**: [ExpressoTS](https://expresso-ts.com/) (TypeScript + Express.js)
- **Database**: PostgreSQL with [Prisma ORM](https://prisma.io/)
- **Validation**: class-validator + class-transformer
- **Security**: Helmet, CORS, express-rate-limit
- **Logging**: Winston
- **Testing**: Jest + Supertest
- **Code Quality**: ESLint + Prettier
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 13.0
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beer-fridge
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your database**
   ```bash
   # Edit .env with your database URL
   DATABASE_URL="postgresql://username:password@localhost:5432/beer_fridge"
   ```

5. **Run database migrations**
   ```bash
   pnpm db:migrate
   pnpm db:generate
   ```



## ⚙️ Configuration

### Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/beer_fridge"

# Server
PORT=3000
NODE_ENV=development

# Application
APP_NAME="Beer Fridge API"
APP_VERSION="1.0.0"

# Logging
LOG_LEVEL=info

# Security (optional)
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001"
```

## 🎯 Usage

### Development Mode
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```



### Database Operations
```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Reset database
pnpm db:reset

# View database in Prisma Studio
pnpm db:studio
```

## 📡 API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/health` | Health check endpoint |

### Beer Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/beer` | Get all beers |
| `GET` | `/v1/beer/:id` | Get beer by ID |
| `POST` | `/v1/beer` | Create new beer |
| `DELETE` | `/v1/beer/:id` | Delete beer |

### Fridge Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/fridge/open` | Open fridge and log event |

### Example Requests

**Health Check:**
```bash
curl http://localhost:3000/v1/health
```

**Create Beer:**
```bash
curl -X POST http://localhost:3000/v1/beer \
  -H "Content-Type: application/json" \
  -d '{
    "type": "IPA",
    "brand": "Craft Brewery",
    "volumeML": 500,
    "quantity": 12
  }'
```

**Open Fridge:**
```bash
curl -X POST http://localhost:3000/v1/fridge/open \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'
```

## 🗄️ Database Schema

### Beer Model
```prisma
model Beer {
  id         Int          @id @default(autoincrement())
  type       String       // Beer type (IPA, Lager, etc.)
  brand      String       // Brand name
  volumeML   Int          // Volume in milliliters
  quantity   Int          // Quantity in stock
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
  events     FridgeEvent[]
}
```

### FridgeEvent Model
```prisma
model FridgeEvent {
  id         Int          @id @default(autoincrement())
  type       EventType    // OPENED, TOOK_BEER, RESTOCKED, ALERT_EMPTY
  message    String?      // Optional event message
  createdAt  DateTime     @default(now())
  beerId     Int?         // Optional beer reference
  beer       Beer?        @relation(fields: [beerId], references: [id])
}
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov

# Run specific test file
pnpm test beer.controller.spec.ts
```

### Test Coverage
The project maintains >80% test coverage across all modules.

## 🔧 Development

### Code Quality
```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

### Project Structure
```
src/
├── common/              # Shared utilities
│   ├── exceptions/      # Custom exceptions
│   ├── middleware/      # Custom middleware
│   └── utils/          # Utility functions
├── config/             # Configuration files
├── modules/            # Feature modules
│   ├── beer/          # Beer management
│   └── fridge/        # Fridge operations
├── useCases/          # Application use cases
├── infra/             # Infrastructure layer
│   └── database/      # Database configuration
├── app.ts             # Application setup
├── main.ts            # Entry point
└── env.ts             # Environment configuration
```

### Key Improvements Made

1. **Input Validation**: Added DTOs with class-validator decorators
2. **Error Handling**: Comprehensive error handling with custom exceptions
3. **Security**: Helmet, CORS, rate limiting, and input sanitization
4. **Logging**: Structured logging with Winston
5. **Type Safety**: Proper DTOs and response types
6. **Testing**: Comprehensive test suite with high coverage
7. **Documentation**: Complete API documentation
8. **Environment Management**: Proper environment configuration
9. **Code Quality**: Strict ESLint rules and Prettier formatting

## 🚀 Deployment
```bash
# Build for production
pnpm build

# Start production server
NODE_ENV=production pnpm start
```

### Environment Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Start the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow conventional commit messages
- Ensure all tests pass before submitting PR
- Maintain >80% test coverage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@beer-fridge-api.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/beer-fridge/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/beer-fridge/discussions)

## 🙏 Acknowledgments

- [ExpressoTS](https://expresso-ts.com/) - The TypeScript framework
- [Prisma](https://prisma.io/) - Database toolkit
- [PostgreSQL](https://postgresql.org/) - Database system

---

Made with ❤️ and 🍺