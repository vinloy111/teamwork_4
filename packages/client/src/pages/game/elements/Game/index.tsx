import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CanvasAreas } from '../CanvasAreas'
import { CanvasArmies } from '../CanvasArmies'
import {
  Area,
  Army,
  GameRecources,
  GameResult,
  GameStats,
} from 'types/GameData'
import { distanceBetweenPoints, intermediatePoint } from '../../utils/others'
import { areasExtendedMap, GAME_CONSTS } from '../../utils/gameConfig'
import { CanvasPowerBar } from '../CanvasPowerBar'
import { CPULogic } from '../CPULogic'
import { CanvasSize } from 'types/GameStats'
import { GameMenu } from '../GameMenu'
import { generateAreas } from '../../utils/generateAreas'

type Props = {
  finishGame: (stats: GameResult) => void
  breakGame: () => void
  canvasSize: CanvasSize
  recources: GameRecources
  areasCount: number
  difficulty: React.ComponentProps<typeof CPULogic>['difficulty']
}

export const Game = (props: Props): JSX.Element => {
  const {
    finishGame,
    breakGame,
    canvasSize,
    recources,
    areasCount,
    difficulty,
  } = props
  const [areas, setAreas] = useState<Area[]>([])
  const [armies, setArmies] = useState<Army[]>([])
  const [currentSecond, setCurrentSeconds] = useState<number>(0)
  const [currentFrame, setCurrentFrame] = useState<number>(0)

  let startTime = 0 // Хак для сброса времени при перезапуске игры
  const animate = (currentTime = 0): void => {
    if (!startTime) startTime = currentTime
    const time = currentTime - startTime
    const second = Math.floor(time / 1000)
    setCurrentSeconds(second)
    const frame = Math.floor(time / 33)
    setCurrentFrame(frame)

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    const areasDefault = generateAreas(canvasSize, areasCount, recources.areas)
    setAreas(areasDefault)

    animate()
  }, [])

  useEffect(() => {
    // Увеличение численности в локациях
    setAreas(a =>
      a.map(i => ({
        ...i,
        count:
          i.owner !== 'freeLands' && i.count < i.limit ? i.count + 1 : i.count,
      }))
    )
  }, [currentSecond])

  useEffect(() => {
    // Передвижение армий
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
    // Проверка дошли ли армии до точки назначения, и если да, то "атака"
    armies.forEach(checkCollapse)
  }, [currentFrame])

  const checkCollapse = (army: Army): void => {
    if (army.distance <= army.stepLength) {
      const defender = areas.find(i => i.id == army.toId)

      if (defender && army?.owner !== defender?.owner) {
        setAreas(a => {
          const otherAreas = a.filter(i => i.id !== defender.id)
          const isCapture = army.count > defender.count
          const newOwner = isCapture ? army.owner : defender.owner
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
      } else if (army && defender) {
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
      const stepLength = GAME_CONSTS.ARMY_STEP_LENGTH
      const stepCount = distance / stepLength
      return [
        ...a,
        {
          id: uuidv4(),
          owner: attacker.owner,
          color: attacker.color,
          img: recources.armies[areasExtendedMap[attacker.owner].imgLink],
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

  const sendGameResult = (stats: GameStats[]) => {
    finishGame({ stats, seconds: currentSecond })
  }

  return currentFrame ? (
    <>
      <CanvasPowerBar
        areas={areas}
        armies={armies}
        finishGame={sendGameResult}
        canvasSize={canvasSize}
      />
      {/* TODO: onSendArmy каждый раз отправляется повторно, надо бы это исправить */}
      <CanvasAreas
        areas={areas}
        onSendArmy={onSendArmy}
        canvasSize={canvasSize}
      />
      <CanvasArmies armies={armies} canvasSize={canvasSize} />
      <GameMenu seconds={currentSecond} breakGame={breakGame} />
      <CPULogic
        owner="computer"
        difficulty={difficulty}
        areas={areas}
        onSendArmy={onSendArmy}
        seconds={currentSecond}
      />
    </>
  ) : (
    <></>
  )
}
