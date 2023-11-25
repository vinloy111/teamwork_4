import { APP_CONSTS } from 'consts/index'
import React, { useEffect, useState } from 'react'
import { GameResources } from 'types/GameData'

type Props = {
  setResources: React.Dispatch<React.SetStateAction<GameResources | null>>
}

const AREAS = APP_CONSTS.gameResourcesConfig.areas
const ARMIES = APP_CONSTS.gameResourcesConfig.armies
const AUDIO = APP_CONSTS.gameResourcesConfig.audio

export const ResourcesLoader = React?.memo(
  ({ setResources }: Props): JSX.Element => {
    const [data, setData] = useState<GameResources>({
      areas: {},
      armies: {
        red: undefined,
        blue: undefined,
        gray: undefined,
      },
      audio: {
        backgroundMusic: undefined,
        start: undefined,
        win: undefined,
        lose: undefined,
      },
    })

    useEffect(() => {
      AUDIO?.forEach(i => {
        const audio = new Audio(i.src)
        audio.oncanplaythrough = () => {
          setData(d => ({ ...d, audio: { ...d.audio, [i.name]: audio } }))
        }
      })

      AREAS?.forEach(i => {
        const img = new Image()
        img.src = i.src
        img.onload = () => {
          setData(d => ({ ...d, areas: { ...d.areas, [i.name]: img } }))
        }
      })

      ARMIES?.forEach(i => {
        const img = new Image()
        img.src = i.src
        img.onload = () => {
          setData(d => ({ ...d, armies: { ...d.armies, [i.name]: img } }))
        }
      })
    }, [])

    useEffect(() => {
      if (
        Object.values(data.areas).filter(Boolean).length === AREAS.length &&
        Object.values(data.armies).filter(Boolean).length === ARMIES.length &&
        Object.values(data.audio).filter(Boolean).length === AUDIO.length
      ) {
        setResources(data)
      }
    }, [data])

    return <></>
  }
)
