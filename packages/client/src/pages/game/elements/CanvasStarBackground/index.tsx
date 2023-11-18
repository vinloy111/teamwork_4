import { useEffect, useRef, useState } from 'react'
import { Star } from 'types/GameData'
import { CanvasSize } from 'types/GameStats'
import './style.css'

const STARS_CONFIG = {
  starsCount: 1000,
  minRadius: 0.5,
  maxRadius: 1.5,
  colors: [
    'rgba(255, 255, 255, 0.5)',
    'rgba(252, 244, 201, 0.5)',
    'rgba(201, 252, 201, 0.5)',
    'rgba(201, 236, 252, 0.5)',
    'rgba(229, 201, 252, 0.5)',
    'rgba(252, 201, 201, 0.5)',
    'rgba(252, 201, 241, 0.5)',
    'rgba(252, 201, 201, 0.5)',
  ],
  step: 0.05,
  trangles: 4,
  intervalRadius: 2.5,
}

type Props = {
  canvasSize: CanvasSize
}

export const CanvasStarBackground = ({ canvasSize }: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [currentFrame, setCurrentFrame] = useState<number>(0)
  const [stars, setStars] = useState<Star[]>([])

  const animate = (currentTime = 0): void => {
    const frame = Math.floor(currentTime / 33)
    setCurrentFrame(frame)
    requestAnimationFrame(animate)
  }

  const createStar = () => {
    const colorIndex = Math.round(Math.random() * STARS_CONFIG.colors.length)
    const minRadius =
      STARS_CONFIG.minRadius +
      Math.random() * (STARS_CONFIG.maxRadius - STARS_CONFIG.minRadius)

    return {
      x: Math.random() * canvasSize.width,
      y: Math.random() * canvasSize.height,
      color: STARS_CONFIG.colors[colorIndex],
      vector: Math.round(Math.random()) || -1,
      minRadius,
      maxRadius: minRadius + STARS_CONFIG.intervalRadius,
    }
  }

  useEffect(() => {
    if (canvasRef.current && canvasSize.width && canvasSize.height) {
      const stars = Array(STARS_CONFIG.starsCount).fill({}).map(createStar)
      setStars(stars)

      const ctx = canvasRef.current?.getContext?.('2d')
      canvasRef.current.width = canvasSize.width
      canvasRef.current.height = canvasSize.height
      setCtx(ctx)

      animate()
    }
  }, [canvasRef, canvasSize])

  const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
    ctx.beginPath()
    ctx.moveTo(star.x, star.y + star.minRadius)
    for (let i = 0; i < 2 * STARS_CONFIG.trangles + 1; i++) {
      const r = i % 2 == 0 ? star.minRadius : star.maxRadius
      const a = (Math.PI * i) / STARS_CONFIG.trangles + (45 * Math.PI) / 180
      ctx.lineTo(star.x + r * Math.sin(a), star.y + r * Math.cos(a))
    }
    ctx.closePath()
    ctx.fillStyle = star.color
    ctx.fill()
  }

  const changeStar = (star: Star) => {
    const vector =
      star.minRadius > STARS_CONFIG.maxRadius ||
      star.minRadius < STARS_CONFIG.minRadius
        ? star.vector * -1
        : star.vector

    return {
      ...star,
      vector: vector,
      minRadius: star.minRadius + STARS_CONFIG.step * vector,
      maxRadius: star.maxRadius + STARS_CONFIG.step * vector,
    }
  }

  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
      stars.map(i => drawStar(ctx, i))
      setStars(s => s.map(changeStar))
    }
  }, [currentFrame])

  return (
    <div className="canvas-star-background">
      <canvas ref={canvasRef} />
    </div>
  )
}
