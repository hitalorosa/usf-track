import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AgendaPage } from './pages/AgendaPage';
import { TarefasPage } from './pages/TarefasPage';
import { StatsPage } from './pages/StatsPage';
import { ConfigPage } from './pages/ConfigPage';
import { useTheme } from './hooks/useTheme';

function ThemeApplier() {
  useTheme();
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeApplier />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/tarefas" element={<TarefasPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/config" element={<ConfigPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
