import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import StickyWhatsApp from './StickyWhatsApp.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--header-h)' }}>
        <Outlet />
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
}
