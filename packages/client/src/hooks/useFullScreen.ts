import { useEffect, useState } from 'react'

/**
 * Хук для использования web api full screen
 */
const useFullScreen = (): {
  isFullscreen: boolean
  handleFullScreen: () => void
} => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])
  useEffect(() => {
    function onEnterF11(event: KeyboardEvent) {
      if (event.key === 'F11') {
        event.preventDefault()
        handleFullScreen()
      }
    }

    document.addEventListener('keydown', onEnterF11, false)

    return () => document.removeEventListener('keydown', onEnterF11)
  }, [])
  const handleFullScreen = async () => {
    if (!isFullscreen) {
      await document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen || isFullscreen) {
      await document.exitFullscreen()
    }
  }
  return { isFullscreen, handleFullScreen }
}

export default useFullScreen
