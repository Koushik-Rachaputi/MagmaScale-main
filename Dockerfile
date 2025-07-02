# Stage 1: Build the Angular SSR app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the SSR server
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist/magma-scale /app/dist/magma-scale
COPY --from=build /app/node_modules /app/node_modules
EXPOSE 4000
CMD ["node", "dist/magma-scale/server/server.mjs"] 