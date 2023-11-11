import React, { useEffect } from 'react'
import { Area, AreaOwner } from 'types/GameData'
import { distanceBetweenPoints } from '../../utils'

type Props = {
  owner: AreaOwner
  areas: Area[]
  seconds: number
  onSendArmy: (attacker: Area, defender: Area) => void
}

export const CPULogic = React?.memo((props: Props): JSX.Element => {
  const { areas, owner, onSendArmy, seconds } = props

  useEffect(() => {
    if (seconds) {
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
