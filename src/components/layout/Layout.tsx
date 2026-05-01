import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './Layout.module.css';

export function Layout() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.body}>
        {isDesktop && <Sidebar />}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      {!isDesktop && <BottomNav />}
    </div>
  );
}
