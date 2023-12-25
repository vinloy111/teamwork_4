import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Store } from 'src/store'
import { Stack } from '@mui/material'
import { Message, Topic } from 'types/Forum'
import { MessageComponent } from './MessageComponent'

declare type TopicMessagesProps = {
  topic: Topic
}
export const TopicMessagesComponent = ({ topic }: TopicMessagesProps) => {
  const [messages, setMessages] = useState(topic.listOfMessages || [])
  const user = useSelector((state: Store) => state.auth.user)
  const onSaveMessage = (message: Message) => {
    setMessages(prevState => [...prevState, message])
  }

  const addMessage = (
    <MessageComponent
      initMessage={null}
      isEditable={true}
      onSaveMessage={onSaveMessage}
    />
  )

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
      {user?.id && addMessage}
    </Stack>
  )
}
