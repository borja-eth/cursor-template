# Install dependencies only when needed
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock .npmrc ./


RUN --mount=type=secret,id=NPM_TOKEN \
    --mount=type=secret,id=NEXT_PUBLIC_TURNSTILE_API_KEY \
    NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) \
    NEXT_PUBLIC_TURNSTILE_API_KEY=$(cat /run/secrets/NEXT_PUBLIC_TURNSTILE_API_KEY) \
    yarn 

# Rebuild the source code only when needed
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

ENV NPM_TOKEN= 

RUN --mount=type=secret,id=NEXT_PUBLIC_TURNSTILE_API_KEY \
    NEXT_PUBLIC_TURNSTILE_API_KEY=$(cat /run/secrets/NEXT_PUBLIC_TURNSTILE_API_KEY) \ 
    yarn build

ENV NODE_ENV production

# USER bloguser

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]