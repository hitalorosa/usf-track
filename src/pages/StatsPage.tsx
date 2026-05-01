import { BarChart2, Flame, CheckSquare, Clock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import styles from './StatsPage.module.css';

export function StatsPage() {
  const { tarefas, registrosEstudo, config } = useAppStore();

  const concluidas = tarefas.filter((t) => t.status === 'entregue').length;
  const totalTarefas = tarefas.filter((t) => t.status !== 'cancelada').length;

  const horasTotal = registrosEstudo.reduce((acc, r) => acc + r.horas, 0);

  const streak = registrosEstudo.length > 0
    ? calcularStreak(registrosEstudo.map((r) => r.data))
    : 0;

  return (
    <div className={styles.page}>
      <h1>Estatísticas</h1>

      <div className={styles.grid}>
        <div className={styles.statCard}>
          <Clock size={24} color="var(--accent-info)" />
          <span className={styles.statValue}>{horasTotal.toFixed(1)}h</span>
          <span className={styles.statLabel}>Horas estudadas</span>
        </div>
        <div className={styles.statCard}>
          <Flame size={24} color="var(--accent-warning)" />
          <span className={styles.statValue}>{streak}</span>
          <span className={styles.statLabel}>Dias seguidos</span>
        </div>
        <div className={styles.statCard}>
          <CheckSquare size={24} color="var(--accent-secondary)" />
          <span className={styles.statValue}>{concluidas}/{totalTarefas}</span>
          <span className={styles.statLabel}>Tarefas concluídas</span>
        </div>
        <div className={styles.statCard}>
          <BarChart2 size={24} color="var(--accent-primary)" />
          <span className={styles.statValue}>{config.metaHorasSemanais}h</span>
          <span className={styles.statLabel}>Meta semanal</span>
        </div>
      </div>

      <div className={styles.placeholder}>
        <BarChart2 size={40} color="var(--text-muted)" />
        <p>Gráficos de evolução — registre seus estudos para ver seu progresso aqui</p>
      </div>
    </div>
  );
}

function calcularStreak(datas: string[]): number {
  if (!datas.length) return 0;
  const unique = [...new Set(datas.map((d) => d.slice(0, 10)))].sort().reverse();
  let streak = 0;
  const hoje = new Date().toISOString().slice(0, 10);
  let esperado = hoje;
  for (const d of unique) {
    if (d === esperado) {
      streak++;
      const prev = new Date(esperado);
      prev.setDate(prev.getDate() - 1);
      esperado = prev.toISOString().slice(0, 10);
    } else {
      break;
    }
  }
  return streak;
}
