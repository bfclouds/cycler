import request from './request'

export default {
  getTotalPlugin() {
    return request.get('/api/plugins/total-plugins.json')
  },
  getPluginDetail(url) {
    return request.get(url)
  }
}