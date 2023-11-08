import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../features/homePageSlice'
import { RootState } from '../store'

function HomePageComponent() {
  const count = useSelector((state: RootState) => state.homePage.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Home Page</h1>
      {/* TODO Удалить, когда начнется разработка */}
      <div>Пример использования стора: {count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default HomePageComponent
