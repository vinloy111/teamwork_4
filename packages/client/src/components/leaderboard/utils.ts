import { Player } from 'types/LidearBoard'
import { mockAllUsers } from '../../mocks/users'
import { User } from 'types/User'

export const fillUserData = (leaderBoard: Player[]): Player[] | [] => {
  if (leaderBoard.length === 0) return []
  leaderBoard.forEach(player => {
    player.name = getUserName(
      mockAllUsers.find(user => user.id === player.idUser) || null
    )
  })
  return leaderBoard.sort(
    (playerA, playerB) => playerA.scoreCount - playerB.scoreCount
  )
}

export const getUserName = (user: User | null) => {
  if (!user) return `Unknown`
  return user.nickName ?? user.firstName
    ? `${user.firstName} ${user.lastName}`
    : `Unknown`
}
