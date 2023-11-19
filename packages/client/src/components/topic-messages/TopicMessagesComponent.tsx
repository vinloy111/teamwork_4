import { Stack } from '@mui/material'

import { Topic } from 'types/Forum'
import { useState } from 'react'
import { MessageComponent } from './MessageComponent'

export declare type TopicMessagesProps = {
  topic: Topic
}
export const TopicMessagesComponent = ({ topic }: TopicMessagesProps) => {
  const [messages, setMessages] = useState(topic.listOfMessages || [])
  return (
    <Stack
      display="flex"
      height={'90%'}
      width={'100%'}
      alignItems="center"
      justifyContent="center">
      {messages.length > 0 &&
        messages.map(message => (
          <MessageComponent key={message.id} initMessage={message} />
        ))}
    </Stack>
  )
}
