import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../features/homePageSlice'
import { RootState } from '../store'
import Button from '@mui/material/Button'
import ExampleForm from '../components/ExampleForm'

function HomePageComponent() {
  const count = useSelector((state: RootState) => state.homePage.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Home Page</h1>
      {/* TODO Удалить, когда начнется разработка */}
      <div>Пример использования стора и material: {count}</div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(increment())}>
        Increment
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(decrement())}>
        Decrement
      </Button>

      <h2>Пример использования формы</h2>
      <ExampleForm />
    </div>
  )
}

export default HomePageComponent
