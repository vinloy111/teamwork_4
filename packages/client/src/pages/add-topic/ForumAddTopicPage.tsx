import { Box, Stack, Typography } from '@mui/material'
import { theme } from '../../theme'
import React, { ChangeEvent, useState } from 'react'
import { Topic } from 'types/Forum'
import { mockAllTopics } from 'mocks/forum'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import backendService from 'services/backend-service'
import { useSelector } from 'react-redux'
import { Store } from '../../store'

const HELPER_TEXT_MIN = 'Минимум 5 символов!'
const HELPER_TEXT_MAX = 'Максимум 100 символов!'

export const ForumAddTopicPage = () => {
  const [topic, setTopic] = useState('')
  const [error, setError] = useState<string | null>(null)
  const user = useSelector((state: Store) => state.auth.user)

  const navigate = useNavigate()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value || value.length < 5) return setError(HELPER_TEXT_MIN)
    if (value.length > 100) return setError(HELPER_TEXT_MAX)
    setError(null)
    setTopic(value)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return
    try {
      backendService.createTopic(topic, user).then(() => navigate(`/forum`))
    } catch (error) {
      console.log('addTopicPageError: ', error)
    }
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="start"
      height="auto"
      width="100%"
      marginTop={theme.spacing(1)}>
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.warning.main,
          zIndex: 10,
          backgroundColor: theme.palette.background.paper,
          p: theme.spacing(2),
          m: theme.spacing(2),
          borderRadius: 5,
        }}>
        Создание темы форума
      </Typography>
      <Stack
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        maxWidth={'500px'}
        width={'50%'}>
        <TextField
          required
          id="outlined-required"
          label="Название Темы"
          defaultValue={topic}
          onChange={handleChange}
          error={!!error}
          helperText={error}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            type="button"
            variant="outlined"
            className="submit"
            onClick={() => navigate(`/forum`)}
            sx={{ m: 2 }}>
            отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit"
            disabled={!!error || !topic}
            sx={{ m: 2 }}>
            Создать
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}
