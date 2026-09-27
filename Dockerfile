FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

RUN pnpm build

# Separate stage so the `builder` target used by docker-compose keeps its
# dev dependencies. Pruning keeps the Prisma client generated above (pnpm
# stores it next to @prisma/client, not in node_modules/.prisma).
FROM builder AS prod-deps

RUN pnpm prune --prod

FROM node:20-alpine

WORKDIR /app

COPY package.json ./

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "-r", "./dist/register-path.js", "dist/src/main.js"]