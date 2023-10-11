# Resumatic

Job applications can be time-consuming, and creating a well-crafted resume can be challenging. ***Resumatic*** solves this problem by using ***AI*** and a powerful tech stack to help users generate professional and appealing resumes quickly.

## Video Demo

<div align="center">



https://github.com/NacarateJ/resumatic/assets/114256348/8e219c1d-42c1-43fd-af0f-bc7e0bdcb61a



<div/>
 
## Setup & Usage
- Clone the repository and navigate to the project directory.
- Install dependencies: `npm install`

### Database Configuration

1. Create a `.env` file in the root of your project directory based on the provided `example.env` file.
   - ***API Keys***: You'll need to obtain API keys for OpenAI and configure them in the project.

2. Open the `.env` file and add the following line, replacing the placeholders with your PostgreSQL database connection details:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
   ```

   - `username`: Your PostgreSQL username.
   - `password`: Your PostgreSQL password.
   - `localhost`: The address where your PostgreSQL server is running.
   - `5432`: The port on which PostgreSQL is running (default is 5432).
   - `mydatabase`: The name of your PostgreSQL database.

#### Generate Prisma Client

Run the following command to generate the Prisma Client based on the schema defined in `schema.prisma`:

```bash
npx prisma generate
```

#### Run Migrations

If there are database migrations provided in the `prisma/migrations` folder, apply them to your local database:

```bash
npx prisma db push
```

### Seed Database

```bash
node prisma/seed.js
or
npx prisma db seed
```

#### Reset Database

```bash
npx prisma migrate reset
```

#### Start Prisma Studio

To interact with your database using Prisma Studio, run the following command:

```bash
npx prisma studio
```

This will open Prisma Studio in your default web browser, allowing you to explore and manipulate your data.

#### Start the Application

You're all set! Start the Next.js development server:

```bash
npm run dev
```

Resumatic should now be running locally at http://localhost:3000.

## Features
1. ***AI-Powered Enhancements***: OpenAI API is integrated into Resumatic to elevate the quality and appeal of the generated resumes. The AI enhancement is applied to key sections of the resume, including the *profile*, *work experience*, and *projects*. This ensures that the user's resume stands out in a competitive job market.

2. ***Real-Time Preview***: Resumatic offers a real-time preview of the PDF resume being generated. This feature allows users to see how their resume is shaping up and make immediate adjustments as needed.

3. ***Download and Share Options***: Once the resume is complete, users can *download the PDF* version of their resume, ready for submission to job applications. Additionally, they can generate a *shareable link* for the resume file, making it easy to send to potential employers or share on professional platforms.

4. ***Efficiency and Time Savings***: The combination of *AI enhancements* and an intuitive user interface significantly reduces the time required to create a professional resume. This efficiency is particularly beneficial for job seekers with busy schedules.

## Technologies
- [Next.js](https://nextjs.org/): Resumatic is built on a Next.js framework, enabling server-side rendering and efficient routing. 
- [Prisma](https://www.prisma.io/): Prisma serves as the server-side library responsible for connecting to a PostgreSQL local database. It enables efficient data retrieval and storage, ensuring the smooth operation of the resume generator.
- [PostgreSQL](https://www.postgresql.org/): PostgreSQL open-source relational database management system is used as the local database for Resumatic, storing user data and resume information securely.
- [Material UI React Component Library](https://mui.com/material-ui/): Material UI is used to create a polished and visually appealing front end, ensuring a consistent and user-friendly design, enhancing the overall user experience.
- [OpenAI API](https://platform.openai.com/docs/introduction): The OpenAI API is a key component of Resumatic's AI-enhanced features. It is integrated into the project to improve the quality and appeal of specific resume sections. OpenAI's natural language generation capabilities enhance the content of the resumes, making them more compelling.
- [React-pdf](https://react-pdf.org/): Enables the rendering and display of the PDF version of the generated resumes. It enhances the project's capabilities by providing users with a downloadable, professional resume in PDF format.
