import { useEffect, useRef, useState } from 'react'
import { CanvasStarBackground } from './elements/CanvasStarBackground'
import { StartScreen } from './elements/StartScreen'
import { FinalScreen } from './elements/FinalScreen'
import { Game } from './elements/Game'
import { GameScreen } from 'types/GameStats'
import { GameRecources, GameResult } from 'types/GameData'
import './style.css'
import { RecourcesLoader } from './elements/RecourcesLoader'

export const GamePage = (): JSX.Element => {
  const gameWrapper = useRef<HTMLDivElement>(null)
  const [recources, setRecources] = useState<GameRecources | null>(null)
  const [gameStatus, setGameStatus] = useState<GameScreen>('startScreen')
  const [canvasSize, setCanvasSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [gameInfo, setGameInfo] = useState<GameResult | undefined>(undefined)

  useEffect(() => {
    if (gameWrapper.current?.clientWidth && gameWrapper.current?.clientHeight) {
      setCanvasSize({
        width: gameWrapper.current?.clientWidth,
        height: gameWrapper.current?.clientHeight,
      })
    }
  }, [gameWrapper.current?.clientWidth, gameWrapper.current?.clientHeight])

  const runGame = () => {
    setGameInfo(undefined)
    setGameStatus('gameScreen')
  }

  const finishGame = (stats: GameResult) => {
    setGameInfo(stats)
    setGameStatus('finalScreen')
  }

  const breakGame = () => {
    setGameInfo(undefined)
    setGameStatus('startScreen')
  }

  const content: Record<GameScreen, JSX.Element> = {
    startScreen: (
      <StartScreen
        isLoaded={Boolean(recources)}
        runGame={() => setGameStatus('gameScreen')}
      />
    ),
    gameScreen: recources ? (
      <Game
        canvasSize={canvasSize}
        recources={recources}
        finishGame={finishGame}
        breakGame={breakGame}
      />
    ) : (
      <></>
    ),
    finalScreen: (
      <FinalScreen
        gameInfo={gameInfo}
        showStarScreen={() => setGameStatus('startScreen')}
        runGame={runGame}
      />
    ),
  }

  return (
    <div ref={gameWrapper} className="game-wrapper">
      <RecourcesLoader setRecources={setRecources} />
      <CanvasStarBackground canvasSize={canvasSize} />
      {content[gameStatus]}
    </div>
  )
}
