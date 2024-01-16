import yApiService from 'services/y-api-service'

/**
 * Получение лидерборда
 * @param cursor
 * @param limit
 */
export const getLeaderBoard = async (cursor: number, limit: number) => {
  try {
    return await yApiService.getTeamLeaderBoard(cursor, limit)
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error)
  }
}
