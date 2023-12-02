import { UserSettingsUpdateDto } from 'types/UserSettingsUpdateDto'
import { UserSettingsFormData } from 'types/userSettingsFormData'

export const settingsFormToDto = (
  settingsData: UserSettingsFormData
): UserSettingsUpdateDto => {
  return {
    first_name: settingsData.firstName,
    second_name: settingsData.secondName,
    display_name: settingsData.displayName,
    login: settingsData.login,
    phone: settingsData.phone,
    email: settingsData.email,
  }
}
