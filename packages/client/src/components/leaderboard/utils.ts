import { PlayerLeaderBoard } from 'types/LidearBoard'
import { mockAllUsers } from 'mocks/users'
import { getUserName } from 'utils/adaptUserData'

export const fillUserData = (
  leaderBoard: PlayerLeaderBoard[]
): PlayerLeaderBoard[] | [] => {
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
