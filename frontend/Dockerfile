# Use Node.js as base image for building React app
FROM node:21-alpine as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the React app
RUN npm run build

# Use NGINX as base image for serving the React app
FROM nginx:latest

# Remove default NGINX configuration

# Copy the built React app from the build stage to NGINX's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for serving the React app
EXPOSE 80

# Start NGINX server when the container starts
CMD ["nginx", "-g", "daemon off;"]
