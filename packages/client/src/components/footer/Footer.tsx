import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../store'
import React, { useEffect, useState } from 'react'
import {
  fetchAllThemes,
  fetchUserTheme,
  setUserTheme,
} from 'features/themeSlice'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Box from '@mui/system/Box'
import backendService from 'services/backend-service'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { UserTheme } from 'types/UserTheme'
import { Theme } from 'types/Theme'

const Footer = () => {
  const dispatch = useDispatch()
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

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      <RadioGroup row value={selectedTheme} onChange={handleThemeChange}>
        {allThemes.map(theme => (
          <FormControlLabel
            key={theme.id}
            value={theme.id.toString()}
            control={<Radio />}
            label={theme.description}
          />
        ))}
      </RadioGroup>
    </Box>
  )
}

export default Footer
