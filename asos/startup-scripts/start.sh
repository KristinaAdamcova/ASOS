#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
/app/startup-scripts/wait-for-it.sh db:5432

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Create initial migration if it doesn't exist
echo "Creating initial migration..."
npx prisma migrate dev --name init --create-only

# Deploy migrations
echo "Deploying migrations..."
npx prisma migrate deploy

# Start the application
echo "Starting the application..."
npm run dev