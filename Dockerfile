#Docker image and stage naming
FROM node:lts-alpine AS build-and-test-stage

# Set working directory 
WORKDIR /app
# Copy package and package-lock.json to working directory
COPY package*.json .
# Install Dependencies (create node_modules folder)
RUN npm i
# Copy source code to working directory
COPY ./ /app/

EXPOSE 5173
# Run eslint tests (eslint ./src)  -- Optional
RUN npm run lint 
# Build optimized build (HTML-JS only output)
RUN npm run build