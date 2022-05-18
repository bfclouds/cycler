

export default (state) => {
  return {
    getLocalPlugin() {
      if (!window.market) {
        return
      }

      window.market.getLocalPlugins().then(res => {
        let map = {}
        console.log('渲染进程 >>> ',res)
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