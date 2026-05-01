import { NavLink } from 'react-router-dom';
import { Home, CalendarDays, CheckSquare, BarChart2, Settings } from 'lucide-react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/agenda', icon: CalendarDays, label: 'Agenda', end: false },
  { to: '/tarefas', icon: CheckSquare, label: 'Tarefas', end: false },
  { to: '/stats', icon: BarChart2, label: 'Estatísticas', end: false },
  { to: '/config', icon: Settings, label: 'Configurações', end: false },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Menu lateral">
      {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `${styles.item}${isActive ? ` ${styles.active}` : ''}`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
