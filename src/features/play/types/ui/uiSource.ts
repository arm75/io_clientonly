export const uiSources = {
    live: 'live',
    building_play: 'building_play',
} as const

export type UiSource = (typeof uiSources)[keyof typeof uiSources]
