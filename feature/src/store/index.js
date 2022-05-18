import { reactive, readonly, inject } from 'vue'
import action from './action'
export const storeSymbol = Symbol('state')

export const createStore = () => {
  const state = reactive({
    localPluginsMap: {}
  })
  const actionMap = action(state)

  return {
    state: readonly(state),
    ...actionMap
  }
}

export const useStore = () => inject(storeSymbol)