/**
 * *************
 * ErrorBoundary *
 * *************
 *
 * Проверить работу можно вручную вызвав ошибку на странице, например так
 * throw new Error('Oops, something went wrong!');
 *
 */

import React, {
  Component,
  ReactNode,
  createContext,
  createElement,
  useContext,
  isValidElement,
  FunctionComponent,
} from 'react'
import { useRouteError } from 'react-router'
import DefaultMessage from './defaultMessage'

/**
 * FallbackProps принимает любые элементы, которые мы хотим отобразить в сообщении об ошибке
 */
type FallbackProps = {
  error: Error
}

/**
 * Props который может принимать ErrorBoundary
 *
 * children - дети, которые отрисуют, если нет ошибки
 * routerError - передача ошибки через props элемента, используется для Route
 * fallback - можно вывести JSX элемент при ошибке
 * fallbackRender - можно вывести безстатический компонент для отображения ошибки
 * FallbackComponent - можно вывести стейтовый компонент для отображения ошибки
 *
 */
interface Props {
  children?: ReactNode
  routerError?: Error
  fallback?: JSX.Element
  fallbackRender?: (props: FallbackProps) => ReactNode
  FallbackComponent?: FunctionComponent
}

/**
 * Состояния ErrorBoundary
 */
interface State {
  error: Error | null
}

/**
 * Контекст используемый для отображения ошибок в асинхронных функциях
 */
const ErrorBoundaryContext = createContext<(error: Error) => void>(
  () => undefined
)

/**
 * Вернет функцию, которая может отобразить ошибку в асинхронных функциях
 */
export const useErrorHandling = () => {
  return useContext(ErrorBoundaryContext)
}

/**
 * Функция для отображения ошибки в Route
 */
export function ErrorElement(props: Props) {
  const error = useRouteError()

  console.error(error)
  if (error instanceof Error) {
    return <ErrorBoundary {...props} routerError={error} />
  } else {
    return <ErrorBoundary {...props} />
  }
}

/**
 * Компонент, для отображения ошибки
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  public componentDidCatch(error: Error) {
    console.error('Uncaught error:', error)
  }

  public triggerError = (error: Error) => {
    console.error('Uncaught error:', error)
    this.setState({ error })
  }

  public resetError = () => this.setState({ error: null })

  public render() {
    let { error } = this.state
    const {
      routerError,
      fallbackRender,
      FallbackComponent,
      fallback,
      children,
    } = this.props

    error = routerError || error

    let childToRender = children

    if (error) {
      if (isValidElement(fallback)) {
        childToRender = fallback
      } else if (typeof fallbackRender === 'function') {
        childToRender = fallbackRender({ error })
      } else if (FallbackComponent) {
        childToRender = createElement<FallbackProps>(FallbackComponent, {
          error,
        })
      } else {
        childToRender = <DefaultMessage error={error} />
      }
    }

    return (
      <ErrorBoundaryContext.Provider value={this.triggerError}>
        {childToRender}
      </ErrorBoundaryContext.Provider>
    )
  }
}

export default ErrorBoundary
