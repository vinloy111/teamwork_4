export const APP_CONSTS = {
  gameName: 'Безжалостные космические завоевания',
  gameResourcesConfig: {
    areas: new Array(24) // это число изображений в каталоге src/assets/images/planets
      .fill({})
      .map((_, index) => ({
        name: index + 1,
        src: `src/assets/images/planets/planet_${index + 1}.svg`,
      })),
    armies: [
      { name: 'red', src: 'src/assets/images/ships/red-ufo.svg' },
      { name: 'blue', src: 'src/assets/images/ships/blue-ufo.svg' },
      { name: 'gray', src: 'src/assets/images/ships/gray-ufo.svg' },
    ],
    audio: [
      {
        name: 'backgroundMusic',
        src: 'src/assets/music/space-game-theme-loop.wav',
      },
      { name: 'start', src: 'src/assets/sounds/start.mp3' },
      { name: 'win', src: 'src/assets/sounds/win.wav' },
      { name: 'lose', src: 'src/assets/sounds/fall.wav' },
    ],
  },
}
