import * as yup from 'yup'

const nameRegex = /^[А-ЯЁA-Z][а-яёa-z-]*$/
const loginRegex = /^[a-zA-Z0-9-_]{3,20}$/
const emailRegex = /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/
const phoneRegex = /^(\+)?[0-9]{10,15}$/

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .matches(nameRegex, 'Неверный формат имени')
    .required('Обязательное поле'),
  secondName: yup
    .string()
    .matches(nameRegex, 'Неверный формат фамилии')
    .required('Обязательное поле'),
  login: yup
    .string()
    .matches(loginRegex, 'Неверный формат логина')
    .required('Обязательное поле'),
  email: yup
    .string()
    .matches(emailRegex, 'Неверный формат email')
    .required('Обязательное поле'),
  password: yup
    .string()
    .matches(passwordRegex, 'Неверный формат пароля')
    .required('Обязательное поле'),
  phone: yup
    .string()
    .matches(phoneRegex, 'Неверный формат телефона')
    .required('Обязательное поле'),
})
