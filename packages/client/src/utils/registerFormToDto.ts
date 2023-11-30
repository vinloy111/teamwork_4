import { RegistrationFormData } from 'types/RegistrationFormData'
import { RegistrationDto } from 'types/RegistrationDto'

export const registerFormToDto = (
  registrationData: RegistrationFormData
): RegistrationDto => {
  return {
    first_name: registrationData.firstName,
    second_name: registrationData.secondName,
    login: registrationData.login,
    phone: registrationData.phone,
    email: registrationData.email,
    password: registrationData.password,
  }
}
