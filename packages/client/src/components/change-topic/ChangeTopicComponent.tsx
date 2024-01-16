import { Box, Stack, Typography } from '@mui/material'
import { theme } from '../../theme'
import React, { ChangeEvent, useState } from 'react'
import { Topic } from 'types/Forum'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'

const HELPER_TEXT_MIN = 'Минимум 5 символов!'
const HELPER_TEXT_MAX = 'Максимум 100 символов!'
declare type ChangeTopicComponentProps = {
  topicInit?: Topic
  type: 'save' | 'create'
  handleSubmit: (caption: string) => void
}
export const ChangeTopicComponent = ({
  topicInit,
  type,
  handleSubmit,
}: ChangeTopicComponentProps) => {
  const [topic, setTopic] = useState(topicInit?.caption || '')
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value || value.length < 5) return setError(HELPER_TEXT_MIN)
    if (value.length > 100) return setError(HELPER_TEXT_MAX)
    setError(null)
    setTopic(value)
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic) handleSubmit(topic)
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
        {type === 'save' ? 'Изменение темы форума' : 'Создание темы форума'}
      </Typography>
      <Stack
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={e => onSubmit(e)}
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
            {type === 'save' ? 'Сохранить' : 'Создать'}
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}
