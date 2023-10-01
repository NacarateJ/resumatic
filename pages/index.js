import { Inter } from 'next/font/google';
import EditLanguage from '@/components/EditLanguageSection/EditLanguage';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <h1>Welcome to Resumatic, your go-to resume builder app 🚀</h1>
      <EditLanguage />
 </main>
  );
}
