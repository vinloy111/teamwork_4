import { useState } from 'react'
import { StartScreen } from './elements/StartScreen'
import { Game } from './elements/Game'
import { GameScreen } from 'types/GameStats'
import './style.css'

export const GamePage = (): JSX.Element => {
  const [gameStatus, setGameStatus] = useState<GameScreen>('startScreen')

  const content: Record<GameScreen, JSX.Element> = {
    startScreen: (
      <StartScreen onStartGame={() => setGameStatus('gameScreen')} />
    ),
    gameScreen: <Game />,
    finalScreen: <></>,
  }

  return <div className="game-wrapper">{content[gameStatus]}</div>
}
