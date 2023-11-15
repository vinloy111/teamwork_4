import React from 'react'

type FallbackProps = {
  error: Error
}

function DefaultMessage(props: FallbackProps) {
  const { error } = props
  return (
    <>
      <h2>
        Мы не знаем, что это такое... <br />
        Если бы мы знали, что это такое... <br />
        Но мы не знаем что это такое...
      </h2>
      <h3>{error.message}</h3>
      <pre>{error.stack}</pre>
      <p>💿 Это привет, от разработчика! 👋</p>
    </>
  )
}

export default DefaultMessage
