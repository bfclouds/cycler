

export default (state) => {
  return {
    getLocalPlugin() {
      if (!window.market) {
        return
      }
      return window.market.getLocalPlugins().then(res => {
        let map = {}
        if (Array.isArray(res)) {
          res.forEach(item => {
            map[item.name] = item
          })
          state.localPluginsMap = map
        }
      })
    }
  }
}