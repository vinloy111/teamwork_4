import { AreaOwner } from 'types/GameData'
import { GameDifficulty, Player } from 'types/GameStats'

export const APP_CONSTS = {
  gameName: 'Галактические войны',
  ratingFieldName: 'teamGalacticWars',
  teamName: 'team4GalacticWars',
  gameResourcesConfig: {
    areas: new Array(24) // это число изображений в каталоге /images/planets
      .fill({})
      .map((_, index) => ({
        name: index + 1,
        src: `/images/planets/planet_${index + 1}.svg`,
      })),
    armies: [
      { name: 'red', src: '/images/ships/red-ufo.svg' },
      { name: 'blue', src: '/images/ships/blue-ufo.svg' },
      { name: 'gray', src: '/images/ships/gray-ufo.svg' },
      { name: 'green', src: '/images/ships/green-ufo.svg' },
      { name: 'orange', src: '/images/ships/orange-ufo.svg' },
    ],
    audio: [
      {
        name: 'backgroundMusic',
        src: '/music/space-game-theme-loop.wav',
      },
      { name: 'start', src: '/sounds/start.mp3' },
      { name: 'win', src: '/sounds/win.wav' },
      { name: 'lose', src: '/sounds/fall.wav' },
    ],
  },
  keyboardCode: {
    space: 'Space',
  },
  defaultPlayersSettings: [
    {
      color: AreaOwner.blue,
      colorName: 'Синий',
      player: Player.user,
      difficulty: undefined,
    },
    {
      color: AreaOwner.red,
      colorName: 'Красный',
      player: Player.computer,
      difficulty: GameDifficulty.easy,
    },
    {
      color: AreaOwner.green,
      colorName: 'Зеленый',
      player: Player.none,
    },
    {
      color: AreaOwner.orange,
      colorName: 'Оранжевый',
      player: Player.none,
    },
  ],
}
