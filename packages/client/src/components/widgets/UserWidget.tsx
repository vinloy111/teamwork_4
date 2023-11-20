import {
  EmailOutlined,
  PhoneAndroidOutlined,
  LocationOnOutlined,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme } from '@mui/material'
import UserImage from '../UserImage'
import FlexBetween from '../FlexBetween'
import WidgetWrapper from '../WidgetWrapper'
import { useNavigate } from 'react-router-dom'
import { User } from 'types/User'

const UserWidget = ({ user }: { user: User }) => {
  const { palette } = useTheme()
  const navigate = useNavigate()
  const secondary = palette.secondary.main
  const main = palette.primary.main

  console.log('widget', user)
  if (!user) {
    return null
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    location,
    occupation,
    viewedProfile,
    lastPost,
    numberInTheTop,
  } = user

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${user.id}`)}>
        <FlexBetween gap="1rem">
          <UserImage image={user.picturePath} />
          <Box>
            <Typography
              variant="h4"
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}>
              {firstName} {lastName}
            </Typography>
            <Typography color={palette.secondary.main}>
              {numberInTheTop} место в топе
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <EmailOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={secondary}>{email}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PhoneAndroidOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={secondary}>{phone}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={secondary}>{location}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={secondary}>Число просмотров профиля</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={secondary}>Последний пост</Typography>
          <Typography color={main} fontWeight="500">
            {lastPost}
          </Typography>
        </FlexBetween>
      </Box>

      {/* Не знаю, нужно ли?
      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={secondary}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={secondary}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
      */}
    </WidgetWrapper>
  )
}

export default UserWidget
