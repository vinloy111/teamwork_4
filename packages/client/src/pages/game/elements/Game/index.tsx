import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CanvasAreas } from '../CanvasAreas'
import { CanvasArmies } from '../CanvasArmies'
import { Area, Army } from 'types/GameData'
import { distanceBetweenPoints, intermediatePoint } from '../../utils'
import { areasBase, areasExtendedMap, GAME_CONSTS } from '../../config'
import { CanvasPowerBar } from '../CanvasPowerBar'
import { CPULogic } from '../CPULogic'

const areasDefault = areasBase.map(i => ({
  ...i,
  ...areasExtendedMap[i.owner],
}))

const canvasSize = {
  width: innerWidth,
  height: innerHeight,
}

export const Game = (): JSX.Element => {
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
        count:
          i.owner !== 'freeLands' && i.count < i.limit ? i.count + 1 : i.count,
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
    <>
      <CanvasPowerBar areas={areas} armies={armies} canvasSize={canvasSize} />
      <CanvasArmies armies={armies} canvasSize={canvasSize} />
      {/* TODO: onSendArmy каждый раз отправляется повторно, надо бы это исправить */}
      <CanvasAreas
        areas={areas}
        onSendArmy={onSendArmy}
        canvasSize={canvasSize}
      />
      <CPULogic
        owner="computer"
        areas={areas}
        onSendArmy={onSendArmy}
        seconds={currentSecond}
      />
    </>
  )
}