import { Stack } from '@mui/material'
import { Message, Topic } from 'types/Forum'
import { useState } from 'react'
import { MessageComponent } from './MessageComponent'

declare type TopicMessagesProps = {
  topic: Topic
}
export const TopicMessagesComponent = ({ topic }: TopicMessagesProps) => {
  const [messages, setMessages] = useState(topic.listOfMessages || [])
  const onSaveMessage = (message: Message) => {
    setMessages(prevState => [...prevState, message])
  }
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
      <MessageComponent
        initMessage={null}
        isEditable={true}
        onSaveMessage={onSaveMessage}
      />
    </Stack>
  )
}
