import React, { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Typography,
  Button,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import UserWidget from '../../components/widgets/UserWidget'
import AboutUserWidget from '../../components/widgets/AboutUserWidget'
import { User } from 'types/User'

const ProfileTab = ({ user }: { user: User }) => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery(theme.breakpoints.up('sm'))

  if (user === null) return <></>

  return (
    <Box
      width="100%"
      padding="0 2rem"
      display={isNonMobileScreens ? 'flex' : 'block'}
      gap="2rem"
      justifyContent="center"
      boxSizing="border-box"
      overflow="hidden">
      <Box flexBasis={isNonMobileScreens ? '500px' : undefined}>
        <Paper>
          <UserWidget user={user} />
        </Paper>
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? '100%' : undefined}
        mt={isNonMobileScreens ? undefined : '2rem'}>
        <Paper>
          <AboutUserWidget user={user} />
        </Paper>
        <Box m="2rem 0" />
      </Box>
    </Box>
  )
}

export default ProfileTab
