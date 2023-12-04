import { Area, AreaOwner } from 'types/GameData'
import { CanvasSize, Player, PlayerSettings } from 'types/GameStats'
import { areasExtendedMap } from '../gameConfig'

const randomPlaceAreas = (
  canvasSize: CanvasSize,
  count: number,
  playersCount: number
): { x: number; y: number }[] => {
  const xOffset = 200
  const yOffset = 150
  const availableWidth = canvasSize.width - 2 * xOffset
  const availableHeight = canvasSize.height - 2 * yOffset
  const pointOffset = (canvasSize.width + canvasSize.height) / count
  const points: { x: number; y: number }[] = []
  let startPoints: { x: number; y: number }[] = []

  if (playersCount === 2) {
    startPoints = [
      { x: xOffset / 2, y: canvasSize.height / 2 },
      {
        x: canvasSize.width - xOffset / 2,
        y: canvasSize.height / 2,
      },
    ]
  } else if (playersCount === 3) {
    startPoints = [
      { x: xOffset, y: canvasSize.height - yOffset },
      { x: canvasSize.width / 2, y: yOffset },
      { x: canvasSize.width - xOffset, y: canvasSize.height - yOffset },
    ]
  } else if (playersCount === 4) {
    startPoints = [
      { x: xOffset, y: yOffset },
      { x: xOffset, y: canvasSize.height - yOffset },
      { x: canvasSize.width - xOffset, y: yOffset },
      { x: canvasSize.width - xOffset, y: canvasSize.height - yOffset },
    ]
  }

  for (let i = 2; i < count; i++) {
    let x: number, y: number
    let attempts = 0
    do {
      x = Math.random() * availableWidth + xOffset
      y = Math.random() * availableHeight + yOffset
      attempts++
      if (attempts > 2000) {
        throw new Error(
          'Слишком большое кол-во планет, не удается их разместить. Уменьшите кол-во планет в настройках для возможности запустить игру'
        )
      }
    } while (
      [...startPoints, ...points].some(
        point =>
          Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2) < pointOffset
      )
    )
    points.push({ x, y })
  }

  return [...startPoints, ...points]
}

export const generateAreas = (
  canvasSize: CanvasSize,
  count: number,
  areas: Record<string, HTMLImageElement>,
  playersSettings: PlayerSettings[]
): Area[] => {
  const areasCount = new Array(count).fill({})
  const coords = randomPlaceAreas(canvasSize, count, playersSettings.length)
  const shuffleAreas = Object.values(areas).sort(() => Math.random() - 0.5)

  return areasCount.map((_, index) => {
    const id = index + 1

    const player = playersSettings[index]?.player ?? Player.none
    const owner = playersSettings[index]?.color ?? AreaOwner.gray

    return {
      id: String(id),
      position: {
        x: coords[index].x,
        y: coords[index].y,
      },
      owner,
      player,
      img: shuffleAreas[index],
      ...areasExtendedMap[owner],
    }
  })
}
