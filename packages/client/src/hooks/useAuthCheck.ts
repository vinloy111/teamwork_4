import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from '../features/authSlice'
import apiService from '../services/y-api-service'
import { adaptUserData } from '../utils/adaptUserData'

const useAuthCheck = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await apiService.getUser()
        dispatch(setUser(adaptUserData(response.data)))
      } catch (error) {
        dispatch(clearUser())
        console.error('Неавторизованный доступ:', error)
      }
    }

    checkUserAuthentication()
  }, [dispatch])
}

export default useAuthCheck
