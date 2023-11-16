import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { APP_CONST } from '../../consts'

export const HomePage = () => {
  const content = (
    <>
      <Typography
        variant="h6"
        sx={{
          mb: '20px',
        }}
        gutterBottom>
        Приветствуем вас на сайте нашей игры "{APP_CONST.gameName}", которую мы
        старательно делаем во 2м модуле обучения.
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mb: '20px',
        }}
        gutterBottom>
        Помимо самой игры в нашем приложении будет форум, страница с лучшими
        результатами и профиль пользователя.
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mb: '20px',
        }}
        gutterBottom>
        Геймплей заключается в захвате территорий, уже готов прототип механики,
        который уже можно запустить и попробовать, но добавлять её в список
        желаемого Steam пока рановано.
      </Typography>
      <Typography variant="h6" gutterBottom>
        На текущий момент актуальными вопросами являются{' '}
        <s>монетизация и проработка гача механик</s> выбор сеттинга, визуальной
        составляющей и работа над алгоритмом бота.
      </Typography>
    </>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: '50px',
      }}>
      <Paper
        elevation={24}
        sx={{ maxWidth: '800px', padding: '20px', borderRadius: '10px' }}>
        {content}
      </Paper>
    </Box>
  )
}
