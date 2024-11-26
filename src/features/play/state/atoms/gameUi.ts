import { atom } from 'jotai'

export const buildingPlayAtom = atom<boolean>(false)
buildingPlayAtom.debugLabel = '___buildingPlay___'

export const usingBuckAtom = atom<boolean>(false)
usingBuckAtom.debugLabel = '___usingBuck___'

export const buckTileAtom = atom<string>('')
buckTileAtom.debugLabel = '___buckTile___'
