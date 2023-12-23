import { GameResult } from 'types/GameData'
import yApiService from 'services/y-api-service'
import { Player } from 'types/GameStats'
import { User } from 'types/User'
import { getUserName } from 'utils/adaptUserData'
import { PlayerLeaderBoard } from 'types/LidearBoard'

/**
 * Сохранение победителя в лидерборд
 * @param stats -результаты игры
 * @param user
 */
export const saveResultToLeaderBoard = (stats: GameResult, user: User) => {
  const statWinner = stats.stats.filter(player => player.isWinner)[0]
  let dataPlayer: PlayerLeaderBoard | null = null
  if (statWinner.playerType === Player.computer) {
    statWinner.playerName = 'Main Computer'
    dataPlayer = {
      id: Player.computer,
      idUser: Player.computer,
      scoreCount: statWinner.count,
      name: 'Main Computer',
      avatar: null,
    }
  }
  if (statWinner.playerType === Player.user) {
    dataPlayer = {
      id: user.id,
      idUser: user.id,
      scoreCount: statWinner.count,
      name: getUserName(user),
      avatar: user.avatar,
    }
  }
  if (!dataPlayer) return
  yApiService.leaderboardNewLeaderRequest(dataPlayer).catch(error => {
    console.error('Ошибка при получении лидерборда:', error)
  })
}
