import { useEffect, useState } from 'react'

export declare type Notification = {
  title: string
  text?: string
  iconUrl?: string
}

/**
 * Хук для использования web api notification
 * TODO: можно добавить какой-то интервал показа сообщений из массива
 */

const useNotifications = (): {
  permitted: boolean
  sendNotification: (notification: Notification) => void
} => {
  const [permitted, setPermitted] = useState(false)

  useEffect(() => {
    getPermitted()
  }, [])
  const getPermitted = () => {
    Notification.requestPermission().then(function (result) {
      if (result === 'granted') setPermitted(true)
    })
  }
  const sendNotification = ({ title, text, iconUrl }: Notification) => {
    if (permitted) {
      const n = new Notification(title, { icon: iconUrl, body: text })
      setTimeout(n.close.bind(n), 4000)
    }
  }
  return { permitted, sendNotification }
}

export default useNotifications
