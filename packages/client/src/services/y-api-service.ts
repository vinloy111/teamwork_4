import axios from 'axios'
import { UserFromApi } from 'types/UserFromApi'
import { LoginData } from 'types/LoginData'
import { RegistrationDto } from 'types/RegistrationDto'

export const Y_API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

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

  getUser() {
    return axios.get<UserFromApi>(`${Y_API_BASE_URL}/auth/user`, {
      withCredentials: true,
    })
  },

  getUserById(id: string) {
    return axios.get<UserFromApi>(`${Y_API_BASE_URL}/user/${id}`, {
      withCredentials: true,
    })
  },
}

export default yApiService
