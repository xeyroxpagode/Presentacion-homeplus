export type InventoryStatus = 'low' | 'out' | 'ok'

export type InventoryProduct = {
  id: string
  name: string
  place: string
  qty: string
  status: InventoryStatus
  statusLabel?: string
  spotlight?: boolean
}

export const inventoryFilters = ['Todos', 'Por lugar', 'Bajo stock'] as const

// Recovered names, places and stock states from the real app data.
export const inventoryProducts: readonly InventoryProduct[] = [
  { id: 'papel', name: 'Papel higiénico', place: 'Baño', qty: '4 u', status: 'low', statusLabel: 'Bajo', spotlight: true },
  { id: 'leche', name: 'Leche', place: 'Heladera', qty: '2 L', status: 'low', statusLabel: 'Bajo', spotlight: true },
  { id: 'detergente', name: 'Detergente', place: 'Cocina', qty: '3 u', status: 'ok', spotlight: true },
  { id: 'cafe', name: 'Café', place: 'Alacena', qty: '0', status: 'out', statusLabel: 'Sin stock' },
]

export const shoppingSummary = { title: 'Lista de compras', subtitle: '8 para comprar', count: 8 }
