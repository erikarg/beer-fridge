# 🍺 Beer Fridge API - ExpressoTS POC

A proof-of-concept REST API built to evaluate **ExpressoTS** framework capabilities. This project implements a simple beer inventory management system to test ExpressoTS patterns, architecture, and developer experience.

## 🎯 POC Objectives

- Evaluate ExpressoTS dependency injection and modular architecture
- Test TypeScript-first development experience
- Assess integration with Prisma ORM and PostgreSQL
- Validate production-ready patterns (validation, logging, error handling)

## 🛠️ Tech Stack

- **Framework**: [ExpressoTS](https://expresso-ts.com/) 3.0
- **Database**: PostgreSQL + Prisma ORM
- **Validation**: class-validator + class-transformer
- **Testing**: Jest + Supertest
- **Code Quality**: ESLint + Prettier

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your database URL

# Database setup
pnpm db:generate
pnpm db:migrate

# Start development server
pnpm dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1` | Health check |
| `GET` | `/v1/beer` | List all beers |
| `GET` | `/v1/beer/:id` | Get beer by ID |
| `POST` | `/v1/beer` | Create new beer |
| `PUT` | `/v1/beer/:id` | Update beer |
| `DELETE` | `/v1/beer/:id` | Delete beer |
| `POST` | `/v1/fridge/open` | Open fridge (logs event) |

## 🏗️ Architecture

ExpressoTS enforces a clean, modular architecture following these key patterns:

### **Module-Based Organization**
Each feature is organized as a self-contained module with clear responsibilities:

- **Controllers** - Handle HTTP requests/responses
- **Use Cases** - Encapsulate business logic operations  
- **Services** - Manage domain logic and data operations
- **DTOs** - Define data contracts and validation
- **Repositories** - Abstract data access layer

### **Dependency Injection**
ExpressoTS uses decorator-based DI for clean separation of concerns:

```typescript
@injectable()
export class BeerService {
    constructor(
        @inject(PrismaBeerRepository) private beerRepo: PrismaBeerRepository
    ) {}
}
```

### **Layered Architecture**
The application follows a layered approach:

1. **Presentation Layer** - Controllers handle HTTP concerns
2. **Application Layer** - Use cases orchestrate business operations
3. **Domain Layer** - Services contain business logic
4. **Infrastructure Layer** - Repositories and external integrations

### **Request Flow Example**
```
HTTP Request → Controller → Use Case → Service → Repository → Database
```

This structure promotes testability, maintainability, and follows SOLID principles naturally.

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test:cov

# Watch mode
pnpm test:watch
```

## 📝 ExpressoTS Evaluation

### ✅ **What I Liked**

**1. TypeScript-First Approach**
- Excellent type safety out of the box
- Great IntelliSense and developer experience
- No configuration overhead for TypeScript

**2. Dependency Injection**
- Clean, decorator-based DI system
- Easy to test and mock dependencies
- Promotes SOLID principles naturally

**3. Modular Architecture**
- Clear separation of concerns
- Scalable module system
- Easy to organize features

**4. ExpressoTS CLI**
- Helpful scaffolding commands
- Consistent project structure
- Good development workflow

### ⚠️ **Areas for Improvement**

**1. Documentation**
- Limited examples for complex scenarios
- Could use more real-world patterns
- Migration guides from other frameworks

**2. Learning Curve**
- Requires understanding of DI patterns
- Module system can be complex for beginners
- Smaller community compared to NestJS

### 🎯 **Overall Assessment**

**Score: 9/10**

ExpressoTS provides a solid foundation for building scalable TypeScript APIs. The framework successfully combines Express.js simplicity with modern architectural patterns. It's particularly well-suited for teams that:

- Value TypeScript-first development
- Want clean architecture without complexity
- Need good testability and maintainability
- Prefer convention over configuration

**Recommendation**: Good choice for medium to large TypeScript projects where code organization and maintainability are priorities.

## 🔧 Development

```bash
# Code quality
pnpm lint
pnpm format
pnpm type-check

# Database operations
pnpm db:studio
pnpm db:reset
```

## 📊 Example Usage

```bash
# Create a beer
curl -X POST http://localhost:3000/v1/beer \
  -H "Content-Type: application/json" \
  -d '{"type": "IPA", "brand": "Local Brewery", "volumeML": 500, "quantity": 12}'

# Update beer quantity
curl -X PUT http://localhost:3000/v1/beer/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 8}'

# Open fridge
curl -X POST http://localhost:3000/v1/fridge/open \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'
```

---

**Built with 🐎, ❤️ and 🍺**