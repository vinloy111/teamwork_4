import { areasExtendedMap } from '..'
import { Area, Army, Position } from '../GameTypes'

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
    ctx.strokeStyle = color
    ctx.lineWidth = 20
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()

    const arrowSize = 30
    const angle = Math.atan2(endY - startY, endX - startX)
    ctx.beginPath()
    ctx.moveTo(
      endX - arrowSize * Math.cos(angle - Math.PI / 6),
      endY - arrowSize * Math.sin(angle - Math.PI / 6)
    )
    ctx.lineTo(endX, endY)
    ctx.lineTo(
      endX - arrowSize * Math.cos(angle + Math.PI / 6),
      endY - arrowSize * Math.sin(angle + Math.PI / 6)
    )
    ctx.stroke()
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
  areas: Area[]
): void => {
  // TODO: Добавить учет армий
  const powers = areas.reduce(
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

  const allCount = areas.reduce((acc, i) => {
    return acc + i.count
  }, 0)

  let temp = powerBarStart
  const dataForRender = Object.entries(powers).map(i => {
    const owner = i[0] as 'user' | 'computer' | 'freeLands'
    const count = i[1]
    const startPoint = temp + GAP_WIDTH
    const activePowersCount = Object.values(powers).filter(i =>
      Boolean(i)
    ).length
    const freeSpace = POWER_BAR_WIDTH - (activePowersCount + 1) * GAP_WIDTH
    const width = (count / allCount) * freeSpace
    temp = temp + GAP_WIDTH + width
    return {
      [owner]: count,
      color: areasExtendedMap[owner].color,
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
  return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2))
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
