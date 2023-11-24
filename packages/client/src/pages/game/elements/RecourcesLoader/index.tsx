import React, { useEffect, useState } from 'react'
import { GameRecources } from 'types/GameData'

type Props = {
  setRecources: React.Dispatch<React.SetStateAction<GameRecources | null>>
}

const AREA_IMG_COUNT = 24 // TODO: По хорошему бы найти решение, чтобы это число автоматически генерировалось на основе кол-ва изображений в каталоге
const AREAS = new Array(AREA_IMG_COUNT).fill({})
const ARMIES = ['red', 'gray', 'blue']
const AUDIO = [
  {
    name: 'backgroundMusic',
    src: 'src/assets/music/space-game-theme-loop.wav',
  },
  { name: 'start', src: 'src/assets/sounds/start.mp3' },
  { name: 'win', src: 'src/assets/sounds/win.wav' },
  { name: 'lose', src: 'src/assets/sounds/fall.wav' },
]

export const RecourcesLoader = React?.memo(
  ({ setRecources }: Props): JSX.Element => {
    const [data, setData] = useState<GameRecources>({
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
    }, [])

    useEffect(() => {
      AREAS?.forEach((_, index) => {
        const id = index + 1
        const img = new Image()
        img.src = `src/assets/images/planets/planet_${id}.svg`
        img.onload = () => {
          setData(d => ({ ...d, areas: { ...d.areas, [id]: img } }))
        }
      })

      ARMIES?.forEach(i => {
        const img = new Image()
        img.src = `src/assets/images/ships/${i}-ufo.svg`
        img.onload = () => {
          setData(d => ({ ...d, armies: { ...d.armies, [i]: img } }))
        }
      })
    }, [])

    useEffect(() => {
      if (
        Object.values(data.areas).filter(Boolean).length >= AREAS.length &&
        Object.values(data.armies).filter(Boolean).length >= ARMIES.length &&
        Object.values(data.audio).filter(Boolean).length >= AUDIO.length
      ) {
        setRecources(data)
      }
    }, [data])

    return <></>
  }
)
