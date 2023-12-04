import { APP_CONSTS } from 'consts/index'
import { updateGameResources } from 'features/gameResourcesSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from 'src/store'
import { GameResources } from 'types/GameData'

const AREAS = APP_CONSTS.gameResourcesConfig.areas
const ARMIES = APP_CONSTS.gameResourcesConfig.armies
const AUDIO = APP_CONSTS.gameResourcesConfig.audio

export const ResourcesLoader = (): JSX.Element => {
  const dispatch = useDispatch()
  const [data, setData] = useState<GameResources>({
    areas: {},
    armies: {
      red: undefined,
      blue: undefined,
      green: undefined,
      orange: undefined,
      gray: undefined,
    },
    audio: {
      backgroundMusic: undefined,
      start: undefined,
      win: undefined,
      lose: undefined,
    },
  })

  const { areas, armies, audio } = useSelector(
    (state: Store) => state.gameResources
  )

  useEffect(() => {
    if (!Object.values(audio).filter(Boolean).length) {
      AUDIO?.forEach(i => {
        const audio = new Audio(i.src)
        audio.oncanplaythrough = () => {
          setData(d => ({ ...d, audio: { ...d.audio, [i.name]: audio } }))
        }
      })
    }

    if (!Object.values(areas).filter(Boolean).length) {
      AREAS?.forEach(i => {
        const img = new Image()
        img.src = i.src
        img.onload = () => {
          setData(d => ({ ...d, areas: { ...d.areas, [i.name]: img } }))
        }
      })
    }

    if (!Object.values(armies).filter(Boolean).length) {
      ARMIES?.forEach(i => {
        const img = new Image()
        img.src = i.src
        img.onload = () => {
          setData(d => ({ ...d, armies: { ...d.armies, [i.name]: img } }))
        }
      })
    }
  }, [])

  useEffect(() => {
    if (
      Object.values(data.areas).filter(Boolean).length === AREAS.length &&
      Object.values(data.armies).filter(Boolean).length === ARMIES.length &&
      Object.values(data.audio).filter(Boolean).length === AUDIO.length
    ) {
      dispatch(updateGameResources(data))
    }
  }, [data])

  return <></>
}
