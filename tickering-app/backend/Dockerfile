# Use a Node.js base image (matches your package.json needs)
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# We copy package.json first so Docker can cache the install step
COPY package*.json ./

# Install mysql2 and other dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port your server.js is listening on
EXPOSE 8000

# Start the application
CMD [ "node", "server.js" ]