import { Stack } from '@mui/material'
import { Message, Topic } from 'types/Forum'
import { useEffect, useState } from 'react'
import { MessageComponent } from './MessageComponent'
import { TopicReactionsShow } from 'components/topic-reactions-show'
import backendService from 'services/backend-service'
import { useDispatch } from 'react-redux'
import { setReactions } from 'features/reactionsSlice'

declare type TopicMessagesProps = {
  topic: Topic
}
export const TopicMessagesComponent = ({ topic }: TopicMessagesProps) => {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState(topic.listOfMessages || [])
  const onSaveMessage = (message: Message) => {
    setMessages(prevState => [...prevState, message])
  }

  useEffect(() => {
    const getReactions = async () => {
      try {
        const res = await backendService.getReactions(topic.id)
        dispatch(setReactions(res.data))
      } catch (error) {
        console.error('Ошибка загрузки реакций')
      }
    }
    getReactions()
  }, [])

  return (
    <Stack
      display="flex"
      width="auto"
      minWidth={1000} // TODO: В перспективе задать фиксированную относительную ширину для всех экранов, хак для показа
      height="auto"
      alignItems="center"
      justifyContent="center">
      {messages.length > 0 &&
        messages.map(message => (
          <MessageComponent
            key={message.id}
            initMessage={message}
            isEditable={false}
            onSaveMessage={onSaveMessage}
          />
        ))}
      <TopicReactionsShow />
      <MessageComponent
        initMessage={null}
        isEditable={true}
        topicId={topic.id}
        onSaveMessage={onSaveMessage}
      />
    </Stack>
  )
}
