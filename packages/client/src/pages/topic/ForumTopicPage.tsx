import { Stack, Typography } from '@mui/material'
import { theme } from '../../theme'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Topic } from 'types/Forum'
import { LoaderComponent } from 'components/loader/LoaderComponent'
import Button from '@mui/material/Button'
import { TopicMessagesComponent } from 'components/topic-messages/TopicMessagesComponent'
import { useNavigate } from 'react-router-dom'
import backendService from 'services/backend-service'

export const ForumTopicPage = () => {
  const { topicId } = useParams()
  const [topic, setTopic] = useState<Topic | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (topicId) {
      setIsLoading(true)
      backendService
        .getTopic(topicId)
        .then(res => {
          setIsLoading(false)
          setTopic(res.data)
        })
        .catch(() => setIsLoading(false))
    }
  }, [])

  if (isLoading) return <LoaderComponent />

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="auto"
      width="100%"
      marginTop={theme.spacing(1)}>
      {!isLoading && !topic && (
        <>
          <Typography variant={'h4'} marginTop={'10%'}>
            Тема не найдена
          </Typography>
        </>
      )}
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
        {topic?.caption || ''}
      </Typography>
      {topic && <TopicMessagesComponent topic={topic} />}
      <Button
        type="button"
        variant="outlined"
        className="submit"
        onClick={() => navigate(`/forum`)}
        sx={{ m: 2 }}>
        Вернуться к списку топиков
      </Button>
    </Stack>
  )
}
