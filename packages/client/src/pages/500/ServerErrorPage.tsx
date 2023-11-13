import { ErrorComponent } from '../../components/error/error'

const ServerErrorPage = () => {
  return (
    <ErrorComponent
      type={'500'}
      message={'Что-то Пошло Не Так... Уже Чиним!'}
    />
  )
}

export default ServerErrorPage
