import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div id='layout-wrap'>
      <Navbar id='navbar' />
      <main id='main' style={{ minHeight: 'calc(100vh - 150px)' }}>
        {children}
      </main>
      <Footer id='footer' />
    </div>
  );
}
