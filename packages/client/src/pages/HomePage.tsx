import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../features/homePageSlice'
import { Store } from '../store'
import Button from '@mui/material/Button'
import ExampleForm from '../components/ExampleForm'
import Layout from '../components/layout/Layout'

function HomePageComponent() {
  const count = useSelector((state: Store) => state.homePage.value)
  const dispatch = useDispatch()

  return (
    <Layout>
      <>
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
      </>
    </Layout>
  )
}

export default HomePageComponent
