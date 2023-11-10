import React, { useEffect, useRef } from 'react'
import { Army } from '../../types/GameData'
import { drawArmy } from './utils'
import './style.css'

type Props = {
  armies: Army[]
}

export const CanvasArmies = React?.memo((props: Props): JSX.Element => {
  const { armies } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext?.('2d')
      canvasRef.current.width = innerWidth
      canvasRef.current.height = innerHeight

      if (ctx) armies?.forEach(i => drawArmy(ctx, i))
    }
  }, [armies])

  return (
    <div className="army-canvas-wrapper">
      <canvas ref={canvasRef} />
    </div>
  )
})
