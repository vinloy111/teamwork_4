import axios from 'axios'

const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

export type UserFromApi = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export class YandexAPI {
  constructor(private _cookieHeader: string | undefined) {}

  async getLoggedUser(): Promise<UserFromApi | null> {
    try {
      const { data } = await axios.get(`${API_ROOT}/auth/user`, {
        headers: {
          cookie: this._cookieHeader,
        },
      })
      return { ...data }
    } catch (e) {
      return null
    }
  }

  async getOauthUser(code: string): Promise<UserFromApi | null> {
    try {
      const { data } = await axios.get(`${API_ROOT}/oauth/user`, {
        data: {
          code: code,
        },
        withCredentials: true,
        headers: {
          cookie: this._cookieHeader,
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
      return { ...data }
    } catch (e) {
      return null
    }
  }
}
