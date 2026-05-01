import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BookOpen, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getUrgencyLevel, urgencyColor, formatDate, getDaysUntil } from '../utils/dates';
import styles from './HomePage.module.css';

const FRASES = [
  'Código limpo não é escrito por seguir regras — é escrito por um profissional que se importa. — R. C. Martin',
  'Primeiro, faça funcionar. Depois, faça certo. Depois, faça rápido. — K. Beck',
  'A melhor hora de plantar uma árvore foi há 20 anos. A segunda melhor hora é agora.',
  'Qualquer um pode escrever código que um computador entende. Bons programadores escrevem código que humanos entendem.',
  'O aprendizado nunca esgota a mente. — Leonardo da Vinci',
  'Consistência é o que transforma a média em excelência.',
];

export function HomePage() {
  const { config, tarefas, aulasFixas, disciplinas } = useAppStore();
  const hoje = new Date();
  const diaSemana = hoje.getDay();
  const dataFormatada = format(hoje, "EEEE, dd 'de' MMMM", { locale: ptBR });
  const frase = FRASES[hoje.getDate() % FRASES.length];

  const saudacao =
    hoje.getHours() < 12 ? 'Bom dia' : hoje.getHours() < 18 ? 'Boa tarde' : 'Boa noite';

  const aulasHoje = aulasFixas.filter((a) => a.diaSemana === diaSemana);
  const disciplinasMap = Object.fromEntries(disciplinas.map((d) => [d.id, d]));

  const tarefasPendentes = tarefas
    .filter((t) => t.status !== 'entregue' && t.status !== 'cancelada')
    .sort((a, b) => new Date(a.dataEntrega).getTime() - new Date(b.dataEntrega).getTime());

  const proximasPendentes = tarefasPendentes.slice(0, 4);

  const proximaProva = tarefasPendentes.find((t) => t.tipo === 'prova');
  const diasParaProva = proximaProva ? getDaysUntil(proximaProva.dataEntrega) : null;

  return (
    <div className={styles.page}>
      {/* Saudação */}
      <section className={styles.greeting}>
        <h1>
          {saudacao}{config.nomeUsuario ? `, ${config.nomeUsuario}` : ''}!
        </h1>
        <p className={styles.date}>{dataFormatada}</p>
      </section>

      {/* Aulas de hoje */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <BookOpen size={18} /> Hoje você tem
        </h2>
        {aulasHoje.length === 0 ? (
          <p className={styles.empty}>Sem aulas hoje — bom descanso! 🎉</p>
        ) : (
          <ul className={styles.aulasList}>
            {aulasHoje.map((aula) => {
              const disc = disciplinasMap[aula.disciplinaId];
              return (
                <li key={aula.id} className={styles.aulaItem}>
                  {disc && (
                    <span
                      className={styles.discDot}
                      style={{ backgroundColor: disc.cor }}
                    />
                  )}
                  <div>
                    <span className={styles.aulaName}>{disc?.nome ?? 'Disciplina'}</span>
                    <span className={styles.aulaHora}>
                      {aula.horarioInicio} – {aula.horarioFim}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Próxima prova */}
      {proximaProva && (
        <section
          className={styles.card}
          style={{
            borderLeft: `4px solid ${urgencyColor(getUrgencyLevel(proximaProva.dataEntrega))}`,
          }}
        >
          <h2 className={styles.cardTitle}>
            <AlertCircle size={18} /> Próxima prova
          </h2>
          <p className={styles.provaTitle}>{proximaProva.titulo}</p>
          <p className={styles.provaInfo}>
            <span
              className={styles.countdown}
              style={{ color: urgencyColor(getUrgencyLevel(proximaProva.dataEntrega)) }}
            >
              {diasParaProva === 0
                ? 'HOJE'
                : diasParaProva === 1
                ? 'Amanhã'
                : `${diasParaProva} dias`}
            </span>
            {' '}— {formatDate(proximaProva.dataEntrega)}
          </p>
        </section>
      )}

      {/* Prazos próximos */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <Clock size={18} /> Prazos próximos
        </h2>
        {proximasPendentes.length === 0 ? (
          <p className={styles.empty}>Nenhuma tarefa pendente. 🙌</p>
        ) : (
          <ul className={styles.taskList}>
            {proximasPendentes.map((t) => {
              const level = getUrgencyLevel(t.dataEntrega);
              const disc = disciplinasMap[t.disciplinaId];
              return (
                <li key={t.id} className={styles.taskItem}>
                  <span
                    className={styles.urgencyBar}
                    style={{ backgroundColor: urgencyColor(level) }}
                  />
                  <div className={styles.taskInfo}>
                    <span className={styles.taskTitle}>{t.titulo}</span>
                    <span className={styles.taskMeta}>
                      {disc?.nome} · {formatDate(t.dataEntrega)}
                    </span>
                  </div>
                  {t.status === 'em_progresso' && (
                    <CheckCircle2 size={14} color="var(--accent-secondary)" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Frase motivacional */}
      <blockquote className={styles.quote}>{frase}</blockquote>
    </div>
  );
}
