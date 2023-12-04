import { UserFromApi } from 'types/UserFromApi'
import { User } from 'types/User'
import { buildPathToResource } from 'utils/buildPathToResource'

const NOT_PHOTO_URL =
  'https://static.tildacdn.com/stor3066-6637-4635-b235-306432393236/28942791.jpg'

export const adaptUserData = (userDataFromApi: UserFromApi): User => {
  return {
    id: userDataFromApi.id?.toString(),
    firstName: userDataFromApi.first_name,
    secondName: userDataFromApi.second_name,
    displayName: userDataFromApi.display_name,
    login: userDataFromApi.login,
    phone: userDataFromApi.phone,
    email: userDataFromApi.email,
    avatar: buildPathToResource(userDataFromApi.avatar) || NOT_PHOTO_URL,
  }
}
