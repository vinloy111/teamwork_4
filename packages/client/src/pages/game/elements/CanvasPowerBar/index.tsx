import React, { useEffect, useRef, useState } from 'react'
import { Area, Army, GameStats } from 'types/GameData'
import { CanvasSize } from 'types/GameStats'
import { drawPowerBar, getGameStats } from '../../utils/others'
import './style.css'

type Props = {
  areas: Area[]
  armies: Army[]
  canvasSize: CanvasSize
  finishGame: (stats: GameStats[]) => void
}

export const CanvasPowerBar = React?.memo((props: Props): JSX.Element => {
  const { areas, armies, canvasSize, finishGame } = props
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
      const { stats, isFinish } = getGameStats(areas, armies)
      drawPowerBar(ctx, stats)

      if (isFinish) finishGame(stats)
    }
  }, [ctx, areas, armies])

  return (
    <div className="canvas-power-bar-wrapper">
      <canvas ref={canvasRef} />
    </div>
  )
})
