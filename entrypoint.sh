#!/usr/bin/env sh
set -e

### Run DB Migrations
echo "Running database migrations..."
npm run db:migrate
echo "Database migrations completed."

### Start the Application
echo "Starting the application..."

exec "$@"
