import { CanvasStarBackground } from 'pages/game/elements/CanvasStarBackground'
import { useEffect, useRef, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import './style.css'
import HomeIcon from '@mui/icons-material/Home'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export const DemoInfo = (): JSX.Element => {
  const demoInfoWrapper = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [canvasSize, setCanvasSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [tabValue, setTabValue] = useState<number>(1)

  useEffect(() => {
    const handleResize = () => {
      const width = demoInfoWrapper.current?.clientWidth
      const height = demoInfoWrapper.current?.clientHeight
      if (width && height) {
        setCanvasSize({
          width,
          height,
        })
      }
    }
    handleResize()
  }, [demoInfoWrapper])

  const tabs = (
    <div className="demo-info-tabs">
      <Tabs
        value={tabValue}
        onChange={(_, value) => setTabValue(value)}
        textColor="primary"
        indicatorColor="primary">
        <Tab className="demo-info-tabs-item" value={1} label="Проект" />
        <Tab
          className="demo-info-tabs-item"
          value={2}
          label="Команда teamwork_04"
        />
        <Tab className="demo-info-tabs-item" value={3} label="Технологии" />
      </Tabs>
      <Button sx={{ mb: 2 }}>
        <HomeIcon fontSize="large" onClick={() => navigate(`/`)} />
      </Button>
    </div>
  )

  const getTags = (tags: string[]) =>
    tags.map(i => (
      <span className="demo-info-neon-small-text-green demo-info-tag">{i}</span>
    ))

  const tabOne = (
    <div>
      <div
        className="demo-info-neon-small-text-green"
        style={{ marginTop: 50 }}>
        Название игры
      </div>
      <div className="demo-info-neon-text-purple" style={{ marginTop: 0 }}>
        Галактические войны
      </div>
      <div
        className="demo-info-neon-small-text-green"
        style={{ marginTop: 50 }}>
        Жанр
      </div>
      <div className="demo-info-neon-text-orange" style={{ marginTop: 0 }}>
        Казуальная стратегия в реальном времени
      </div>
      <div
        className="demo-info-neon-small-text-green"
        style={{ marginTop: 50 }}>
        Возможности приложения
      </div>
      <div className="demo-info-neon-text-red" style={{ marginTop: 0 }}>
        Регистрация, авторизация, настройки пользователя, форум, таблица лидеров
      </div>
    </div>
  )

  const tabTwo = (
    <div>
      <div className="demo-info-neon-text-orange">Андрей Шторк</div>
      <div>
        {getTags([
          'infra',
          'authorization',
          'user settings',
          'ssr',
          'db',
          'deploy',
        ])}
      </div>
      <div className="demo-info-neon-text-orange">Елена Леванова</div>
      <div>
        {getTags(['forum', 'leaderboard', 'web api', 'unit-tests', 'ssr'])}
      </div>
      <div className="demo-info-neon-text-orange">Дмитрий Гасилов</div>
      <div>{getTags(['game', 'ssr', 'emodji'])}</div>
      <div className="demo-info-neon-text-orange">Ольга Купцова</div>
      <div>{getTags(['new teammate'])}</div>
      <div className="demo-info-neon-text-orange">Полина Аликина</div>
      <div>{getTags(['curator'])}</div>
    </div>
  )

  const tabThree = (
    <div>
      <div className="demo-info-neon-text-purple">Frontend</div>
      <div>
        {getTags([
          'vite',
          'ts',
          'react',
          'redux',
          'axios',
          'material-ui',
          'canvas',
          'prettier',
          'eslint',
          'jest',
        ])}
      </div>
      <div className="demo-info-neon-text-purple">Backend</div>
      <div>{getTags(['express', 'sequelize', 'postgresql', 'ssr'])}</div>
    </div>
  )

  return (
    <div
      ref={demoInfoWrapper}
      className="demo-info-wrapper"
      style={{ zIndex: 2 }}>
      {tabs}
      <div className="demo-info-tab-content">
        {tabValue === 1 ? tabOne : <></>}
        {tabValue === 2 ? tabTwo : <></>}
        {tabValue === 3 ? tabThree : <></>}
      </div>
      <CanvasStarBackground canvasSize={canvasSize} />
    </div>
  )
}
