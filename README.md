# Learning Module Platform

A small end-to-end feature for an Education-as-a-Service platform that allows learners to view learning modules and track their progress.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/steve-phan/xu
   cd xu
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   yarn install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   yarn install
   ```

### Running the Application

#### Start the Backend (Port 8080)

```bash
cd backend
yarn start:dev
```

The backend API will be available at `http://localhost:8080`

#### Start the Frontend (Port 4200)

```bash
cd frontend
yarn start
```

The frontend application will be available at `http://localhost:4200`

### NEXT STEPS (If I have more time)

- Add filtering, pagination, and sorting (backend query API + frontend controls)
- Add authentication (JWT) and rate limiting to protect the API
- In the frontend, render items grouped by category to improve discoverability
- Consider GraphQL for client-driven queries (trade-off: increased complexity)
- Replace in-memory seed with a real database (MongoDB via Mongoose or Prisma)
- Containerize the application (Docker + docker-compose)
