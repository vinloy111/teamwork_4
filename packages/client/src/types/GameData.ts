export type Position = { x: number; y: number }

export type AreaBase = {
  id: number
  position: Position
  owner: 'user' | 'computer' | 'freeLands'
}

export type Area = AreaBase & {
  color: string
  count: number
  limit: number
}

export type Army = {
  id: number
  color: string
  count: number
  distance: number
  stepLength: number
  stepCount: number
  position: Position
  targetPosition: Position
  fromId: number
  toId: number
}
