export const financeTabs = ['Resumen', 'Movimientos', 'Pagos'] as const

// Recovered hero, payments and categories from the real app data.
export const financeHero = {
  scope: 'Agosto 2026 · Familia García',
  balance: '−$55.700',
  baseline: 'vs. +$350.000 ingresado',
}

export type FinancePayment = { id: string; title: string; dueLabel: string; amount: string; overdue?: boolean; paid?: boolean }

export const financePayments: readonly FinancePayment[] = [
  { id: 'internet', title: 'Internet', dueLabel: 'Pagado', amount: '$38.450', paid: true },
  { id: 'seguro', title: 'Seguro del auto', dueLabel: 'En 6 días', amount: '$62.800' },
]

export type FinanceCategory = { id: string; name: string; amount: string; pct: number }

// Demo simplification: the two largest categories carry "¿En qué se nos
// está yendo más?" at a glance; the reference lists more.
export const financeCategories: readonly FinanceCategory[] = [
  { id: 'alimentos', name: 'Alimentos', amount: '$24.500', pct: 44 },
  { id: 'transporte', name: 'Transporte', amount: '$18.600', pct: 33 },
]
