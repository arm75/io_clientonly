import { atom } from 'jotai'
import { UiSource } from '../../types/ui/uiSource'

export const uiSourceAtomDefault = 'live'

export const uiSourceAtom = atom<UiSource>(uiSourceAtomDefault)
uiSourceAtom.debugLabel = '___uiSource___'
