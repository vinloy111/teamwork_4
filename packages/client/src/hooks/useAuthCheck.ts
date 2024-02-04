import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from 'features/authSlice'
import yApiService from 'services/y-api-service'
import { adaptUserData } from 'utils/adaptUserData'

const useAuthCheck = (onComplete: () => void) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Функция для OAuth авторизации
    const oauthLogin = async (code: string) => {
      try {
        await yApiService.oauthLogin(code)
        // Удаление параметра code из URL
        const url = new URL(window.location.href)
        url.searchParams.delete('code')
        window.history.pushState({}, '', url.href)
        console.log('authorize')
      } catch (error) {
        console.error('Ошибка OAuth авторизации:', error)
      }
    }

    // Функция для проверки аутентификации пользователя
    const checkUserAuthentication = async () => {
      console.log('checkUserAuthentication')
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
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

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
