import React, { useEffect } from 'react'
import { Area, AreaOwner } from 'types/GameData'
import { GameDifficulty } from 'types/GameStats'
import { distanceBetweenPoints } from '../../utils/others'

type Props = {
  owner: AreaOwner
  areas: Area[]
  seconds: number
  difficulty: GameDifficulty // TODO: insane - охотится на игрока
  onSendArmy: (attacker: Area, defender: Area) => void
}

export const CPULogic = React?.memo((props: Props): JSX.Element => {
  const { areas, owner, onSendArmy, seconds, difficulty } = props

  // Время, как часто бот совершает ход
  const difficultyTime = {
    easy: 3,
    medium: 2,
    hard: 1,
  }

  useEffect(() => {
    if (seconds && !(seconds % difficultyTime[difficulty])) {
      const cpuAreas = areas
        ?.filter(i => i.owner === owner)
        .sort((a, b) => a.count - b.count)
      const enemyAreas = areas?.filter(i => i.owner !== owner)
      cpuAreas?.forEach(i => {
        const nearestEnemyArea = enemyAreas
          ?.map(e => ({
            ...e,
            distance: distanceBetweenPoints(i.position, e.position),
          }))
          .sort((a, b) => a.distance - b.distance)?.[0]
        if (i.count >= nearestEnemyArea?.count) onSendArmy(i, nearestEnemyArea)
      })
    }
  }, [seconds])

  return <></>
})
