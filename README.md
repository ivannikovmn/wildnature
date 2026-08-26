# WildNature Volunteers Platform

A platform for volunteer event registration and certificate management.

## MVP Features

- Event information page
- Participant registration
- Attendance tracking
- Certificate generation
- Admin panel

## Project Structure

- `frontend` — client application
- `backend` — server application

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
Make sure port 5432 is available for the Docker PostgreSQL container.

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

### Run backend

Development:

```bash
npm run dev
```

Production:
```bash
npm run prod
```

### Run frontend

```bash
npm run dev
```

### Backend URL

```text
http://localhost:3000
```

### Frontend URL

```text
http://localhost:3000
```

## Documentation

- ER Diagram: https://www.figma.com/board/q4fS21cwD6nMcJ8QVx9WVN/WildNature-Database

## API Testing

Postman collection:
- wildnature.postman_collection.json

## Stack
- Docker + PostgreSQL
- Node.js + Express (REST API with CORS)
- Next.js + React
- Sequelize ORM
- Passport + JWT
- Nodemailer
- Bcrypt
- Multer
- Dotenv
- Nodemon + Morgan
