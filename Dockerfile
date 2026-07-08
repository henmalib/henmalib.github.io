FROM node:26-alpine AS build
WORKDIR /app
RUN npm install -g corepack@latest && corepack enable && corepack prepare pnpm@10.33.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
RUN pnpm --filter . deploy --legacy --prod /prod

FROM node:26-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /prod ./

USER app
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
