FROM node:22.14 AS build

WORKDIR /app
COPY package*.json /app


COPY . .
RUN corepack enable
RUN pnpm install build-tools bindings
RUN pnpm install
RUN pnpm run build
RUN pnpm prune --production

FROM node:22.14 AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
ENTRYPOINT ["node", "build"]



