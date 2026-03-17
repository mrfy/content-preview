FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- runtime

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/.output .output
COPY --from=build /app/package*.json ./

RUN npm ci --omit=dev

RUN addgroup -g 1001 nodejs \
  && adduser -D -u 1001 -G nodejs nodejs

USER nodejs

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]