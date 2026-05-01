import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useTheme() {
  const { config, updateConfig } = useAppStore();
  const tema = config.tema;

  useEffect(() => {
    const root = document.documentElement;
    if (tema === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', tema);
    }
  }, [tema]);

  const toggleTheme = () => {
    const next = tema === 'light' ? 'dark' : tema === 'dark' ? 'auto' : 'light';
    updateConfig({ tema: next });
  };

  const isDark =
    tema === 'dark' ||
    (tema === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return { tema, toggleTheme, isDark };
}
