import { atom } from 'jotai'
import { Board } from '../../types/entity/board'

export const playingBoardAtomDefault = {}

export const playingBoardAtom = atom<Board>(playingBoardAtomDefault)
playingBoardAtom.debugLabel = '___buildingPlayBoard___'
