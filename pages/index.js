import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Welcome to Resumatic, your go-to resume builder app 🚀</h1>
    </main>
  );
}


// pages/api/index.js
export { default as dbTest } from './api/db-test';