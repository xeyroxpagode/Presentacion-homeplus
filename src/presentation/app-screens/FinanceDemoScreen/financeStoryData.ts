/**
 * Single illustrative source for the C36-C38 supermarket story.
 * C36 ticket total = C36 Finance movement = C37 Supermercado row =
 * C38 Compras category, and the monthly total is the sum of the categories.
 * No entry here is written back to the app.
 */
export const financeStory = {
  note: 'Importes ilustrativos · ARS',
  list: {
    title: 'Lista de compras',
    subtitle: 'Preparativos del cumpleaños',
    footer: 'Lista preparada para comprar',
    items: [
      { id: 'bebidas', name: 'Bebidas', amount: 12000, label: '$12.000' },
      { id: 'servilletas', name: 'Servilletas', amount: 3500, label: '$3.500' },
      { id: 'velas', name: 'Velas', amount: 3000, label: '$3.000' },
    ],
  },
  purchase: {
    title: 'Supermercado',
    subtitle: 'Comprobante ilustrativo',
    total: 18500,
    totalLabel: '$18.500',
    movementMeta: 'Compra · ejemplo',
    movementAmount: '−$18.500',
    movementMetaLong: 'Compra del hogar',
  },
  payments: {
    title: 'Pagos',
    subtitle: 'Consultar servicios del hogar',
    items: ['Internet', 'Luz'],
  },
  limits: {
    title: 'Límites',
    subtitle: 'Seguir cómo vienen los gastos',
    note: 'Seguimiento visual del presupuesto',
    pct: 62,
  },
  recent: [
    { id: 'supermercado', title: 'Supermercado', meta: 'Compra del hogar', amount: '−$18.500' },
    { id: 'servicios', title: 'Servicios', meta: 'Movimientos del hogar', amount: '−$12.000' },
    { id: 'otros', title: 'Otros movimientos', meta: 'Transporte y otros', amount: '−$13.000' },
  ],
  summary: {
    title: 'Gastos por categoría',
    subtitle: 'Vista mensual',
    total: 43500,
    totalLabel: '$43.500',
    featured: 'Compras',
    featuredLabel: '$18.500',
    featuredCaption: 'Compras del supermercado.',
    // Bars are proportional to the same values: 18.500 is the 100% reference.
    categories: [
      { id: 'compras', name: 'Compras', amount: 18500, label: '$18.500', pct: 100 },
      { id: 'servicios', name: 'Servicios', amount: 12000, label: '$12.000', pct: 65 },
      { id: 'transporte', name: 'Transporte', amount: 8000, label: '$8.000', pct: 43 },
      { id: 'otros', name: 'Otros', amount: 5000, label: '$5.000', pct: 27 },
    ],
  },
} as const
