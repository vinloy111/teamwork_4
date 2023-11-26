import React, { useEffect } from 'react'
import { Area, AreaOwner } from 'types/GameData'
import { GameDifficulty } from 'types/GameStats'
import { distanceBetweenPoints } from '../../utils/others'

type Props = {
  owner: AreaOwner
  areas: Area[]
  seconds: number
  difficulty: GameDifficulty
  onSendArmy: (attacker: Area, defender: Area) => void
}

export const CPULogic = React?.memo((props: Props): JSX.Element => {
  const { areas, owner, onSendArmy, seconds, difficulty } = props

  // Время, как часто бот совершает ход
  const difficultyTime = {
    easy: 4,
    medium: 3,
    hard: 2,
    insane: 1,
  }

  // Как много армий бот может отправить за ход
  const difficultySendLimit = {
    easy: 2,
    medium: 2,
    hard: 2,
    insane: 1,
  }

  useEffect(() => {
    let sendCount = 0
    if (seconds && !(seconds % difficultyTime[difficulty])) {
      const cpuAreas = areas
        ?.filter(i => i.owner === owner)
        .sort((a, b) => b.count - a.count)
      if (difficulty === 'insane') console.log(cpuAreas.map(i => i.count))
      const enemyAreas = areas?.filter(i => i.owner !== owner)
      const potentialAttacks = cpuAreas?.map(i => ({
        from: i,
        to: enemyAreas
          .filter(y => (difficulty === 'insane' ? i.count >= y.count : true))
          ?.map(e => ({
            ...e,
            distance: distanceBetweenPoints(i.position, e.position),
          }))
          .sort((a, b) => a.distance - b.distance)?.[0],
      }))

      potentialAttacks?.forEach(i => {
        if (
          sendCount <= difficultySendLimit[difficulty] &&
          i.from &&
          i.to &&
          i.from.count >= 2 &&
          i.from.count >= i.to.count
        ) {
          sendCount = sendCount + 1
          onSendArmy(i.from, i.to)
        }
      })
    }
  }, [seconds])

  return <></>
})
