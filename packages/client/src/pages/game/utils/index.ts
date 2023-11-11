import { Area, AreaOwner, Army, Position } from 'types/GameData'
import { areasExtendedMap } from '../config'

const TWO_PI = 2 * Math.PI
const CIRCLE_RADIUS = 30
const COUNT_MARGIN = 45
const BLACK_COLOR = 'black'

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  circle: Area
): void => {
  const { position, color, count } = circle

  ctx.fillStyle = ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(position.x, position.y, CIRCLE_RADIUS, 0, TWO_PI)
  ctx.closePath()
  ctx.fill()

  ctx.font = 'bold 25px Verdana'
  ctx.fillStyle = BLACK_COLOR
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(String(count), position.x, position.y + COUNT_MARGIN)
}

export const drawCircleBorder = (
  ctx: CanvasRenderingContext2D,
  circle: Area,
  color: string
): void => {
  const { position } = circle
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(position.x, position.y, CIRCLE_RADIUS + 2, 0, TWO_PI)
  ctx.closePath()
  ctx.globalAlpha = 0.6
  ctx.lineWidth = 7
  ctx.stroke()
  ctx.globalAlpha = 1
  ctx.lineWidth = 1
}

export const drawArrow = (
  ctx: CanvasRenderingContext2D,
  arrow: {
    color: string
    startX: number
    startY: number
    endX?: number
    endY?: number
  }
): void => {
  const { color, startX, startY, endX, endY } = arrow
  if (endX && endY) {
    const length = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    )
    const offset = 20
    const newEndX = endX - ((endX - startX) / length) * offset
    const newEndY = endY - ((endY - startY) / length) * offset

    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(newEndX, newEndY)
    ctx.stroke()

    const arrowSize = 30
    const angle = Math.atan2(endY - startY, endX - startX)
    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(
      endX - arrowSize * Math.cos(angle - Math.PI / 6),
      endY - arrowSize * Math.sin(angle - Math.PI / 6)
    )
    ctx.lineTo(
      endX - arrowSize * Math.cos(angle + Math.PI / 6),
      endY - arrowSize * Math.sin(angle + Math.PI / 6)
    )
    ctx.closePath()
    ctx.fill()
    ctx.lineWidth = 1
  }
}

export const checkDotIntoCircle = (
  dot: { x: number; y: number },
  circle: Area
): boolean => {
  const distance = Math.sqrt(
    (dot.x - circle.position.x) ** 2 + (dot.y - circle.position.y) ** 2
  )
  return distance < CIRCLE_RADIUS
}

export const drawArmy = (ctx: CanvasRenderingContext2D, army: Army): void => {
  const { position, color, count } = army

  ctx.fillStyle = ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(position.x, position.y, CIRCLE_RADIUS - 15, 0, TWO_PI)
  ctx.closePath()
  ctx.fill()

  ctx.font = 'bold 15px Verdana'
  ctx.fillStyle = BLACK_COLOR
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(String(count), position.x, position.y + COUNT_MARGIN - 20)
}

export const drawPowerBar = (
  ctx: CanvasRenderingContext2D,
  areas: Area[],
  armies: Army[]
): void => {
  const allElements = [...areas, ...armies]
  const allCount = allElements.reduce((acc, i) => acc + i.count, 0)
  const allPowers: Record<AreaOwner, number> = allElements.reduce(
    (acc, i) => {
      return { ...acc, [i.owner]: acc?.[i.owner] + i.count }
    },
    { user: 0, computer: 0, freeLands: 0 }
  )

  const POWER_BAR_WIDTH = 600
  const POWER_BAR_HEIGHT = 30
  const POWER_BAR_COLOR = 'white'
  const GAP_WIDTH = 5

  const powerBarStart = innerWidth / 2 - POWER_BAR_WIDTH / 2
  ctx.fillStyle = POWER_BAR_COLOR
  ctx.fillRect(powerBarStart, 20, POWER_BAR_WIDTH, POWER_BAR_HEIGHT)

  let temp = powerBarStart
  const dataForRender = Object.entries(allPowers).map(([owner, count]) => {
    const startPoint = temp + GAP_WIDTH
    const freeSpace = POWER_BAR_WIDTH - 2 * GAP_WIDTH
    const width = (count / allCount) * freeSpace
    temp = temp + width
    return {
      [owner]: count,
      color: areasExtendedMap[owner as AreaOwner].color,
      startPoint,
      width,
    }
  })

  dataForRender.forEach(i => {
    ctx.fillStyle = i.color
    ctx.fillRect(i.startPoint, 25, i.width, POWER_BAR_HEIGHT - 10)
  })
}

export const distanceBetweenPoints = (from: Position, to: Position): number => {
  const diffX = to.x - from.x
  const diffY = to.y - from.y
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
}

export const intermediatePoint = (
  from: Position,
  to: Position,
  t: number
): Position => {
  const newX = from.x + (to.x - from.x) * t
  const newY = from.y + (to.y - from.y) * t
  return { x: newX, y: newY }
}
