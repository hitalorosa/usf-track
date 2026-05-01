import { NavLink } from 'react-router-dom';
import { Home, CalendarDays, CheckSquare, BarChart2, Settings } from 'lucide-react';
import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/agenda', icon: CalendarDays, label: 'Agenda', end: false },
  { to: '/tarefas', icon: CheckSquare, label: 'Tarefas', end: false },
  { to: '/stats', icon: BarChart2, label: 'Stats', end: false },
  { to: '/config', icon: Settings, label: 'Config', end: false },
];

export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `${styles.item}${isActive ? ` ${styles.active}` : ''}`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
