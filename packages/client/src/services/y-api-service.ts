import axios from 'axios'
import { UserFromApi } from 'types/UserFromApi'
import { RegistrationData } from 'types/RegistrationData'
import { LoginData } from 'types/LoginData'

const API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

const apiService = {
  register(userData: RegistrationData) {
    return axios.post<{ id: string }>(`${API_BASE_URL}/auth/signup`, userData)
  },

  login(loginData: LoginData) {
    return axios.post<void>(`${API_BASE_URL}/auth/signin`, loginData)
  },

  logout() {
    return axios.post<void>(`${API_BASE_URL}/auth/logout`)
  },

  getUser() {
    return axios.get<UserFromApi>(`${API_BASE_URL}/auth/user`)
  },
}

export default apiService
