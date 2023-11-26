import { AreaOwner } from './GameData'

export enum GameScreen {
  startScreen = 'startScreen',
  gameScreen = 'gameScreen',
  finalScreen = 'finalScreen',
}

export enum GameDifficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  insane = 'insane',
}

export enum Player {
  user = 'user',
  computer = 'computer',
  none = 'none',
}

export type PlayerSettings = {
  color: AreaOwner
  colorName: string
  player: Player
  difficulty?: GameDifficulty
}

export type CanvasSize = { width: number; height: number }
