export const orientationValues = {
    pending: 'horizontal',
    started: 'vertical',
} as const

export type Orientation = (typeof orientationValues)[keyof typeof orientationValues]
