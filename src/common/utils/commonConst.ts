export default {
  windows(): boolean {
    return process.platform === 'win32'
  },
  dev(): boolean {
    return process.env.NODE_ENV === 'development'
  },
}
