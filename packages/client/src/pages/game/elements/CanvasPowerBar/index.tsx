import React, { useEffect, useRef } from 'react'
import { Area, Army } from 'types/GameData'
import { CanvasSize } from 'types/GameStats'
import { drawPowerBar } from '../../utils'
import './style.css'

type Props = {
  areas: Area[]
  armies: Army[]
  canvasSize: CanvasSize
}

export const CanvasPowerBar = React?.memo((props: Props): JSX.Element => {
  const { areas, armies, canvasSize } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext?.('2d')
      canvasRef.current.width = canvasSize.width
      canvasRef.current.height = canvasSize.height

      if (ctx) drawPowerBar(ctx, areas, armies)
    }
  }, [areas, armies])

  return (
    <div className="canvas-power-bar-wrapper">
      <canvas ref={canvasRef} />
    </div>
  )
})
