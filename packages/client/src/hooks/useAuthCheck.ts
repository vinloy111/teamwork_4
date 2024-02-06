import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from 'features/authSlice'
import yApiService from 'services/y-api-service'
import { adaptUserData } from 'utils/adaptUserData'
import { useLocation } from 'react-router-dom'

const useAuthCheck = (onComplete: () => void) => {
  const dispatch = useDispatch()
  const { search } = useLocation()

  useEffect(() => {
    // Функция для OAuth авторизации
    const oauthLogin = async (code: string) => {
      try {
        await yApiService.oauthLogin(code)
        console.log('authorize')
      } catch (error) {
        console.error('Ошибка OAuth авторизации:', error)
      }
    }

    // Функция для проверки аутентификации пользователя
    const checkUserAuthentication = async () => {
      try {
        const response = await yApiService.getUser()
        dispatch(setUser(adaptUserData(response.data)))
      } catch (error) {
        dispatch(clearUser())
        console.error('Неавторизованный доступ:', error)
      } finally {
        onComplete()
      }
    }

    // Получаем параметры из URL
    const sp = new URLSearchParams(search)
    const code = sp.get('code')

    // Если есть параметр code, сначала выполняем OAuth авторизацию
    if (code) {
      oauthLogin(code).then(checkUserAuthentication)
    } else {
      // Если параметра code нет, сразу проверяем аутентификацию пользователя
      checkUserAuthentication()
    }
  }, [dispatch])
}

export default useAuthCheck
