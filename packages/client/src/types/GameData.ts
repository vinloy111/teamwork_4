export type Position = { x: number; y: number }

export type AreaOwner = 'user' | 'computer' | 'freeLands'

export type ID = string

export type ElementBase = {
  id: ID
  position: Position
  owner: AreaOwner
}

export type Area = ElementBase & {
  color: string
  count: number
  limit: number
}

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

export type GameStats = {
  owner: AreaOwner
  areasCount: number
  count: number
  armiesPercent: number
  color: string
  status?: string
}

export type GameResult = { stats: GameStats[]; seconds: number }
