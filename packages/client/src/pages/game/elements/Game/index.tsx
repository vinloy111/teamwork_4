import { useEffect, useRef, useState } from 'react'
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
  const [pauseState, setPauseState] = useState<boolean>(false)
  const pause = useRef<boolean>(false)
  const deltaTime = useRef<number>(0)
  const lastUpdate = useRef<number>(0)
  const time = useRef<number>(0)
  const [currentSecond, setCurrentSeconds] = useState<number>(0)
  const [currentFrame, setCurrentFrame] = useState<number>(0)

  const animate = (currentTime: number): void => {
    deltaTime.current = currentTime - lastUpdate.current
    lastUpdate.current = currentTime

    if (!pause.current && deltaTime.current < GAME_CONSTS.MAX_FRAME_INTERVAL) {
      time.current = time.current + deltaTime.current

      const roundSec = Math.round(time.current / 1000)
      if (roundSec > currentSecond) setCurrentSeconds(roundSec)
      setCurrentFrame(time.current)
    }

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    const areasDefault = generateAreas(canvasSize, areasCount, recources.areas)
    setAreas(areasDefault)

    animate(0)
  }, [])

  useEffect(() => {
    // Увеличение численности в локациях
    setAreas(a =>
      a.map(i =>
        i.owner === 'freeLands'
          ? i
          : {
              ...i,
              count:
                i.count === i.limit
                  ? i.count
                  : i.count < i.limit
                  ? i.count + 1
                  : i.count - 1,
            }
      )
    )
  }, [currentSecond])

  useEffect(() => {
    // Передвижение армий
    setArmies(a =>
      a.map(i => ({
        ...i,
        distance: i.distance - (i.stepLength * deltaTime.current) / 1000,
        position: intermediatePoint(
          i.position,
          i.targetPosition,
          (i.stepLength * deltaTime.current) / 1000 / i.distance
        ),
      }))
    )
    // Проверка дошли ли армии до точки назначения, и если да, то "атака"
    armies.forEach(checkCollapse)
  }, [currentFrame])

  const checkCollapse = (army: Army): void => {
    if (army.distance <= (army.stepLength * deltaTime.current) / 1000) {
      const defender = areas.find(i => i.id == army.toId)

      if (defender && army?.owner !== defender?.owner) {
        const isCapture = army.count > defender.count
        const isUserWin =
          (army.owner === 'user' && isCapture) ||
          (defender.owner === 'user' && !isCapture)
        const newOwner = isCapture ? army.owner : defender.owner
        const newCount = isCapture
          ? army.count - defender.count
          : defender.count - army.count
        if (army.owner === 'user' || defender.owner === 'user') {
          isUserWin
            ? recources?.audio?.win?.play()
            : recources?.audio?.lose?.play()
        }
        setAreas(a => {
          const otherAreas = a.filter(i => i.id !== defender.id)
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
        if (army.owner === 'user') {
          recources?.audio?.win?.play()
        }
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
    if (attacker.owner === 'user') {
      recources?.audio?.start?.play()
    }
    setAreas(a => {
      const otherAreas = a.filter(i => i.id !== attacker.id)
      return [...otherAreas, { ...attacker, count: 0 }]
    })
    setArmies(a => {
      const distance = distanceBetweenPoints(
        { x: attacker.position.x, y: attacker.position.y },
        { x: defender.position.x, y: defender.position.y }
      )
      const stepLength = GAME_CONSTS.ARMY_STEP_LENGTH_BY_SECOND
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

  const setPause = () => {
    pause.current
      ? recources?.audio?.backgroundMusic?.play()
      : recources?.audio?.backgroundMusic?.pause()
    pause.current = !pause.current
    setPauseState(v => !v)
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
      <GameMenu
        isPause={pauseState}
        seconds={currentSecond}
        setPause={setPause}
        breakGame={breakGame}
      />
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
