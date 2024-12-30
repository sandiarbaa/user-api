# User API

This is a User API built using Express, Prisma, and Swagger for documentation. The API allows the creation and management of users with features such as checking for existing emails, creating new users, and viewing API documentation through Swagger.

## Prerequisites

Make sure you have the following installed:

- Node.js (v16 or later)
- PostgreSQL
- PG Admin (PostgreSQL Database Client)
- Prisma (Install from terminal)

## Setup and Installation

### 1. Clone the repository:

```bash
git clone https://github.com/sandiarbaa/user-api.git
cd user-api

```

### 2. Install dependencies:

```bash
npm install

```

### 3. Set up environment variables:

copy the .env.example file then paste it and change the name to .env, then fill in this:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NODE_ENV=development

```
For more complete setup instructions on connecting to Prisma, see here: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql

For example setup variabel DATABASE_URL in my machine like this :
- USER = postgres
- PASSWORD = admin
- HOST = localhost
- PORT = 5432
- DATABASE = user-api

- DATABASE_URL: Connection string to your PostgreSQL database.
- NODE_ENV: Set to development or test depending on your environment.

### 4. Migrate the database:

Make sure you already open the PostgreSQL database client like PGAdmin. And run the following prisma command to apply the database migrations:

```bash
npx prisma migrate dev

```

### 5. Start Server:

To run the server, ensure NODE_ENV=development is set in your .env file and then use:

```bash
npm run dev

```

This will start a server at http://localhost:3000 and you can try any endpoint in this project with an api client application like postman or others.

### 6. Swagger Documentation:

Once the server is running, you can access the API documentation through Swagger at:

```bash
http://localhost:3000/user-api

```

### 7. Testing:

Stop the local server.
To run the tests, ensure NODE_ENV=test is set in your .env file and then use:

```bash
npm run test

```
