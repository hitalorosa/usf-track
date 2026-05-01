// ===== Storage Utils — localStorage wrapper =====

const PREFIX = 'usf_track_';

export function getAll<T>(collection: string): T[] {
  try {
    const raw = localStorage.getItem(PREFIX + collection);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function getById<T extends { id: string }>(collection: string, id: string): T | null {
  const items = getAll<T>(collection);
  return items.find((item) => item.id === id) ?? null;
}

export function save<T extends { id: string }>(collection: string, item: T): void {
  const items = getAll<T>(collection);
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    items[idx] = item;
  } else {
    items.push(item);
  }
  localStorage.setItem(PREFIX + collection, JSON.stringify(items));
}

export function deleteById(collection: string, id: string): void {
  const items = getAll<{ id: string }>(collection).filter((i) => i.id !== id);
  localStorage.setItem(PREFIX + collection, JSON.stringify(items));
}

export function getSingle<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setSingle<T>(key: string, value: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function exportData(): string {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(PREFIX)) {
      const shortKey = key.replace(PREFIX, '');
      try {
        data[shortKey] = JSON.parse(localStorage.getItem(key) ?? 'null');
      } catch {
        data[shortKey] = localStorage.getItem(key);
      }
    }
  }
  return JSON.stringify(data, null, 2);
}

export function importData(json: string): void {
  const data = JSON.parse(json) as Record<string, unknown>;
  for (const [key, value] of Object.entries(data)) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  }
}

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
