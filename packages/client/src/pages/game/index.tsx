import { useState } from 'react'
import { StartScreen } from './elements/StartScreen'
import { FinalScreen } from './elements/FinalScreen'
import { Game } from './elements/Game'
import { GameScreen } from 'types/GameStats'
import { GameStats } from 'types/GameData'
import './style.css'

export const GamePage = (): JSX.Element => {
  const [gameStatus, setGameStatus] = useState<GameScreen>('startScreen')
  const [gameInfo, setGameInfo] = useState<GameStats[] | undefined>(undefined)

  const finishGame = (stats: GameStats[]) => {
    setGameInfo(stats)
    setGameStatus('finalScreen')
  }

  const content: Record<GameScreen, JSX.Element> = {
    startScreen: <StartScreen runGame={() => setGameStatus('gameScreen')} />,
    gameScreen: <Game finishGame={finishGame} />,
    finalScreen: (
      <FinalScreen
        gameInfo={gameInfo}
        showStarScreen={() => setGameStatus('startScreen')}
        runGame={() => setGameStatus('gameScreen')}
      />
    ),
  }

  return <div className="game-wrapper">{content[gameStatus]}</div>
}
