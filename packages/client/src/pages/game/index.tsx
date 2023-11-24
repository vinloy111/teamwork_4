import { useEffect, useRef, useState } from 'react'
import { CanvasStarBackground } from './elements/CanvasStarBackground'
import { StartScreen } from './elements/StartScreen'
import { FinalScreen } from './elements/FinalScreen'
import { Game } from './elements/Game'
import { GameDifficulty, GameScreen } from 'types/GameStats'
import { GameRecources, GameResult } from 'types/GameData'
import { RecourcesLoader } from './elements/RecourcesLoader'
import { useSelector } from 'react-redux'
import { Store } from 'src/store'
import './style.css'

export const GamePage = (): JSX.Element => {
  const gameWrapper = useRef<HTMLDivElement>(null)
  const { gameSettings } = useSelector((state: Store) => state)
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

  useEffect(() => {
    if (recources?.audio?.backgroundMusic) {
      recources.audio.backgroundMusic.volume =
        gameSettings.backgroundMusicVolume
    }
    if (recources?.audio?.lose) {
      recources.audio.lose.volume = gameSettings.soundVolume
    }
    if (recources?.audio?.start) {
      recources.audio.start.volume = gameSettings.soundVolume
    }
    if (recources?.audio?.win) {
      recources.audio.win.volume = gameSettings.soundVolume
    }
  }, [recources?.audio, gameSettings])

  const runGame = () => {
    if (recources?.audio?.backgroundMusic) {
      recources.audio.backgroundMusic.loop = true
      recources.audio.backgroundMusic.currentTime = 0
      recources.audio.backgroundMusic.play()
    }
    setGameInfo(undefined)
    setGameStatus(GameScreen.gameScreen)
  }

  const finishGame = (stats: GameResult) => {
    recources?.audio?.backgroundMusic?.pause()
    setGameInfo(stats)
    setGameStatus(GameScreen.finalScreen)
  }

  const breakGame = () => {
    recources?.audio?.backgroundMusic?.pause()
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
