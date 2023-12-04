import { useEffect, useRef, useState } from 'react'
import { CanvasStarBackground } from './elements/CanvasStarBackground'
import { StartScreen } from './elements/StartScreen'
import { FinalScreen } from './elements/FinalScreen'
import { Game } from './elements/Game'
import { GameScreen, Player, PlayerSettings } from 'types/GameStats'
import { GameResources, GameResult } from 'types/GameData'
import { ResourcesLoader } from './elements/ResourcesLoader'
import { useSelector } from 'react-redux'
import { Store } from 'src/store'
import { APP_CONSTS } from 'consts/index'
import './style.css'

export const GamePage = (): JSX.Element => {
  const gameWrapper = useRef<HTMLDivElement>(null)
  const { gameSettings } = useSelector((state: Store) => state)
  const [playersSettings, setPlayersSettings] = useState<PlayerSettings[]>(
    APP_CONSTS.defaultPlayersSettings
  )
  const actualPlayers = playersSettings.filter(i => i.player !== Player.none)
  const [areasCount, setAreasCount] = useState<number>(12)
  const [resources, setResources] = useState<GameResources | null>(null)
  const [gameStatus, setGameStatus] = useState<GameScreen>(
    GameScreen.startScreen
  )
  const [canvasSize, setCanvasSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [gameInfo, setGameInfo] = useState<GameResult | undefined>(undefined)

  // TODO: Доработать чтобы изменения размера экрана в процессе игры, могли корректно перерисовывать
  // игровую область пропорционально разнице начальных размеров и новых размеров
  useEffect(() => {
    const handleResize = () => {
      const width = gameWrapper.current?.clientWidth
      const height = gameWrapper.current?.clientHeight
      if (width && height) {
        setCanvasSize({
          width,
          height,
        })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [gameWrapper])

  useEffect(() => {
    if (resources?.audio) {
      const { backgroundMusic, lose, start, win } = resources.audio
      const { backgroundMusicVolume, soundVolume } = gameSettings

      if (backgroundMusic) backgroundMusic.volume = backgroundMusicVolume
      if (lose) lose.volume = soundVolume
      if (start) start.volume = soundVolume
      if (win) win.volume = soundVolume
    }
  }, [resources?.audio, gameSettings])

  const runGame = () => {
    const backgroundMusic = resources?.audio?.backgroundMusic
    if (backgroundMusic) {
      backgroundMusic.loop = true
      backgroundMusic.currentTime = 0
      backgroundMusic.play()
    }
    setGameInfo(undefined)
    setGameStatus(GameScreen.gameScreen)
  }

  const finishGame = (stats: GameResult) => {
    resources?.audio?.backgroundMusic?.pause()
    setGameInfo(stats)
    setGameStatus(GameScreen.finalScreen)
  }

  const breakGame = () => {
    resources?.audio?.backgroundMusic?.pause()
    setGameInfo(undefined)
    setGameStatus(GameScreen.startScreen)
  }

  const content: Record<GameScreen, JSX.Element> = {
    startScreen: (
      <StartScreen
        playersSettings={playersSettings}
        setPlayersSettings={setPlayersSettings}
        areasCount={areasCount}
        setAreasCount={setAreasCount}
        isLoaded={Boolean(resources)}
        runGame={runGame}
      />
    ),
    gameScreen: resources ? (
      <Game
        canvasSize={canvasSize}
        areasCount={areasCount}
        playersSettings={actualPlayers}
        resources={resources}
        finishGame={finishGame}
        breakGame={breakGame}
      />
    ) : (
      <></>
    ),
    finalScreen: (
      <FinalScreen
        playersSettings={actualPlayers}
        areasCount={areasCount}
        gameInfo={gameInfo}
        showStarScreen={breakGame}
        runGame={runGame}
      />
    ),
  }

  return (
    <div ref={gameWrapper} className="game-wrapper">
      <ResourcesLoader setResources={setResources} />
      <CanvasStarBackground canvasSize={canvasSize} />
      {content[gameStatus]}
    </div>
  )
}
