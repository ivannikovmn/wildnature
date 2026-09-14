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

## Documentation

* ER Diagram: https://www.figma.com/board/q4fS21cwD6nMcJ8QVx9WVN/WildNature-Database

## API Testing

Postman collection:

* `wildnature.postman_collection.json`

## Stack

* Docker + PostgreSQL
* Node.js + Express (REST API with CORS)
* Next.js + React
* Redux Toolkit
* Axios
* Sequelize ORM
* Passport + JWT
* Nodemailer
* Bcrypt
* Multer
* CKEditor 5
* Dotenv
* Nodemon + Morgan
* PM2 (process manager, production deployment)
