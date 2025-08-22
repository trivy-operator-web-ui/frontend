FROM node:24.12.0-alpine3.22 AS build

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build-prod

FROM nginxinc/nginx-unprivileged:1.29.5-alpine-slim

COPY --from=build /app/dist/trivy-operator-web-ui/browser/. /usr/share/nginx/html/.