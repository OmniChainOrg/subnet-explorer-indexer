# Use official Node.js LTS image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

# Expose API port
EXPOSE 4000

# Run the compiled app
CMD ["node", "dist/index.js"]
