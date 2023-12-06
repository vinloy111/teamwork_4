import * as yup from 'yup'

const nameRegex = /^[А-ЯЁA-Z][а-яёa-z-]*$/
const loginRegex = /^[a-zA-Z0-9-_]{3,20}$/
const emailRegex = /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/
const phoneRegex = /^(\+)?[0-9]{10,15}$/

const firstNameValidator = yup
  .string()
  .matches(nameRegex, 'Неверный формат имени')
  .required('Обязательное поле')

const secondNameValidator = yup
  .string()
  .matches(nameRegex, 'Неверный формат фамилии')
  .required('Обязательное поле')

const loginValidator = yup
  .string()
  .matches(loginRegex, 'Неверный формат логина')
  .required('Обязательное поле')

const emailValidator = yup
  .string()
  .matches(emailRegex, 'Неверный формат email')
  .required('Обязательное поле')

const passwordValidator = yup
  .string()
  .matches(passwordRegex, 'Неверный формат пароля')
  .required('Обязательное поле')

const phoneValidator = yup
  .string()
  .matches(phoneRegex, 'Неверный формат телефона')
  .required('Обязательное поле')

const displayNameValidator = yup.string().required('Обязательное поле')

const registerValidationSchema = yup.object({
  firstName: firstNameValidator,
  secondName: secondNameValidator,
  login: loginValidator,
  email: emailValidator,
  password: passwordValidator,
  phone: phoneValidator,
})

const loginValidationSchema = yup.object({
  login: loginValidator,
  password: passwordValidator,
})

const settingsValidationSchema = yup.object({
  firstName: firstNameValidator,
  secondName: secondNameValidator,
  displayName: displayNameValidator,
  login: loginValidator,
  email: emailValidator,
  phone: phoneValidator,
})

export {
  firstNameValidator,
  secondNameValidator,
  loginValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  registerValidationSchema,
  loginValidationSchema,
  settingsValidationSchema,
}
