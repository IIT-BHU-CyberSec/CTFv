# CTFv

## Setup

The repository is in a mono-repo format. The packages directory contains the two packages, ctfv-frontend and ctfv-backend. The frontend is a React app and the backend is a Hono.js app.

- First `bun install` in the root directory to install the dependencies.
- Then in `packages/ctfv-backend`, run `bun run migration:local` to setup the database.
- And then in `packages/ctfv-backend`, add the .dev.vars file (copy it from the .dev.vars.example).

- Then from the root directory, run `bun run dev` to start both the backend and frontend.

- Periodically, you may need to run `bun run migration:local` to update the database schema, and also `bun run clean` to reset the database.

- To Populate the Databse cd into packages/ctfv-backend and run `bun run populate:local` you may need to clear the database and apply the migrations first

- This adds 1 admin account 19 non admin accounts and 35 challenges, 5 of each mentioned type

- You can then log into admin account using the credentials `ADMIN@iitbhu.ac.in` and the password for ALL accounts is `cops`

- For any further info you can check `./packages/ctfv-backend/src/db/populate.sql`
