# WildNature Volunteers Platform

A platform for volunteer event registration and certificate management.

## MVP Features

* Event information page
* Participant registration
* Attendance tracking
* Certificate generation
* Admin panel

## Project Structure

* `frontend` — client application
* `backend` — server application

## Setup

### Backend

```bash
cd backend
npm install
```

Create `.env` based on `.env.example`.

Start PostgreSQL:

```bash
docker compose up -d
```

Make sure port `5432` is available for the Docker PostgreSQL container.

Run migrations:

```bash
npx sequelize-cli db:migrate
```

Run seed:

```bash
npx sequelize-cli db:seed --seed seedRole.js
```

### Frontend

```bash
cd frontend
npm install
```

## Development

### Run backend

```bash
cd backend
npm run dev
```

### Run frontend

```bash
cd frontend
npm run dev
```

### Local URLs

Backend:

```text
http://localhost:3010
```

Frontend:

```text
http://localhost:3011
```

## Production

The application is deployed on an Ubuntu server and managed with PM2.

### Backend

```bash
cd backend
npm start
```

### Frontend

Build the application:

```bash
cd frontend
npm run build
```

Start the production server:

```bash
npm start -- -p 3001
```

PM2 is used to keep the backend and frontend processes running and restore them automatically after server reboot.

### Production URLs

Frontend:

```text
https://wildnature.imn.kz
```

Backend:

```text
https://wildnature-backend.imn.kz
```

## Testing

### Frontend unit tests

Run unit tests with Vitest:

```bash
cd frontend
npm test
```

### Frontend E2E tests

Run E2E tests with Playwright:

```bash
cd frontend
npm run test:e2e
```

## Documentation

* ER Diagram: https://www.figma.com/board/q4fS21cwD6nMcJ8QVx9WVN/WildNature-Database

## API Testing

Postman collection:

* `wildnature.postman_collection.json`

## Redis and Email Worker

Start Redis from the project root:

```bash
docker compose -f backend/docker-compose.redis.yml up -d
docker exec wildnature-redis redis-cli ping
```

Expected response: `PONG`.

Start the email worker from the backend directory:

```bash
cd backend
node app/utils/emailWorker.js
```

The worker processes queued email notifications and retries failed jobs
according to the BullMQ queue configuration. Ensure the backend `.env`
contains `MAIL_USER` and `MAIL_PASSWORD`.

In production, run the worker as a separate PM2 process:

```bash
cd backend
pm2 start app/utils/emailWorker.js --name wildnature-email-worker
pm2 save
```

## Continuous Deployment

GitHub Actions runs CI checks on pushes to `main`. After a successful CI
run for the latest commit on `main`, a self-hosted runner on the production
server prepares a separate release from that exact commit.

Releases are stored in `deploy/wildnature/releases/<commit-sha>`.
The active release is selected through the `current` symlink, while runtime
configuration and uploaded files are kept in a shared directory.

The new release is built before activation. After switching `current`,
the deployment restarts the backend, frontend, and email worker, then checks
their status and HTTP responses. If a check fails, it attempts to restore
the previous release. The three most recently created releases are retained.

## Stack

* Docker + PostgreSQL + Redis
* Node.js + Express (REST API with CORS)
* Next.js + React
* Redux Toolkit
* Axios
* Sequelize ORM
* Passport + JWT
* Nodemailer (email delivery via Gmail SMTP)
* BullMQ + ioredis (background email jobs with retries)
* Bcrypt
* Multer
* CKEditor 5
* Dotenv
* Nodemon + Morgan
* PM2 (process manager, production deployment)
* Vitest (frontend unit tests)
* Playwright (E2E testing)