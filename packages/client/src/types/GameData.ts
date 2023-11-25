export type Position = { x: number; y: number }

export enum AreaOwner {
  user = 'user',
  computer = 'computer',
  freeLands = 'freeLands',
}

enum ArmyAndAreaColor {
  blue = 'blue',
  red = 'red',
  gray = 'gray',
}

enum GameAudio {
  backgroundMusic = 'backgroundMusic',
  start = 'start',
  win = 'win',
  lose = 'lose',
}

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

export type GameResources = {
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
