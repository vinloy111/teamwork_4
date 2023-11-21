import React, { useEffect, useState } from 'react'
import { Box, useTheme, useMediaQuery, Tabs, Tab, Button } from '@mui/material'
import ProfileTab from './ProfileTab'
import ProfileData from './ProfileData'
import ProfilePass from './ProfilePass'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Store } from '../../store'
import { User } from 'types/User'

// TODO: не забыть удалить после загрузки данных с сервера
import { mockapUser } from '../../mocks/user'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const ProfilePage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery(theme.breakpoints.up('sm'))
  const [value, setValue] = React.useState(0)
  const currentUser = useSelector(
    (state: Store) => state.auth.user as User | null
  )
  const [user, setUser] = useState<User | null>(null)
  const { userId } = useParams()
  const isCurrentUser = userId == currentUser?.id

  useEffect(() => {
    if (!currentUser) return
    if (isCurrentUser) {
      setUser(currentUser)
    } else {
      const anotherUser = mockapUser.find(user => user.id === userId)
      if (anotherUser) {
        setUser(anotherUser)
      }
    }
  }, [currentUser])

  if (user === null || !userId) return <></>

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      width="100%"
      padding="2rem 10%"
      boxSizing="border-box"
      display={isNonMobileScreens ? 'flex' : 'block'}>
      <Box>
        <Tabs
          orientation={isNonMobileScreens ? 'vertical' : 'horizontal'}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label={isNonMobileScreens ? 'Vertical tabs' : 'Horizontal tabs'}
          sx={{ borderRight: 1, borderColor: 'divider' }}>
          <Tab label="User Profile" {...a11yProps(0)} />
          {isCurrentUser && <Tab label="Change data" {...a11yProps(1)} />}
          {isCurrentUser && <Tab label="Change password" {...a11yProps(2)} />}
        </Tabs>
        {isNonMobileScreens && (
          <Box textAlign="center" margin="2rem 0">
            <Button variant="contained">Log Out</Button>
          </Box>
        )}
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? '100%' : undefined}
        mt={isNonMobileScreens ? undefined : '2rem'}>
        <TabPanel value={value} index={0}>
          <ProfileTab user={user} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfileData />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProfilePass />
        </TabPanel>
      </Box>
    </Box>
  )
}

export default ProfilePage
