FROM node:18-alpine

WORKDIR /app

# Install netcat for wait-for-it script
RUN apk add --no-cache netcat-openbsd

# Copy package files
COPY package*.json ./

# Copy prisma files
COPY prisma ./prisma/

# Copy scripts
COPY startup-scripts ./startup-scripts/

# Make scripts executable
RUN chmod +x ./startup-scripts/start.sh ./startup-scripts/wait-for-it.sh

# Install dependencies
RUN npm install --force --loglevel verbose

# Copy the rest of the application
COPY . .

# Set the start script as the entry point
CMD ["./startup-scripts/start.sh"]