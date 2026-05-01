import { useState } from 'react';
import { CalendarDays, Grid3X3, Calendar } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { DIAS_SEMANA } from '../utils/dates';
import styles from './AgendaPage.module.css';

type Tab = 'semana' | 'mes' | 'grade';

export function AgendaPage() {
  const [tab, setTab] = useState<Tab>('semana');
  const { aulasFixas, disciplinas } = useAppStore();
  const discMap = Object.fromEntries(disciplinas.map((d) => [d.id, d]));

  const hoje = new Date().getDay();

  return (
    <div className={styles.page}>
      <h1>Agenda</h1>

      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          className={`${styles.tab}${tab === 'semana' ? ` ${styles.tabActive}` : ''}`}
          onClick={() => setTab('semana')}
        >
          <CalendarDays size={15} /> Semana
        </button>
        <button
          role="tab"
          className={`${styles.tab}${tab === 'mes' ? ` ${styles.tabActive}` : ''}`}
          onClick={() => setTab('mes')}
        >
          <Calendar size={15} /> Mês
        </button>
        <button
          role="tab"
          className={`${styles.tab}${tab === 'grade' ? ` ${styles.tabActive}` : ''}`}
          onClick={() => setTab('grade')}
        >
          <Grid3X3 size={15} /> Grade
        </button>
      </div>

      {tab === 'semana' && (
        <div className={styles.semana}>
          {([1, 2, 3, 4, 5, 6] as const).map((dia) => {
            const aulasNoDia = aulasFixas.filter((a) => a.diaSemana === dia);
            return (
              <div
                key={dia}
                className={`${styles.diaCard}${dia === hoje ? ` ${styles.diaCardHoje}` : ''}`}
              >
                <span className={styles.diaLabel}>
                  {DIAS_SEMANA[dia]}
                  {dia === hoje && <span className={styles.badge}>Hoje</span>}
                </span>
                {aulasNoDia.length === 0 ? (
                  <span className={styles.semAula}>–</span>
                ) : (
                  aulasNoDia.map((a) => {
                    const disc = discMap[a.disciplinaId];
                    return (
                      <div
                        key={a.id}
                        className={styles.aulaChip}
                        style={{ borderColor: disc?.cor ?? 'var(--border)' }}
                      >
                        <span
                          className={styles.chipDot}
                          style={{ backgroundColor: disc?.cor }}
                        />
                        <div>
                          <span className={styles.chipName}>{disc?.nome ?? '—'}</span>
                          <span className={styles.chipHora}>
                            {a.horarioInicio}–{a.horarioFim}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'mes' && (
        <div className={styles.placeholder}>
          <Calendar size={40} color="var(--text-muted)" />
          <p>Calendário mensal — em breve</p>
        </div>
      )}

      {tab === 'grade' && (
        <div className={styles.placeholder}>
          <Grid3X3 size={40} color="var(--text-muted)" />
          <p>Grade de horários — configure suas disciplinas em <strong>Configurações</strong></p>
        </div>
      )}
    </div>
  );
}
