import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 150px)'}}>
        {children}
      </main>
      <Footer />
    </>
  );
}
