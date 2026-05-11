FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile=false

COPY . .

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3001

CMD ["pnpm", "start:prod"]