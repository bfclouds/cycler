export type PluginType = {
  currentPlugin: CurrentPluginType,
  searchValue?: string
}

export type CurrentPluginType = {
  cmd?: string,
  name?: string
}

export type CInputEvent = {
  target: HTMLInputElement
}