import { useRef, useState } from 'react'
import { StartScreen } from './elements/StartScreen'
import { FinalScreen } from './elements/FinalScreen'
import { Game } from './elements/Game'
import { GameScreen } from 'types/GameStats'
import { GameResult } from 'types/GameData'
import './style.css'

export const GamePage = (): JSX.Element => {
  const gameWrapper = useRef<HTMLDivElement>(null)
  const [gameStatus, setGameStatus] = useState<GameScreen>('startScreen')
  const [gameInfo, setGameInfo] = useState<GameResult | undefined>(undefined)

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

  const canvasWidth = gameWrapper.current?.clientWidth
  const canvasHeight = gameWrapper.current?.clientHeight

  const content: Record<GameScreen, JSX.Element> = {
    startScreen: <StartScreen runGame={() => setGameStatus('gameScreen')} />,
    gameScreen:
      canvasWidth && canvasHeight ? (
        <Game
          canvasSize={{ width: canvasWidth, height: canvasHeight }}
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
      {content[gameStatus]}
    </div>
  )
}
