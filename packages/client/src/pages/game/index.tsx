import { useEffect, useState } from 'react'
import { CanvasAreas } from './CanvasAreas'
import { CanvasArmies } from './CanvasArmies'
import { Area, AreaBase, Army } from './GameTypes'
import './style.css'
import { distanceBetweenPoints, intermediatePoint } from './utils'

const PLAYERS_DEFAULT_ARMY_COUNT = 15
const PLAYERS_COUNT_LIMIT = 50
const FREE_LAND_DEFAULT_ARMY_COUNT = 10
const FREE_LAND_COUNT_LIMIT = 10
const BLUE_COLOR = '#355070'
const GRAY_COLOR = '#bcbcba'
const RED_COLOR = '#e56b6f'
const ARMY_STEP_LENGTH = 10

export const areasExtendedMap = {
  user: {
    color: BLUE_COLOR,
    count: PLAYERS_DEFAULT_ARMY_COUNT,
    limit: PLAYERS_COUNT_LIMIT,
  },
  computer: {
    color: RED_COLOR,
    count: PLAYERS_DEFAULT_ARMY_COUNT,
    limit: PLAYERS_COUNT_LIMIT,
  },
  freeLands: {
    color: GRAY_COLOR,
    count: FREE_LAND_DEFAULT_ARMY_COUNT,
    limit: FREE_LAND_COUNT_LIMIT,
  },
}

// TODO: Доработать чтобы координаты динамически вычислялись исходя из размера экрана
const areasBase: AreaBase[] = [
  {
    id: 1,
    position: {
      x: 336,
      y: 362,
    },
    owner: 'user',
  },
  {
    id: 2,
    position: {
      x: 481,
      y: 630,
    },
    owner: 'freeLands',
  },
  {
    id: 3,
    position: {
      x: 620,
      y: 403,
    },
    owner: 'freeLands',
  },
  {
    id: 4,
    position: {
      x: 856,
      y: 476,
    },
    owner: 'freeLands',
  },
  {
    id: 5,
    position: {
      x: 939,
      y: 700,
    },
    owner: 'freeLands',
  },
  {
    id: 6,
    position: {
      x: 1181,
      y: 409,
    },
    owner: 'freeLands',
  },
  {
    id: 7,
    position: {
      x: 1393,
      y: 642,
    },
    owner: 'freeLands',
  },
  {
    id: 8,
    position: {
      x: 1403,
      y: 348,
    },
    owner: 'freeLands',
  },
  {
    id: 9,
    position: {
      x: 1582,
      y: 663,
    },
    owner: 'freeLands',
  },
  {
    id: 10,
    position: {
      x: 892,
      y: 256,
    },
    owner: 'freeLands',
  },
  {
    id: 11,
    position: {
      x: 1552,
      y: 399,
    },
    owner: 'computer',
  },
]

const areasDefault = areasBase.map(i => ({
  ...i,
  ...areasExtendedMap[i.owner],
}))

export const GamePage = (): JSX.Element => {
  const [areas, setAreas] = useState<Area[]>(areasDefault)
  const [armies, setArmies] = useState<Army[]>([])
  const [currentSecond, setCurrentSeconds] = useState<number>(0)
  const [currentFrame, setCurrentFrame] = useState<number>(0)

  const animate = (currentTime = 0): void => {
    const second = Math.floor(currentTime / 1000)
    setCurrentSeconds(second)
    const frame = Math.floor(currentTime / 33)
    setCurrentFrame(frame)

    requestAnimationFrame(animate)
  }

  useEffect(() => animate(), [])

  useEffect(() => {
    setAreas(a =>
      a.map(i => ({
        ...i,
        count: i.count < i.limit ? i.count + 1 : i.count,
      }))
    )
  }, [currentSecond])

  useEffect(() => {
    setArmies(a =>
      a.map(i => ({
        ...i,
        distance: i.distance - i.stepLength,
        position: intermediatePoint(
          i.position,
          i.targetPosition,
          i.stepLength / i.distance
        ),
      }))
    )
    armies.forEach(checkCollapse)
  }, [currentFrame])

  const checkCollapse = (army: Army): void => {
    if (army.distance <= army.stepLength) {
      const attacker = areas.find(i => i.id == army.fromId)
      const defender = areas.find(i => i.id == army.toId)

      if (attacker && defender && attacker?.owner !== defender?.owner) {
        setAreas(a => {
          const otherAreas = a.filter(i => i.id !== defender.id)
          const isCapture = army.count > defender.count
          const newOwner = isCapture ? attacker.owner : defender.owner
          const newCount = isCapture
            ? army.count - defender.count
            : defender.count - army.count
          return [
            ...otherAreas,
            {
              ...defender,
              owner: newOwner,
              count: newCount,
              color: areasExtendedMap[newOwner].color,
              limit: areasExtendedMap[newOwner].limit,
            },
          ]
        })
      } else if (attacker && defender) {
        setAreas(a => {
          const otherAreas = a.filter(i => i.id !== defender.id)
          return [
            ...otherAreas,
            {
              ...defender,
              count: defender.count + army.count,
            },
          ]
        })
      }

      setArmies(a => {
        const otherArmies = a.filter(i => i.id !== army.id)
        return [...otherArmies]
      })
    }
  }

  // TODO: Придумать для армий нормальный ID
  const onSendArmy = (attacker: Area, defender: Area): void => {
    setAreas(a => {
      const otherAreas = a.filter(i => i.id !== attacker.id)
      return [...otherAreas, { ...attacker, count: 0 }]
    })
    setArmies(a => {
      const distance = distanceBetweenPoints(
        { x: attacker.position.x, y: attacker.position.y },
        { x: defender.position.x, y: defender.position.y }
      )
      const stepLength = ARMY_STEP_LENGTH
      const stepCount = distance / stepLength
      return [
        ...a,
        {
          id: attacker.position.x + attacker.position.y + attacker.count, // TODO: Сделать для армий нормальный уникальный ID
          color: attacker.color,
          count: attacker.count,
          stepLength,
          stepCount,
          distance,
          position: { x: attacker.position.x, y: attacker.position.y },
          targetPosition: { x: defender.position.x, y: defender.position.y },
          fromId: attacker.id,
          toId: defender.id,
        },
      ]
    })
  }

  return (
    <div className="game-wrapper">
      <CanvasArmies armies={armies} />
      {/* TODO: onSendArmy каждый раз отправляется повторно, надо бы это исправить */}
      <CanvasAreas areas={areas} onSendArmy={onSendArmy} />
    </div>
  )
}
