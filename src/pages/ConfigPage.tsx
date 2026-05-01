import { useState } from 'react';
import { Plus, Trash2, Settings } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { generateId } from '../utils/storage';
import type { Disciplina } from '../types';
import styles from './ConfigPage.module.css';

const CORES_PRESET = [
  '#C4633A', '#4A7C59', '#3A6B8A', '#8A3A6B', '#6B8A3A',
  '#D4A017', '#B5392B', '#5A3AB5', '#3AB5A3', '#B53A8A',
];

export function ConfigPage() {
  const { config, updateConfig, disciplinas, addDisciplina, removeDisciplina, semestre, setSemestre } =
    useAppStore();

  const [nomeUsuario, setNomeUsuario] = useState(config.nomeUsuario);
  const [metaHoras, setMetaHoras] = useState(String(config.metaHorasSemanais));

  const [newDisc, setNewDisc] = useState<Partial<Disciplina>>({
    nome: '', professor: '', codigo: '', cor: CORES_PRESET[0],
  });

  const salvarPerfil = () => {
    updateConfig({
      nomeUsuario: nomeUsuario.trim(),
      metaHorasSemanais: Number(metaHoras) || 10,
    });
  };

  const adicionarDisc = () => {
    if (!newDisc.nome?.trim()) return;
    addDisciplina({
      id: generateId(),
      semestreId: semestre?.id ?? 'default',
      nome: newDisc.nome.trim(),
      codigo: newDisc.codigo?.trim() ?? '',
      professor: newDisc.professor?.trim() ?? '',
      cor: newDisc.cor ?? CORES_PRESET[0],
    });
    setNewDisc({ nome: '', professor: '', codigo: '', cor: CORES_PRESET[0] });
  };

  return (
    <div className={styles.page}>
      <h1>Configurações</h1>

      {/* Perfil */}
      <section className={styles.section}>
        <h2>
          <Settings size={16} /> Perfil
        </h2>
        <div className={styles.field}>
          <label htmlFor="nomeUsuario">Seu nome</label>
          <input
            id="nomeUsuario"
            type="text"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            placeholder="Ex: João"
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="metaHoras">Meta de horas semanais</label>
          <input
            id="metaHoras"
            type="number"
            min="1"
            max="80"
            value={metaHoras}
            onChange={(e) => setMetaHoras(e.target.value)}
            className={styles.input}
            style={{ maxWidth: 100 }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="tema">Tema</label>
          <select
            id="tema"
            value={config.tema}
            onChange={(e) => updateConfig({ tema: e.target.value as 'light' | 'dark' | 'auto' })}
            className={styles.select}
          >
            <option value="auto">Automático (sistema)</option>
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </select>
        </div>
        <button className={styles.saveBtn} onClick={salvarPerfil}>
          Salvar
        </button>
      </section>

      {/* Disciplinas */}
      <section className={styles.section}>
        <h2>Disciplinas</h2>

        {disciplinas.length > 0 && (
          <ul className={styles.discList}>
            {disciplinas.map((d) => (
              <li key={d.id} className={styles.discItem}>
                <span className={styles.discDot} style={{ backgroundColor: d.cor }} />
                <div className={styles.discInfo}>
                  <span className={styles.discNome}>{d.nome}</span>
                  {d.professor && (
                    <span className={styles.discProf}>{d.professor}</span>
                  )}
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeDisciplina(d.id)}
                  aria-label={`Remover ${d.nome}`}
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.newDisc}>
          <h3>Adicionar disciplina</h3>
          <div className={styles.field}>
            <label htmlFor="discNome">Nome *</label>
            <input
              id="discNome"
              type="text"
              value={newDisc.nome ?? ''}
              onChange={(e) => setNewDisc((p) => ({ ...p, nome: e.target.value }))}
              placeholder="Ex: Banco de Dados"
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="discProf">Professor</label>
              <input
                id="discProf"
                type="text"
                value={newDisc.professor ?? ''}
                onChange={(e) => setNewDisc((p) => ({ ...p, professor: e.target.value }))}
                placeholder="Ex: Prof. Silva"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="discCod">Código</label>
              <input
                id="discCod"
                type="text"
                value={newDisc.codigo ?? ''}
                onChange={(e) => setNewDisc((p) => ({ ...p, codigo: e.target.value }))}
                placeholder="ADS301"
                className={styles.input}
                style={{ maxWidth: 100 }}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label>Cor</label>
            <div className={styles.cores}>
              {CORES_PRESET.map((cor) => (
                <button
                  key={cor}
                  className={`${styles.corBtn}${newDisc.cor === cor ? ` ${styles.corBtnActive}` : ''}`}
                  style={{ backgroundColor: cor }}
                  onClick={() => setNewDisc((p) => ({ ...p, cor }))}
                  aria-label={`Cor ${cor}`}
                />
              ))}
            </div>
          </div>
          <button className={styles.addBtn} onClick={adicionarDisc}>
            <Plus size={16} /> Adicionar
          </button>
        </div>
      </section>
    </div>
  );
}
