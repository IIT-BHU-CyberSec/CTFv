# CTFv

## Setup

The repository is in a mono-repo format. The packages directory contains the two packages, ctfv-frontend and ctfv-backend. The frontend is a React app and the backend is a Hono.js app.

- First `bun install` in the root directory to install the dependencies.

### Backend

- Then in the backend directory, run `bun run migration:local` to setup the database.
- Then run `bun run start` in the backend directory to start the backend server.

### Frontend

- In the frontend directory, run `bun run start` to start the frontend server.