import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import { Area, ID } from 'types/GameData'
import { CanvasSize } from 'types/GameStats'
import {
  checkDotIntoCircle,
  drawArrow,
  drawCircle,
  drawCircleBorder,
} from '../../utils'
import './style.css'

type Props = {
  areas: Area[]
  onSendArmy: (attacker: Area, defender: Area) => void
  canvasSize: CanvasSize
}

export const CanvasAreas = React?.memo((props: Props): JSX.Element => {
  const { areas, onSendArmy, canvasSize } = props
  const [isMouseDown, setIsMouseDown] = useState<undefined | ID>(undefined)
  const [isMouseMove, setIsMouseMove] = useState<
    undefined | { x: number; y: number; target?: Area }
  >(undefined)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext?.('2d')
      canvasRef.current.width = canvasSize.width
      canvasRef.current.height = canvasSize.height

      if (ctx) {
        areas?.forEach(i => drawCircle(ctx, i))

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
    console.log(e.nativeEvent.offsetX)
    console.log({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    const finded = areas.find(i =>
      checkDotIntoCircle(
        { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
        i
      )
    )
    if (finded) setIsMouseDown(finded.id)
  }

  const onMouseUp = (e: MouseEvent<HTMLCanvasElement>): void => {
    const defender = areas.find(i =>
      checkDotIntoCircle(
        { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
        i
      )
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
        checkDotIntoCircle(
          { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
          i
        )
      )
      setIsMouseMove({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
        target: finded,
      })
    }
  }

  return (
    <div className="canvas-areas-wrapper">
      <canvas
        style={isMouseDown ? { cursor: 'none' } : undefined}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        ref={canvasRef}
      />
    </div>
  )
})
