FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/prisma prisma/
COPY --from=builder /app/prisma.config.ts .
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 8000
ENV NODE_ENV=production
ENV SERVER_PORT=8000
ENV SERVER_PROTOCOL_HEADER="X-Forwarded-Proto"
ENV SERVER_HOST_HEADER="X-Forwarded-Host"
ENV SERVER_ADDRESS_HEADER="X-Forwarded-For"
CMD [ "sh", "-c", "npm run db:deploy && node build" ]