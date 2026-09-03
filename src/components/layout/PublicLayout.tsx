import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export function PublicLayout() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, paddingTop: 'var(--navbar-height)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
