# Build stage
FROM node:23-slim as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Nginx stage
FROM nginx:alpine

# Copie le build React
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie la config personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
