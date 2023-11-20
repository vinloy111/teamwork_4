import { Stack, Typography } from '@mui/material'
import { theme } from '../../theme'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Topic } from 'types/Forum'
import { mockAllTopics } from '../../mocks/forum'
import { LoaderComponent } from '../../components/loader/LoaderComponent'
import Button from '@mui/material/Button'
import { TopicMessagesComponent } from '../../components/topic-messages/TopicMessagesComponent'

const getTopicById = (topicId: string): Topic | null => {
  return mockAllTopics.find(topic => topic.id === topicId) || null
}
export const ForumTopicPage = () => {
  const { topicId } = useParams()
  const [topic, setTopic] = useState<Topic | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (topicId) {
      setIsLoading(true)
      /**{TODO: В дальнейшем запрос в ручку по topicId }*/
      setTopic(getTopicById(topicId))
      /**{TODO: В дальнейшем убрать-для теста лоадера }*/
      setTimeout(() => setIsLoading(false), 1000)
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
          <Button href={'/forum'}>Вернуться к списку топиков</Button>
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
    </Stack>
  )
}
