import React, { useEffect, useRef, useState } from 'react'
import { Army } from 'types/GameData'
import { CanvasSize } from 'types/GameStats'
import { drawArmy } from '../../utils/others'
import './style.css'

type Props = {
  armies: Army[]
  canvasSize: CanvasSize
}

export const CanvasArmies = React?.memo((props: Props): JSX.Element => {
  const { armies, canvasSize } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext?.('2d')
      canvasRef.current.width = canvasSize.width
      canvasRef.current.height = canvasSize.height
      setCtx(ctx)
    }
  }, [canvasRef, canvasSize])

  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
      armies?.forEach(i => drawArmy(ctx, i))
    }
  }, [ctx, armies])

  return (
    <div className="canvas-army-wrapper">
      <canvas ref={canvasRef} />
    </div>
  )
})
