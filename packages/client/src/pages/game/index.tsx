import { useEffect, useRef, useState } from 'react'
import { CanvasStarBackground } from './elements/CanvasStarBackground'
import { StartScreen } from './elements/StartScreen'
import { FinalScreen } from './elements/FinalScreen'
import { Game } from './elements/Game'
import { GameDifficulty, GameScreen } from 'types/GameStats'
import { GameRecources, GameResult } from 'types/GameData'
import './style.css'
import { RecourcesLoader } from './elements/RecourcesLoader'

export const GamePage = (): JSX.Element => {
  const gameWrapper = useRef<HTMLDivElement>(null)
  const [difficulty, setDifficulty] = useState<GameDifficulty>(
    GameDifficulty.easy
  )
  const [areasCount, setAreasCount] = useState<number>(12)
  const [recources, setRecources] = useState<GameRecources | null>(null)
  const [gameStatus, setGameStatus] = useState<GameScreen>(
    GameScreen.startScreen
  )
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
    setGameStatus(GameScreen.gameScreen)
  }

  const finishGame = (stats: GameResult) => {
    setGameInfo(stats)
    setGameStatus(GameScreen.finalScreen)
  }

  const breakGame = () => {
    setGameInfo(undefined)
    setGameStatus(GameScreen.startScreen)
  }

  const content: Record<GameScreen, JSX.Element> = {
    startScreen: (
      <StartScreen
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        areasCount={areasCount}
        setAreasCount={setAreasCount}
        isLoaded={Boolean(recources)}
        runGame={runGame}
      />
    ),
    gameScreen: recources ? (
      <Game
        canvasSize={canvasSize}
        areasCount={areasCount}
        difficulty={difficulty}
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
        showStarScreen={breakGame}
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
