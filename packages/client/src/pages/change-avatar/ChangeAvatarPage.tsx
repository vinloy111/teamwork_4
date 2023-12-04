import React, { useState } from 'react'
import { Button, Container, Snackbar } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'
import { useDispatch } from 'react-redux'
import { setUser } from 'features/authSlice'
import yApiService from 'services/y-api-service'
import { adaptUserData } from 'utils/adaptUserData'
import { useNavigate } from 'react-router-dom'

function ChangeAvatarPage() {
  const ERROR_MESSAGE = 'Ошибка при обновлении аватара'

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedFile) {
      try {
        const updatedUser = await yApiService.updateUserAvatar(selectedFile)
        dispatch(setUser(adaptUserData(updatedUser.data)))
        navigate('/settings')
      } catch (error) {
        setError(ERROR_MESSAGE)
        console.error(`${ERROR_MESSAGE}: `, error)
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="change-avatar-form">
        <StyledHeader text="Смена аватара" />
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            style={{ margin: '20px 0' }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Загрузить новый аватар
          </Button>
        </form>
      </div>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </Container>
  )
}

export default ChangeAvatarPage
