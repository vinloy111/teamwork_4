import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Store } from '../../store'
import React, { useEffect, useState } from 'react'
import {
  fetchAllThemes,
  fetchUserTheme,
  setUserTheme,
} from 'features/themeSlice'
import backendService from 'services/backend-service'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { UserTheme } from 'types/UserTheme'
import { Theme } from 'types/Theme'
import { Checkbox, Tooltip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import Brightness5Icon from '@mui/icons-material/Brightness5'

const ThemeSwitchComponent = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { userTheme, allThemes } = useSelector((state: Store) => state.theme)
  const userId = useSelector((state: Store) => state.auth.user?.id)
  const [selectedTheme, setSelectedTheme] = useState('')
  const fetchUserThemeAction: AsyncThunkAction<UserTheme, string, any> =
    fetchUserTheme(userId || '')
  const fetchUserAllThemes: AsyncThunkAction<Theme[], void, any> =
    fetchAllThemes()

  useEffect(() => {
    dispatch(fetchUserAllThemes as any)
    if (userId) {
      dispatch(fetchUserThemeAction as any)
    } else {
      const theme =
        localStorage.getItem('theme') || allThemes?.[0]?.id?.toString()
      if (theme) {
        setSelectedTheme(theme)
        dispatch(setUserTheme({ userId, themeId: Number(theme) }))
      }
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (userTheme) {
      setSelectedTheme(userTheme.themeId.toString())
    }
  }, [userTheme])

  const handleThemeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const themeId = Number(value)
    setSelectedTheme(value)

    dispatch(setUserTheme({ userId, themeId }))
    if (userId) {
      backendService.updateUserTheme(userId, themeId).then().catch()
    } else {
      localStorage.setItem('theme', themeId.toString())
    }
  }

  const isGamePage = pathname.includes('game')
  const label = { inputProps: { 'aria-label': 'controlled' } }

  return isGamePage ? (
    <></>
  ) : (
    <Tooltip
      title={allThemes[Number(selectedTheme || 1) - 1]?.description || ''}>
      <Checkbox
        {...label}
        icon={<Brightness5Icon color={'success'} />}
        checkedIcon={<StarIcon />}
        checked={selectedTheme === '1'}
        onChange={event =>
          handleThemeChange(event, event.target.checked ? '1' : '2')
        }
      />
    </Tooltip>
  )
}

export default ThemeSwitchComponent
