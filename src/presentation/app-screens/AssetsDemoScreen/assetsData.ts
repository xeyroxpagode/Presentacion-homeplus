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
