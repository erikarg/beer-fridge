FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

RUN pnpm build

# Keeps the Prisma client generated above (pnpm stores it next to
# @prisma/client, not in node_modules/.prisma).
RUN pnpm prune --prod

FROM node:20-alpine

WORKDIR /app

COPY package.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "-r", "./dist/register-path.js", "dist/src/main.js"]