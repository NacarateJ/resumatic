This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
Sure, I've added the instructions for running `npx prisma studio` to your README.md file. Here's the updated content:

### Database Configuration

1. Create a `.env` file in the root of your project directory based on the provided `example.env` file.

2. Open the `.env` file and add the following line, replacing the placeholders with your PostgreSQL database connection details:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
   ```

   - `username`: Your PostgreSQL username.
   - `password`: Your PostgreSQL password.
   - `localhost`: The address where your PostgreSQL server is running.
   - `5432`: The port on which PostgreSQL is running (default is 5432).
   - `mydatabase`: The name of your PostgreSQL database.

### Generate Prisma Client

Run the following command to generate the Prisma Client based on the schema defined in `schema.prisma`:

```bash
npx prisma generate
```

### Run Migrations

If there are database migrations provided in the `prisma/migrations` folder, apply them to your local database:

```bash
npx prisma db push
```

### Seed Database

```bash
node prisma/seed.js
```

### Reset Database

```bash
npx prisma migrate reset
```

### Start Prisma Studio

To interact with your database using Prisma Studio, run the following command:

```bash
npx prisma studio
```

This will open Prisma Studio in your default web browser, allowing you to explore and manipulate your data.

### Start the Application

You're all set! Start the Next.js development server:

```bash
npm run dev
```
