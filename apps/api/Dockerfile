FROM node:20-alpine AS base
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/.gitignore /app/.gitignore
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY --from=builder /app /app

RUN pnpm build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

USER nestjs

COPY --from=installer --chown=nestjs:nodejs /app/package.json /app/package.json
COPY --from=installer --chown=nestjs:nodejs /app/dist /app/dist
COPY --from=installer --chown=nestjs:nodejs /app/node_modules /app/node_modules

EXPOSE 3001
ENV PORT 3001

CMD ["npm","run","start:prod"]
