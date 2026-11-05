export type HomeAsset = { id: string; name: string; detail: string }

export type AssetDocument = { id: string; title: string; meta: string }

// Demo household objects. PlayStation 5 carries this scene's narrative;
// the feature brief explicitly asks for it as the focus object.
export const homeAssets: readonly HomeAsset[] = [
  { id: 'ps5', name: 'PlayStation 5', detail: 'Consola · Living' },
  { id: 'heladera', name: 'Heladera', detail: 'Cocina' },
  { id: 'tv', name: 'TV', detail: 'Living' },
  { id: 'aire', name: 'Aire acondicionado', detail: 'Dormitorio' },
]

export const ps5Documents: readonly AssetDocument[] = [
  { id: 'garantia', title: 'Garantía PlayStation 5', meta: 'PDF · HomeCloud' },
  { id: 'manual', title: 'Manual PS5', meta: 'PDF · HomeCloud' },
]

// Canonical detail used by the S10 ficha. Kept beside the documents so the
// object and its files always describe the same PlayStation 5.
export const ps5Warranty = {
  title: 'Garantía PlayStation 5',
  status: 'Vigente',
  expiresLabel: 'Válida hasta',
  expires: '12 ago 2026',
  purchased: '12 ago 2023',
  serial: 'F32701ZXN1045678',
  value: '599,99 €',
  usageLabel: 'Uso familiar',
  usage: 'Consola de la familia',
} as const

export const ps5Invoice: AssetDocument = {
  id: 'factura-ps5',
  title: 'Factura de compra PS5',
  meta: 'PDF · 12 ago 2023',
}
