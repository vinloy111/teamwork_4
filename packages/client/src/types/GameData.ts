export type Position = { x: number; y: number }

export type AreaOwner = 'user' | 'computer' | 'freeLands'

export type ArmyAndAreaColor = 'blue' | 'red' | 'gray'

export type GameAudio = 'backgroundMusic' | 'start' | 'win' | 'lose'

export type ID = string

export type ElementBase = {
  id: ID
  position: Position
  owner: AreaOwner
  img?: HTMLImageElement
}

export type AreaByOwner = {
  color: string
  count: number
  limit: number
  imgLink: ArmyAndAreaColor
}

export type Area = ElementBase & AreaByOwner

export type Army = ElementBase & {
  color: string
  count: number
  distance: number
  stepLength: number
  stepCount: number
  targetPosition: Position
  fromId: ID
  toId: ID
}

export type GameRecources = {
  areas: Record<string, HTMLImageElement>
  armies: Record<ArmyAndAreaColor, HTMLImageElement | undefined>
  audio: Record<GameAudio, HTMLAudioElement | undefined>
}

export type GameStats = {
  owner: AreaOwner
  areasCount: number
  count: number
  armiesPercent: number
  color: string
  status?: string
}

export type GameResult = { stats: GameStats[]; seconds: number }

export type Star = {
  x: number
  y: number
  color: string
  vector: number
  minRadius: number
  maxRadius: number
}
