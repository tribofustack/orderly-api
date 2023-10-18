# Use a base image
FROM node:16.10

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files from host to container
COPY . .

# Expose API port to the outside
EXPOSE 3000

# Run application
CMD ["npm", "run", "start:dev"]