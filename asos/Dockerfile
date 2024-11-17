FROM node:latest

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy prisma files
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Clear Next.js cache and build
RUN rm -rf .next
RUN npm run build

# Enable hot reloading
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true