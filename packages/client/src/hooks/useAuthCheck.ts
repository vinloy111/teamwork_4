import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from 'features/authSlice'
import yApiService from 'services/y-api-service'
import { adaptUserData } from 'utils/adaptUserData'

const useAuthCheck = (onComplete: () => void) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await yApiService.getUser()
        dispatch(setUser(adaptUserData(response.data)))
      } catch (error) {
        dispatch(clearUser())
        console.error('Неавторизованный доступ:', error)
      } finally {
        onComplete?.()
      }
    }

    checkUserAuthentication()
  }, [dispatch])
}

export default useAuthCheck
