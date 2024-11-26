import { atom } from 'jotai'
import { Orientation } from '../../types/ui/pickedUpTIles'

export const buildingPlayBoardAtomDefault = {}
export const buildingPlayTilesAtomDefault = []

export const pickedUpTilesOrientationAtom = atom<Orientation>('horizontal')
pickedUpTilesOrientationAtom.debugLabel = '___pickedUpTilesOrientation___'
