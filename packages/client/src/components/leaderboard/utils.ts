import { Player } from 'types/LidearBoard'
import { mockAllUsers } from 'mocks/users'
import { User } from 'types/User'

export const fillUserData = (leaderBoard: Player[]): Player[] | [] => {
  if (!leaderBoard || leaderBoard.length === 0) return []
  try {
    leaderBoard.forEach(player => {
      const user = mockAllUsers.find(user => user.id === player.idUser) || null

      player.name = getUserName(user)
      player.avatar = user?.avatar || null
    })
    return [...leaderBoard].sort(
      (playerA, playerB) => playerB.scoreCount - playerA.scoreCount
    )
  } catch (e) {
    console.log(e)
  }

  return leaderBoard
}

export const getUserName = (user: User | null) => {
  if (!user) return `Unknown`
  return (
    user.displayName ??
    (user.firstName ? `${user.firstName} ${user.secondName || ''}` : `Unknown`)
  )
}
