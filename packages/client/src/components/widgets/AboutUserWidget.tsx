import {
  EmailOutlined,
  PhoneAndroidOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme } from '@mui/material'
import UserImage from '../UserImage'
import FlexBetween from '../FlexBetween'
import WidgetWrapper from '../WidgetWrapper'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'types/User'

const AboutUserWidget = ({ user }: { user: User }) => {
  const { palette } = useTheme()
  const secondary = palette.secondary.main
  const main = palette.primary.main

  if (!user) {
    return null
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    location,
    aboutMe,
    site,
    occupation,
    viewedProfile,
    lastPost,
    numberInTheTop,
  } = user

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}

      <Box p="0 0 1rem 0">
        <Typography
          variant="h5"
          fontWeight="500"
          sx={{
            '&:hover': {
              color: palette.primary.light,
              cursor: 'pointer',
            },
          }}>
          Обо мне
        </Typography>
        <Typography color={palette.secondary.main}>{aboutMe}</Typography>
      </Box>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Typography
          variant="h5"
          fontWeight="500"
          sx={{
            '&:hover': {
              color: palette.primary.light,
              cursor: 'pointer',
            },
          }}>
          Личная информация
        </Typography>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={main}>Имя:</Typography>
          <Typography color={secondary}>{firstName}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={main}>Фамилия:</Typography>
          <Typography color={secondary}>{lastName}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={main}>Занятие:</Typography>
          <Typography color={secondary}>{occupation}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={main}>Расположение:</Typography>
          <Typography color={secondary}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={main}>Телефон:</Typography>
          <Typography color={secondary}>{phone}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={main}>Почтовый ящик:</Typography>
          <Typography color={secondary}>{email}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={main}>Сайт:</Typography>
          <Typography color={secondary}>{site}</Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  )
}

export default AboutUserWidget
