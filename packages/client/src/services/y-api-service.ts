import axios from 'axios'
import { UserFromApi } from 'types/UserFromApi'
import { LoginData } from 'types/LoginData'
import { RegistrationDto } from 'types/RegistrationDto'
import { UserSettingsUpdateDto } from 'types/UserSettingsUpdateDto'
import { APP_CONSTS } from 'consts/index'
import { PlayerLeaderBoard } from 'types/LidearBoard'
import { AppWindow } from 'types/Window'
const isBrowser = typeof window !== 'undefined'
export const SERVER_BASE_URL = isBrowser
  ? (window as AppWindow)?.__ENV__?.serverBaseUrl || ''
  : 'http://localhost:3000'
export const Y_API_BASE_URL = `${SERVER_BASE_URL}/api/v2`

const yApiService = {
  register(userData: RegistrationDto) {
    return axios.post<{ id: string }>(
      `${Y_API_BASE_URL}/auth/signup`,
      userData,
      {
        withCredentials: true,
      }
    )
  },

  login(loginData: LoginData) {
    return axios.post<void>(`${Y_API_BASE_URL}/auth/signin`, loginData, {
      withCredentials: true,
    })
  },

  logout() {
    return axios.post<void>(`${Y_API_BASE_URL}/auth/logout`, undefined, {
      withCredentials: true,
    })
  },

  getUser(cookie?: string) {
    return axios.get<UserFromApi>(`${Y_API_BASE_URL}/auth/user`, {
      withCredentials: true,
      headers: {
        cookie,
      },
    })
  },

  getUserById(id: string) {
    return axios.get<UserFromApi>(`${Y_API_BASE_URL}/user/${id}`, {
      withCredentials: true,
    })
  },

  updateUserProfile(userData: UserSettingsUpdateDto) {
    return axios.put<UserFromApi>(`${Y_API_BASE_URL}/user/profile`, userData, {
      withCredentials: true,
    })
  },

  updateUserAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)

    return axios.put<UserFromApi>(
      `${Y_API_BASE_URL}/user/profile/avatar`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  },

  changeUserPassword(passwordData: {
    oldPassword: string
    newPassword: string
  }) {
    return axios.put<void>(`${Y_API_BASE_URL}/user/password`, passwordData, {
      withCredentials: true,
    })
  },
  /**
   * Добавляет (обновляет) данные лидерборда для пользователя
   * @param newGameData
   */
  leaderboardNewLeaderRequest(newGameData: PlayerLeaderBoard) {
    const data = {
      ratingFieldName: APP_CONSTS.ratingFieldName,
      teamName: APP_CONSTS.teamName,
      data: {
        ...newGameData,
        [APP_CONSTS.ratingFieldName]: newGameData.scoreCount,
      },
    }
    return axios.post<void>(`${Y_API_BASE_URL}/leaderboard/`, data, {
      withCredentials: true,
    })
  },

  /**
   * Получает из ручки лидерборд команды
   * @param cursor -
   * @param limit - число страниц
   */
  async getTeamLeaderBoard(cursor: number, limit: number) {
    const data = {
      ratingFieldName: APP_CONSTS.ratingFieldName,
      cursor,
      limit,
    }
    const response = await axios.post<{ data: PlayerLeaderBoard }[]>(
      `${Y_API_BASE_URL}/leaderboard/${APP_CONSTS.teamName}`,
      data,
      {
        withCredentials: true,
      }
    )
    return response.data
  },

  getServiceId() {
    return axios.get<{ service_id: string }>(
      `${Y_API_BASE_URL}/oauth/yandex/service-id`,
      {
        params: { redirect_uri: window.location.origin },
        //withCredentials: true,
      }
    )
  },

  oauthLogin(code: string) {
    return axios.post(
      `${Y_API_BASE_URL}/oauth/yandex`,
      {
        code: code,
        redirect_uri: window.location.origin,
      },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      }
    )
  },
}

export default yApiService
