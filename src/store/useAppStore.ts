import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Config, Disciplina, Semestre, AulaFixa,
  ModificacaoAula, Tarefa, RegistroEstudo,
} from '../types';

interface AppState {
  config: Config;
  semestre: Semestre | null;
  disciplinas: Disciplina[];
  aulasFixas: AulaFixa[];
  modificacoes: ModificacaoAula[];
  tarefas: Tarefa[];
  registrosEstudo: RegistroEstudo[];

  updateConfig: (partial: Partial<Config>) => void;
  setSemestre: (s: Semestre) => void;

  addDisciplina: (d: Disciplina) => void;
  updateDisciplina: (d: Disciplina) => void;
  removeDisciplina: (id: string) => void;

  addAulaFixa: (a: AulaFixa) => void;
  updateAulaFixa: (a: AulaFixa) => void;
  removeAulaFixa: (id: string) => void;

  addModificacao: (m: ModificacaoAula) => void;
  removeModificacao: (id: string) => void;

  addTarefa: (t: Tarefa) => void;
  updateTarefa: (t: Tarefa) => void;
  removeTarefa: (id: string) => void;

  addRegistroEstudo: (r: RegistroEstudo) => void;
  removeRegistroEstudo: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      config: {
        tema: 'auto',
        nomeUsuario: '',
        metaHorasSemanais: 10,
        onboardingConcluido: false,
      },
      semestre: null,
      disciplinas: [],
      aulasFixas: [],
      modificacoes: [],
      tarefas: [],
      registrosEstudo: [],

      updateConfig: (partial) =>
        set((s) => ({ config: { ...s.config, ...partial } })),
      setSemestre: (semestre) => set({ semestre }),

      addDisciplina: (d) => set((s) => ({ disciplinas: [...s.disciplinas, d] })),
      updateDisciplina: (d) =>
        set((s) => ({ disciplinas: s.disciplinas.map((x) => (x.id === d.id ? d : x)) })),
      removeDisciplina: (id) =>
        set((s) => ({ disciplinas: s.disciplinas.filter((x) => x.id !== id) })),

      addAulaFixa: (a) => set((s) => ({ aulasFixas: [...s.aulasFixas, a] })),
      updateAulaFixa: (a) =>
        set((s) => ({ aulasFixas: s.aulasFixas.map((x) => (x.id === a.id ? a : x)) })),
      removeAulaFixa: (id) =>
        set((s) => ({ aulasFixas: s.aulasFixas.filter((x) => x.id !== id) })),

      addModificacao: (m) => set((s) => ({ modificacoes: [...s.modificacoes, m] })),
      removeModificacao: (id) =>
        set((s) => ({ modificacoes: s.modificacoes.filter((x) => x.id !== id) })),

      addTarefa: (t) => set((s) => ({ tarefas: [...s.tarefas, t] })),
      updateTarefa: (t) =>
        set((s) => ({ tarefas: s.tarefas.map((x) => (x.id === t.id ? t : x)) })),
      removeTarefa: (id) =>
        set((s) => ({ tarefas: s.tarefas.filter((x) => x.id !== id) })),

      addRegistroEstudo: (r) =>
        set((s) => ({ registrosEstudo: [...s.registrosEstudo, r] })),
      removeRegistroEstudo: (id) =>
        set((s) => ({ registrosEstudo: s.registrosEstudo.filter((x) => x.id !== id) })),
    }),
    {
      name: 'usf-track-store',
    }
  )
);
