import { Message } from 'types/Forum'
import { useEffect, useState } from 'react'
import { TextareaAutosize } from '@mui/material'

export declare type MessageProps = {
  initMessage?: Message
}
export const MessageComponent = ({ initMessage }: MessageProps) => {
  const [message, setMessage] = useState<Message | null>(initMessage || null)
  const [text, setText] = useState(message?.text || '')
  useEffect(() => {
    setMessage({ date: '', id: '', idAuthor: '', text: text })
  }, [text])
  const onTextChange = (value: string) => {
    setText(value)
  }
  return (
    <>
      <TextareaAutosize
        maxRows={4}
        aria-label="maximum height"
        placeholder="Maximum 4 rows"
        defaultValue={text}
      />
    </>
  )
}
