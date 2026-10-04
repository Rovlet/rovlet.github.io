import snapshot from './items.json' with { type: 'json' };

export type Item = Omit<typeof snapshot[number], 'cents'> & { cents: number | null };
export const priorities = ['Na start', 'Opcjonalne', 'Na później'];
export const categories = ['Spacery i podróże', 'Sen', 'Przewijanie', 'Kąpiel i pielęgnacja', 'Karmienie', 'Ubranka i tekstylia', 'Dla mamy'];
export const money = (cents: number) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(cents / 100);
export const price = (item: Item) => item.cents === null ? 'Brak ceny' : `${item.priceKind === 'from' ? 'od ' : item.priceKind === 'estimate' ? 'ok. ' : ''}${money(item.cents * item.quantity)}`;
export function photosFirst(items: Item[]): Item[] {
  return [...items].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
}
export function totals(items: Item[]) {
  const active = items.filter(item => !item.archived && item.status !== 'excluded');
  const sum = (rows: Item[]) => rows.reduce((n, item) => n + (item.cents ?? 0) * item.quantity, 0);
  return {
    total: sum(active),
    withoutOptional: sum(active.filter(item => item.priority !== 'Opcjonalne')),
    estimated: sum(active.filter(item => item.priceKind === 'estimate')),
    estimatedCount: active.filter(item => item.priceKind === 'estimate').length,
    missing: active.filter(item => item.cents === null).length,
  };
}
export const items = snapshot.filter(item => !item.archived);
const ids = new Set<string>();
for (const item of items) {
  if (ids.has(item.id) || !priorities.includes(item.priority)) throw new Error(`Niepoprawny produkt: ${item.id}`);
  ids.add(item.id);
  if (!Number.isInteger(item.quantity) || item.quantity < 1 || (item.cents !== null && (!Number.isInteger(item.cents) || item.cents < 0))) throw new Error(`Niepoprawna cena lub ilość: ${item.id}`);
  for (const value of [item.url, item.priceUrl, item.image, ...item.sourceUrls]) {
    if (value && !['http:', 'https:'].includes(new URL(value).protocol)) throw new Error(`Niepoprawny adres: ${item.id}`);
  }
}
