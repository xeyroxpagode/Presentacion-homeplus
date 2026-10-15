// Demo HomeCloud content: the PS5 documents connect the object to its
// files, then photos, a voice note and albums carry the human side.
export type CloudDocument = { id: string; title: string; meta: string }

export const cloudDocuments: readonly CloudDocument[] = [
  { id: 'garantia-ps5', title: 'Garantía PlayStation 5', meta: 'PDF · Hoy' },
  { id: 'manual-ps5', title: 'Manual PS5', meta: 'PDF · Ayer' },
  { id: 'factura-tv', title: 'Factura TV', meta: 'PDF · 12 ago' },
]

export type CloudMemory = { id: string; title: string; date: string }

export const cloudMemories: readonly CloudMemory[] = [
  { id: 'cumple', title: 'Cumpleaños', date: '20 ago' },
  { id: 'vacaciones', title: 'Vacaciones', date: 'Ene 2026' },
]

export const cloudVoiceNote = { title: 'Nota de voz', meta: 'Mamá · 0:42' }

export const cloudAlbumsRow = { title: 'Álbumes', meta: 'Cumpleaños · 24 fotos' }
