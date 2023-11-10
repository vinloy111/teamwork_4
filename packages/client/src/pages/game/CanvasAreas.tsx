import React, { useEffect, useRef, MouseEvent, useState } from 'react'
import { Area } from './GameTypes'
import {
  checkDotIntoCircle,
  drawArrow,
  drawCircle,
  drawCircleBorder,
  drawPowerBar,
} from './utils'
import './style.css'

type Props = {
  areas: Area[]
  onSendArmy: (attacker: Area, defender: Area) => void
}

export const CanvasAreas = React.memo((props: Props): JSX.Element => {
  const { areas, onSendArmy } = props
  const [isMouseDown, setIsMouseDown] = useState<undefined | number>(undefined)
  const [isMouseMove, setIsMouseMove] = useState<
    undefined | { x: number; y: number; target?: Area }
  >(undefined)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext?.('2d')
      canvasRef.current.width = innerWidth
      canvasRef.current.height = innerHeight

      if (ctx) {
        areas?.forEach(i => drawCircle(ctx, i))
        drawPowerBar(ctx, areas) // TODO: Вероятно PowerBar имеет смысл тоже вынести в отдельный Canvas, но не факт

        const isMouseDownTarget = areas.find(i => i.id == isMouseDown)
        if (isMouseDownTarget) {
          if (
            isMouseDownTarget?.id &&
            isMouseMove?.target &&
            isMouseDownTarget?.id !== isMouseMove.target?.id
          ) {
            drawCircleBorder(ctx, isMouseMove.target, isMouseDownTarget.color)
          }

          drawArrow(ctx, {
            color: isMouseDownTarget.color,
            startX: isMouseDownTarget.position.x,
            startY: isMouseDownTarget.position.y,
            endX: isMouseMove?.x,
            endY: isMouseMove?.y,
          })
        }
      }
    }
  }, [areas, isMouseDown, isMouseMove])

  const onMouseDown = (e: MouseEvent<HTMLCanvasElement>): void => {
    console.log({ posX: e.clientX, posY: e.clientY })
    const finded = areas.find(i =>
      checkDotIntoCircle({ x: e.clientX, y: e.clientY }, i)
    )
    if (finded) setIsMouseDown(finded.id)
  }

  const onMouseUp = (e: MouseEvent<HTMLCanvasElement>): void => {
    const defender = areas.find(i =>
      checkDotIntoCircle({ x: e.clientX, y: e.clientY }, i)
    )
    const attacker = areas.find(i => i.id == isMouseDown)
    if (defender && attacker && attacker.id !== defender.id) {
      onSendArmy(attacker, defender)
    }
    setIsMouseDown(undefined)
    setIsMouseMove(undefined)
  }

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>): void => {
    if (isMouseDown) {
      const finded = areas.find(i =>
        checkDotIntoCircle({ x: e.clientX, y: e.clientY }, i)
      )
      setIsMouseMove({
        x: e.clientX,
        y: e.clientY,
        target: finded || undefined,
      })
    }
  }

  return (
    <div className="game-canvas-wrapper">
      <canvas
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        ref={canvasRef}
      />
    </div>
  )
})
