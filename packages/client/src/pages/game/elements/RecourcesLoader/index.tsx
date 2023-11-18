import React, { useEffect, useState } from 'react'
import { GameRecources } from 'types/GameData'

type Props = {
  setRecources: React.Dispatch<React.SetStateAction<GameRecources | null>>
}

export const RecourcesLoader = React?.memo(
  ({ setRecources }: Props): JSX.Element => {
    const [data, setData] = useState<{
      areas: {
        red?: HTMLImageElement
        blue?: HTMLImageElement
        gray?: HTMLImageElement
      }
      armies: {
        red?: HTMLImageElement
        blue?: HTMLImageElement
        gray?: HTMLImageElement
      }
    }>({
      areas: {
        red: undefined,
        blue: undefined,
        gray: undefined,
      },
      armies: {
        red: undefined,
        blue: undefined,
        gray: undefined,
      },
    })

    // TODO: Подумать как сделать более элегантно
    useEffect(() => {
      const imgRedArea = new Image()
      imgRedArea.src = 'src/assets/images/red-planet.svg'
      imgRedArea.onload = () => {
        setData(d => ({ ...d, areas: { ...d.areas, red: imgRedArea } }))
      }

      const imgBlueArea = new Image()
      imgBlueArea.src = 'src/assets/images/blue-planet.svg'
      imgBlueArea.onload = () => {
        setData(d => ({ ...d, areas: { ...d.areas, blue: imgBlueArea } }))
      }

      const imgGrayArea = new Image()
      imgGrayArea.src = 'src/assets/images/gray-planet.svg'
      imgGrayArea.onload = () => {
        setData(d => ({ ...d, areas: { ...d.areas, gray: imgGrayArea } }))
      }

      const imgRedArmy = new Image()
      imgRedArmy.src = 'src/assets/images/red-ufo.svg'
      imgRedArmy.onload = () => {
        setData(d => ({ ...d, armies: { ...d.armies, red: imgRedArmy } }))
      }

      const imgBlueArmy = new Image()
      imgBlueArmy.src = 'src/assets/images/blue-ufo.svg'
      imgBlueArmy.onload = () => {
        setData(d => ({ ...d, armies: { ...d.armies, blue: imgBlueArmy } }))
      }

      const imgGrayArmy = new Image()
      imgGrayArmy.src = 'src/assets/images/gray-ufo.svg'
      imgGrayArmy.onload = () => {
        setData(d => ({ ...d, armies: { ...d.armies, gray: imgGrayArmy } }))
      }
    }, [])

    // TODO: Подумать как сделать более элегантно
    useEffect(() => {
      if (
        data.areas.red &&
        data.areas.blue &&
        data.areas.gray &&
        data.armies.red &&
        data.armies.blue &&
        data.armies.gray
      ) {
        setRecources(data)
      }
    }, [data])

    return <></>
  }
)
