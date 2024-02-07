export type AppWindow = typeof window & {
  __PRELOADED_STATE__?: string
  __ENV__: { [key: string]: any }
}
