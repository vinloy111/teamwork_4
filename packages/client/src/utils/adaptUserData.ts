import { UserFromApi } from 'types/UserFromApi'
import { User } from 'types/User'

export const adaptUserData = (userDataFromApi: UserFromApi): User => {
  return {
    id: userDataFromApi.id?.toString(),
    firstName: userDataFromApi.first_name,
    secondName: userDataFromApi.second_name,
    displayName: userDataFromApi.display_name,
    login: userDataFromApi.login,
    phone: userDataFromApi.phone,
    email: userDataFromApi.email,
    avatar: userDataFromApi.avatar,
  }
}
