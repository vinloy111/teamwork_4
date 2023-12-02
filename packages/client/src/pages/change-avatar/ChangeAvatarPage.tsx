import React from 'react'
import { Button, Container } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'

function ChangeAvatarPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="change-avatar-form">
        <StyledHeader text="Смена аватара" />
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" style={{ margin: '20px 0' }} />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Загрузить новый аватар
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ChangeAvatarPage
