import React, { useEffect, useRef } from 'react'
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

  // TODO: Переделать на 2 useEffect
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext?.('2d')
      canvasRef.current.width = canvasSize.width
      canvasRef.current.height = canvasSize.height

      if (ctx) {
        const { stats, isFinish } = getGameStats(areas, armies)
        drawPowerBar(ctx, stats)

        if (isFinish) finishGame(stats)
      }
    }
  }, [areas, armies])

  return (
    <div className="canvas-power-bar-wrapper">
      <canvas ref={canvasRef} />
    </div>
  )
})
