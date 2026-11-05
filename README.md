# WildNature Volunteers Platform

A platform for volunteer event registration, attendance tracking, and certificate management.

## MVP Features

- Volunteer event information pages
- Participant registration and authentication
- Event registration and application management
- Attendance tracking
- Certificate generation after attendance confirmation
- Public certificate verification
- Admin panel for event and participant management
- Email notifications

## Project Structure

- `frontend` — client application built with Next.js and React
- `backend` — REST API built with Node.js and Express

## Setup

### Backend

```bash
cd backend
npm install
```

Create `.env` based on `.env.example` and configure the required environment variables.

Start PostgreSQL:

```bash
docker compose up -d
```

Make sure port `5432` is available for the Docker PostgreSQL container.

Run migrations:

```bash
npx sequelize-cli db:migrate
```

Run the initial role seed:

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

- Backend: `http://localhost:3010`
- Frontend: `http://localhost:3011`

## Production

The application is deployed on an Ubuntu server and managed with PM2.

### Backend

The backend runs as a separate PM2 process.

### Frontend

Build the application:

```bash
cd frontend
npm run build
```

The frontend runs as a separate PM2 process on port `3001`.

### Production URLs

- Frontend: [https://wildnature.imn.kz](https://wildnature.imn.kz)
- Backend: [https://wildnature-backend.imn.kz](https://wildnature-backend.imn.kz)

### Process Management

PM2 manages the backend, frontend, and email worker processes and restores them automatically after server reboot.

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

### Database

The database schema is documented in the ER diagram:

[WildNature Database - Figma](https://www.figma.com/board/q4fS21cwD6nMcJ8QVx9WVN/WildNature-Database)

### API Testing

Postman collection:

- `wildnature.postman_collection.json`

## Redis and Email Worker

WildNature uses Redis and BullMQ for asynchronous email processing.

The project has its own BullMQ queue:

- `wildnature-email`

Email jobs are processed by a dedicated worker.

Start the email worker manually from the backend directory:

```bash
cd backend
node app/utils/emailWorker.js
```

In production, the worker runs as a separate PM2 process:

- `wildnature-email-worker`

The worker processes queued email notifications and retries failed jobs according to the BullMQ configuration.

Email delivery uses Nodemailer with Gmail SMTP. The required environment variables include `MAIL_USER` and `MAIL_PASSWORD`.

## Continuous Integration and Deployment

GitHub Actions runs CI checks on pushes to `main`. After a successful CI run for the latest commit on `main`, a self-hosted runner on the production server prepares a separate release from that exact commit.

Releases are stored in `deploy/wildnature/releases/<commit-sha>`. The active release is selected through the `current` symlink, while runtime configuration and uploaded files are kept in a shared directory.

The new release is built before activation. After switching `current`, the deployment restarts the backend, frontend, and email worker, then checks their status and HTTP responses.

If a check fails, the deployment attempts to restore the previous release. The three most recently created releases are retained.

## Database Maintenance

- PostgreSQL data is stored in a Docker volume.
- Back up the database before migrations or destructive changes.
- Never use `docker compose down -v` on production data unless deleting the database is explicitly intended.
- Keep database credentials and JWT secrets outside version control.

## Stack

- Docker
- PostgreSQL
- Redis
- Node.js
- Express (REST API with CORS)
- Next.js
- React
- Redux Toolkit
- Axios
- Sequelize ORM
- Passport + JWT
- Nodemailer (Gmail SMTP)
- BullMQ
- Bcrypt
- Multer
- CKEditor 5
- Dotenv
- Nodemon + Morgan
- PM2
- Vitest
- Playwright
- GitHub Actions