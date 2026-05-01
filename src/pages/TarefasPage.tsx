import { useState } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getUrgencyLevel, urgencyColor, formatDate } from '../utils/dates';
import type { StatusTarefa, TipoTarefa } from '../types';
import styles from './TarefasPage.module.css';

const TIPO_LABEL: Record<TipoTarefa, string> = {
  atividade: 'Atividade',
  prova: 'Prova',
  seminario: 'Seminário',
  revisao: 'Revisão',
  outro: 'Outro',
};

const STATUS_LABEL: Record<StatusTarefa, string> = {
  pendente: 'Pendente',
  em_progresso: 'Em progresso',
  entregue: 'Entregue',
  cancelada: 'Cancelada',
};

export function TarefasPage() {
  const { tarefas, disciplinas, updateTarefa } = useAppStore();
  const [filtro, setFiltro] = useState<'todas' | StatusTarefa>('todas');
  const discMap = Object.fromEntries(disciplinas.map((d) => [d.id, d]));

  const tarefasFiltradas = tarefas
    .filter((t) => filtro === 'todas' || t.status === filtro)
    .sort((a, b) => new Date(a.dataEntrega).getTime() - new Date(b.dataEntrega).getTime());

  const toggleStatus = (id: string, atual: StatusTarefa) => {
    const next: StatusTarefa = atual === 'pendente'
      ? 'em_progresso'
      : atual === 'em_progresso'
      ? 'entregue'
      : 'pendente';
    const tarefa = tarefas.find((t) => t.id === id);
    if (tarefa) updateTarefa({ ...tarefa, status: next });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Tarefas</h1>
        <button className={styles.addBtn} aria-label="Nova tarefa">
          <Plus size={18} /> Nova
        </button>
      </div>

      <div className={styles.filtros}>
        {(['todas', 'pendente', 'em_progresso', 'entregue'] as const).map((f) => (
          <button
            key={f}
            className={`${styles.filtro}${filtro === f ? ` ${styles.filtroActive}` : ''}`}
            onClick={() => setFiltro(f)}
          >
            {f === 'todas' ? 'Todas' : STATUS_LABEL[f as StatusTarefa]}
          </button>
        ))}
      </div>

      {tarefasFiltradas.length === 0 ? (
        <div className={styles.empty}>
          <CheckSquare size={40} color="var(--text-muted)" />
          <p>Nenhuma tarefa aqui. Que alívio! 🎉</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {tarefasFiltradas.map((t) => {
            const level = getUrgencyLevel(t.dataEntrega);
            const disc = discMap[t.disciplinaId];
            const isDone = t.status === 'entregue' || t.status === 'cancelada';
            return (
              <li
                key={t.id}
                className={`${styles.card}${isDone ? ` ${styles.cardDone}` : ''}`}
              >
                <span
                  className={styles.urgBar}
                  style={{ backgroundColor: isDone ? 'var(--border)' : urgencyColor(level) }}
                />
                <div className={styles.content}>
                  <div className={styles.top}>
                    <span className={styles.title}>{t.titulo}</span>
                    <span className={styles.tipo}>{TIPO_LABEL[t.tipo]}</span>
                  </div>
                  <div className={styles.meta}>
                    {disc && (
                      <span
                        className={styles.discTag}
                        style={{ borderColor: disc.cor, color: disc.cor }}
                      >
                        {disc.nome}
                      </span>
                    )}
                    <span className={styles.data}>{formatDate(t.dataEntrega)}</span>
                    <span
                      className={styles.status}
                      style={{
                        color: isDone ? 'var(--accent-secondary)' : urgencyColor(level),
                      }}
                    >
                      {STATUS_LABEL[t.status]}
                    </span>
                  </div>
                </div>
                <button
                  className={styles.checkBtn}
                  onClick={() => toggleStatus(t.id, t.status)}
                  aria-label="Alterar status"
                  title={STATUS_LABEL[t.status]}
                >
                  <CheckSquare
                    size={20}
                    color={isDone ? 'var(--accent-secondary)' : 'var(--text-muted)'}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
