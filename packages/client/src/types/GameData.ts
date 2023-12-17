import { Player } from './GameStats'

export type Position = { x: number; y: number }

export enum AreaOwner {
  blue = 'blue',
  red = 'red',
  green = 'green',
  orange = 'orange',
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
  player: Player
  img?: HTMLImageElement
}

export type AreaByOwner = {
  color: string
  count: number
  limit: number
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
  armies: Record<AreaOwner, HTMLImageElement | undefined>
  audio: Record<GameAudio, HTMLAudioElement | undefined>
}

export type GameStats = {
  owner: AreaOwner
  areasCount: number
  count: number
  armiesPercent: number
  color: string
  isWinner?: boolean
  playerType?: Player
  playerName?: string
  playerAvatar?: string
  playerId?: string
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
