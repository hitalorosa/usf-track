// ===== USF Track — Types =====

export interface Semestre {
  id: string;
  nome: string;
  dataInicio: string;
  dataFim: string;
  periodoProvas: {
    inicio: string;
    fim: string;
  };
}

export interface Disciplina {
  id: string;
  semestreId: string;
  nome: string;
  codigo: string;
  professor: string;
  cargaHoraria?: number;
  tipoAvaliacao?: 'notas' | 'trabalhos' | 'misto';
  cor: string;
  linkAVA?: string;
  linkGrupo?: string;
}

export interface AulaFixa {
  id: string;
  disciplinaId: string;
  diaSemana: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  horarioInicio: string;
  horarioFim: string;
  linkAoVivo?: string;
  sala?: string;
}

export interface ModificacaoAula {
  id: string;
  aulaFixaId: string;
  data: string;
  tipo: 'cancelada' | 'adiantada' | 'substituida' | 'horario_diferente';
  novoHorario?: string;
  motivo?: string;
}

export type TipoTarefa = 'atividade' | 'prova' | 'seminario' | 'revisao' | 'outro';
export type StatusTarefa = 'pendente' | 'em_progresso' | 'entregue' | 'cancelada';
export type PrioridadeTarefa = 'baixa' | 'media' | 'alta' | 'critica';

export interface Tarefa {
  id: string;
  disciplinaId: string;
  titulo: string;
  tipo: TipoTarefa;
  dataEntrega: string;
  status: StatusTarefa;
  prioridade: PrioridadeTarefa;
  horario?: string;
  peso?: number;
  notas?: string;
  lembreteDias?: number;
  notaObtida?: number;
}

export type TecnicaEstudo = 'pomodoro' | 'blocos' | 'livre';

export interface RegistroEstudo {
  id: string;
  data: string;
  disciplinaId?: string;
  horas: number;
  topico?: string;
  tecnica?: TecnicaEstudo;
  humor?: 1 | 2 | 3 | 4 | 5;
}

export type Tema = 'light' | 'dark' | 'auto';

export interface Config {
  tema: Tema;
  nomeUsuario: string;
  metaHorasSemanais: number;
  horarioEstudo?: {
    inicio: string;
    fim: string;
  };
  tecnicaPreferida?: TecnicaEstudo;
  diasDescanso?: number[];
  onboardingConcluido: boolean;
}

export type UrgencyLevel = 'tranquilo' | 'atencao' | 'urgente' | 'critico';
