import { Area, AreaOwner, Army, GameStats, Position } from 'types/GameData'
import { areasExtendedMap } from '../gameConfig'

const TWO_PI = 2 * Math.PI
const CIRCLE_RADIUS = 35
const ARMY_RADIUS = 20
const COUNT_MARGIN = 60

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  circle: Area
): void => {
  const { position, color, count, img } = circle

  if (img) {
    ctx.drawImage(
      img,
      position.x - CIRCLE_RADIUS,
      position.y - CIRCLE_RADIUS,
      CIRCLE_RADIUS * 2,
      CIRCLE_RADIUS * 2
    )
  }

  drawCircleBorder(ctx, circle, color, true)

  ctx.font = 'bold 25px Verdana'
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(String(count), position.x, position.y + COUNT_MARGIN)
}

export const drawCircleBorder = (
  ctx: CanvasRenderingContext2D,
  circle: Area,
  color: string,
  withoutOpacity?: boolean
): void => {
  const { position } = circle
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(position.x, position.y, CIRCLE_RADIUS + 5, 0, TWO_PI)
  ctx.closePath()
  if (!withoutOpacity) ctx.globalAlpha = 0.5
  ctx.lineWidth = 5
  ctx.stroke()
  if (!withoutOpacity) ctx.globalAlpha = 1
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
    const lineLength = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    )
    const offset = 20
    const lineStartX = startX - ((startX - endX) / lineLength) * (offset * 2)
    const lineStartY = startY - ((startY - endY) / lineLength) * (offset * 2)
    const lineEndX = endX - ((endX - startX) / lineLength) * offset
    const lineEndY = endY - ((endY - startY) / lineLength) * offset

    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = 10
    if (lineLength > CIRCLE_RADIUS) {
      ctx.beginPath()
      ctx.moveTo(lineStartX, lineStartY)
      ctx.lineTo(lineEndX, lineEndY)
      ctx.stroke()
    }

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
  const { position, img, color, count } = army
  if (img)
    ctx.drawImage(
      img,
      position.x - ARMY_RADIUS,
      position.y - ARMY_RADIUS,
      ARMY_RADIUS * 2,
      ARMY_RADIUS * 2
    )

  ctx.font = 'bold 15px Verdana'
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(String(count), position.x, position.y + COUNT_MARGIN - 35)
}

export const getGameStats = (
  areas: Area[],
  armies: Army[]
): { stats: GameStats[]; isFinish?: boolean } => {
  const defaultValues = { blue: 0, red: 0, green: 0, orange: 0, gray: 0 }
  const allElements = [...areas, ...armies]
  const allCount = allElements.reduce((acc, i) => acc + i.count, 0)
  const areasByOwner: Record<AreaOwner, number> = areas.reduce((acc, i) => {
    return { ...acc, [i.owner]: acc?.[i.owner] + 1 }
  }, defaultValues)
  const countByOwner: Record<AreaOwner, number> = allElements.reduce(
    (acc, i) => {
      return { ...acc, [i.owner]: acc?.[i.owner] + i.count }
    },
    defaultValues
  )

  const stats = Object.entries(defaultValues).map(([key]) => {
    const owner = key as AreaOwner
    return {
      owner,
      areasCount: areasByOwner[owner],
      count: countByOwner[owner],
      color: areasExtendedMap[owner].color,
      armiesPercent: countByOwner[owner] / allCount,
    }
  })

  const isFinish = stats.filter(i => i.owner !== 'gray' && i.count).length <= 1

  if (isFinish) {
    const statsWithWinner = stats.map(i =>
      i.owner !== 'gray' && i.count ? { ...i, isWinner: true } : i
    )
    return { stats: statsWithWinner, isFinish: true }
  }

  return { stats, isFinish: false }
}

export const drawPowerBar = (
  ctx: CanvasRenderingContext2D,
  stats: GameStats[]
): void => {
  const POWER_BAR_WIDTH = 600
  const POWER_BAR_HEIGHT = 30
  const POWER_BAR_COLOR = 'white'
  const GAP_WIDTH = 5
  const POWER_BAR_START_POINT = innerWidth / 2 - POWER_BAR_WIDTH / 2
  const POWER_BAR_INNER_WIDTH = POWER_BAR_WIDTH - GAP_WIDTH * 2

  ctx.fillStyle = POWER_BAR_COLOR
  ctx.fillRect(POWER_BAR_START_POINT, 20, POWER_BAR_WIDTH, POWER_BAR_HEIGHT)

  let startPoint = POWER_BAR_START_POINT + GAP_WIDTH
  stats.forEach(i => {
    ctx.fillStyle = i.color
    const width = POWER_BAR_INNER_WIDTH * i.armiesPercent
    ctx.fillRect(startPoint, 25, width, POWER_BAR_HEIGHT - 10)
    startPoint = startPoint + width
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

export const getTime = (seconds?: number): string => {
  if (!seconds) {
    return '00:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`
  return `${formattedMinutes}:${formattedSeconds}`
}
