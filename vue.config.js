// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
      },
    },
  },
  pages: {
    index: {
      entry: "src/renderer/main.ts",
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessFile: "src/main/index.ts",
      mainProcessWatch: ["src/main"],
      externals: [
        'pouchdb',
        'extract-file-icon'
      ],
      builderOptions: {
        mac: {
          icon: "public/icons/icon.icns",
          target: [
            "dmg",
            "pkg"
          ],
          extendInfo: {
            LSUIElement: 1,
          },
        }
      }
    }
  }
}