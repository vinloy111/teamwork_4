import { Area } from 'types/GameData'
import { CanvasSize } from 'types/GameStats'
import { areasExtendedMap } from '../gameConfig'

const randomPlaceAreas = (
  canvasSize: CanvasSize,
  count: number
): { x: number; y: number }[] => {
  const xOffset = 200
  const yOffset = 150
  const availableWidth = canvasSize.width - 2 * xOffset
  const availableHeight = canvasSize.height - 2 * yOffset
  const pointOffset = (canvasSize.width + canvasSize.height) / count
  const points: { x: number; y: number }[] = []

  const firstPoint = { x: xOffset / 2, y: canvasSize.height / 2 }
  const lastPoint = {
    x: canvasSize.width - xOffset / 2,
    y: canvasSize.height / 2,
  }

  for (let i = 2; i < count; i++) {
    let x: number, y: number
    let attempts = 0
    do {
      x = Math.random() * availableWidth + xOffset
      y = Math.random() * availableHeight + yOffset
      attempts++
      if (attempts > 200) {
        throw new Error(
          'Слишком большое кол-во планет, не удается их разместить. Уменьшите кол-во планет для возможности запустить игру'
        )
      }
    } while (
      [firstPoint, ...points, lastPoint].some(
        point =>
          Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2) < pointOffset
      )
    )
    points.push({ x, y })
  }

  return [firstPoint, ...points, lastPoint]
}

export const generateAreas = (
  canvasSize: CanvasSize,
  count: number,
  areas: Record<string, HTMLImageElement>
): Area[] => {
  const areasCount = new Array(count).fill({})
  const coords = randomPlaceAreas(canvasSize, count)
  const shuffleAreas = Object.values(areas).sort(() => Math.random() - 0.5)

  return areasCount.map((_, index) => {
    const id = index + 1
    const owner = id === 1 ? 'user' : id === count ? 'computer' : 'freeLands'

    return {
      id: String(id),
      position: {
        x: coords[index].x,
        y: coords[index].y,
      },
      owner,
      img: shuffleAreas[index],
      ...areasExtendedMap[owner],
    }
  })
}
