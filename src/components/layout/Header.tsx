import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import styles from './Header.module.css';

export function Header() {
  const { tema, toggleTheme } = useTheme();
  const nomeUsuario = useAppStore((s) => s.config.nomeUsuario);

  const ThemeIcon = tema === 'light' ? Sun : tema === 'dark' ? Moon : Monitor;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        USF Track{' '}
        {nomeUsuario && <span>— {nomeUsuario}</span>}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
          title={`Tema: ${tema}`}
          aria-label="Alternar tema"
        >
          <ThemeIcon size={18} />
        </button>
      </div>
    </header>
  );
}
