import { atomWithStorage } from 'jotai/utils'
import { TurnRequest } from '../../types/dto/turnRequest'

export const turnRequestAtom = atomWithStorage<TurnRequest | null>('turnRequest', null)
turnRequestAtom.debugLabel = '___turnRequest___'
