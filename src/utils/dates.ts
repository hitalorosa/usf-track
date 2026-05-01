import { differenceInDays, parseISO, format, isToday, isTomorrow, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { UrgencyLevel } from '../types';

export function getDaysUntil(isoDate: string): number {
  return differenceInDays(parseISO(isoDate), new Date());
}

export function getUrgencyLevel(isoDate: string): UrgencyLevel {
  const days = getDaysUntil(isoDate);
  if (days < 0) return 'critico';
  if (days === 0) return 'critico';
  if (days <= 2) return 'urgente';
  if (days <= 7) return 'atencao';
  return 'tranquilo';
}

export function urgencyColor(level: UrgencyLevel): string {
  const map: Record<UrgencyLevel, string> = {
    tranquilo: 'var(--accent-secondary)',
    atencao: 'var(--accent-warning)',
    urgente: '#E07030',
    critico: 'var(--accent-danger)',
  };
  return map[level];
}

export function formatDate(isoDate: string): string {
  const date = parseISO(isoDate);
  if (isToday(date)) return 'Hoje';
  if (isTomorrow(date)) return 'Amanhã';
  return format(date, "dd 'de' MMM", { locale: ptBR });
}

export function formatDateFull(isoDate: string): string {
  return format(parseISO(isoDate), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function isOverdue(isoDate: string): boolean {
  return isPast(parseISO(isoDate)) && !isToday(parseISO(isoDate));
}

export const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;
export const DIAS_SEMANA_FULL = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const;
