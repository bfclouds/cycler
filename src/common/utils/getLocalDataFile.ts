import path from 'path'
import fs from 'fs'

export default () => {
  let localConfigPath = process.env.HOME
  if (!localConfigPath) {
    localConfigPath = process.env.LOCALAPPDATA || ''
  }
  console.log(localConfigPath);
  
  const configPath = path.join(localConfigPath, "cycler")
  console.log('configPath>>>', configPath);
  
  if (!fs.existsSync(configPath)) {
    fs.mkdirSync(configPath)
  }
  return configPath
}