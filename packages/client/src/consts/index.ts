export const APP_CONSTS = {
  gameName: 'Безжалостные космические завоевания',
  gameResourcesConfig: {
    areas: new Array(24).fill({}), // TODO: По хорошему бы найти решение, чтобы это число автоматически генерировалось на основе кол-ва изображений в каталоге
    armies: ['red', 'gray', 'blue'],
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
