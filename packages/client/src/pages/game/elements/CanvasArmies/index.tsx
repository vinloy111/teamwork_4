import React, { useEffect, useRef, useState } from 'react'
import { Army } from 'types/GameData'
import { CanvasSize } from 'types/GameStats'
import { drawArmy } from '../../utils'
import './style.css'

type Props = {
  armies: Army[]
  canvasSize: CanvasSize
}

export const CanvasArmies = React?.memo((props: Props): JSX.Element => {
  const { armies, canvasSize } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // TODO: Переделать на 2 useEffect
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext?.('2d')
      canvasRef.current.width = canvasSize.width
      canvasRef.current.height = canvasSize.height

      if (ctx) armies?.forEach(i => drawArmy(ctx, i))
    }
  }, [armies])

  return (
    <div className="canvas-army-wrapper">
      <canvas ref={canvasRef} />
    </div>
  )
})
