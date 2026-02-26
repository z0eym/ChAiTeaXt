# Use Node.js for the build environment
FROM node:20-alpine

WORKDIR /app

# Copy dependency files first for faster building
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the team's code (app, lib, public, etc.)
COPY . .

# Run the Next.js/React development server
CMD ["npm", "run", "dev"]