import { ErrorComponent } from '../../components/error/error'

const NotFoundPage = () => {
  return <ErrorComponent type={'404'} message={'Страница не Найдена'} />
}

export default NotFoundPage
