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

# Setup environment (the default DATABASE_URL points at the compose database)
cp .env.example .env

# Start PostgreSQL (exposed on localhost:5433)
docker compose up -d db

# Database setup
pnpm db:generate
pnpm db:migrate

# Start development server
pnpm dev
```

## 📡 API Endpoints

| Method | Endpoint | Description | Success |
|--------|----------|-------------|---------|
| `GET` | `/v1` | Health check | `200` |
| `GET` | `/v1/beer` | List all beers | `200` |
| `GET` | `/v1/beer/:id` | Get beer by ID | `200` + beer |
| `POST` | `/v1/beer` | Create new beer | `201` + beer |
| `PUT` | `/v1/beer/:id` | Update beer (partial fields allowed) | `200` + updated beer |
| `DELETE` | `/v1/beer/:id` | Delete beer | `204`, no body |
| `POST` | `/v1/fridge/open` | Open fridge: records an `OPENED` event and returns all beers | `201` |

Invalid input (body fields, a non-numeric `:id`, a non-string `userId`) returns `400` and a missing beer returns `404`, both in the same shape:

```json
{ "success": false, "message": "Beer ID must be a positive integer", "statusCode": 400, "timestamp": "...", "path": "/v1/beer/abc" }
```

### Fridge events

Only `OPENED` events are recorded today (by `POST /v1/fridge/open`, with an optional `userId` in the message). `TOOK_BEER`, `RESTOCKED` and `ALERT_EMPTY` exist in the `EventType` enum but nothing records them yet, and there is no endpoint to read events.

## 🏗️ Architecture

ExpressoTS enforces a clean, modular architecture following these key patterns:

### **Module-Based Organization**
Each feature (`src/modules/beer`, `src/modules/fridge`) is a self-contained module registered in `AppModule` (`src/useCases/app/app.module.ts`):

- **Controllers** - Handle HTTP concerns: routing, path params, status codes, logging
- **Use Cases** - One class per operation (e.g. `CreateBeerUseCase`, `OpenFridgeUseCase`); validate the input DTO and call the repositories
- **DTOs** - Define data contracts; `class-validator` rules are enforced by `validateDto` inside the use cases
- **Repositories** - `PrismaBeerRepository` and `PrismaFridgeEventRepository` (`src/infra/database/prisma`) wrap the Prisma client exposed by `PrismaService`

Errors are thrown as `AppException` subclasses (`ValidationException` → 400, `NotFoundException` → 404) and rendered by `errorHandlerMiddleware`.

### **Dependency Injection**
ExpressoTS uses decorator-based DI; use cases receive the concrete repositories they need:

```typescript
@injectable()
export class CreateBeerUseCase {
    constructor(
        @inject(PrismaBeerRepository) private beerRepo: PrismaBeerRepository,
    ) {}
}
```

### **Request Flow Example**
```
HTTP Request → Controller → Use Case (validateDto) → Prisma Repository → PrismaService → PostgreSQL
```

This structure promotes testability, maintainability, and follows SOLID principles naturally.

## 🧪 Testing

Unit tests (`test/unit`) need no database. The integration suite `test/beer.controller.spec.ts` needs `DATABASE_URL` pointing at a migrated PostgreSQL database; it is read from the environment or from `.env`, and the suite fails with an explicit message when it is missing. Tests create rows, so prefer a dedicated database. Servers listen on a random free port, so a running `pnpm dev` does not conflict.

```bash
# Test database (using the compose PostgreSQL)
docker compose up -d db
export DATABASE_URL="postgresql://postgres:postgres@localhost:5433/beer_fridge_test"
pnpm db:migrate:prod

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

**3. Rough edges found in this POC**
- `initEnvironment` and `Env.checkFile` call `process.exit(1)` when there is no `.env` file, which breaks test runs and containers configured only through environment variables (this API loads and validates env in `src/config/env.config.ts` instead)
- `PUT`/`PATCH`/`DELETE` default to `204`, so a returned body is silently dropped unless the route sets `@Http(200)`
- A handler must still return a value: the Express adapter only sends a response when the result is not `undefined`, so a `void` handler leaves the request hanging (`DELETE /v1/beer/:id` returns a body that the `204` discards for this reason)
- The opinionated build expects a `register-path.js` in the project root to resolve path aliases in production
- `@expressots/shared` requires `chalk` at runtime but only declares it as a dev dependency, so production installs must add it explicitly
- `@Get("/health")` on the root `@controller("/")` is not reachable (`GET /v1/health` returns 404), so `/v1` is used as health check

### 🎯 **Overall Assessment**

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

## 🐳 Docker

**Development** (`docker-compose.yml`): runs the API with hot reload on `localhost:3000` and PostgreSQL on `localhost:5433`.

```bash
docker compose up        # or: pnpm docker:dev
docker compose exec app pnpm db:migrate:prod   # first run: apply migrations
docker compose down      # or: pnpm docker:down
```

**Production image** (`Dockerfile`): builds the app and runs `dist/src/main.js` with production dependencies only. Configuration comes from environment variables and migrations are not applied by the container, so run `pnpm db:migrate:prod` against the target database first.

```bash
docker build -t beer-fridge-api .
docker run --rm -p 3000:3000 \
  -e DATABASE_URL="postgresql://postgres:postgres@host.docker.internal:5433/beer_fridge" \
  beer-fridge-api
```

## 📊 Example Usage

```bash
# Create a beer
curl -X POST http://localhost:3000/v1/beer \
  -H "Content-Type: application/json" \
  -d '{"type": "IPA", "brand": "Local Brewery", "volumeML": 500, "quantity": 12}'

# Update beer quantity (returns the updated beer)
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

## License

MIT — see [LICENSE](LICENSE).
