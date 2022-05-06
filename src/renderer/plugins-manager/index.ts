import { reactive, ref } from 'vue'
import { nativeImage } from "electron"
// import appSearch from "@/core/app-search"

const createPluginManager = (): any => {
  const state: any = reactive({
    currentPlugin: {}
  })

  const appList = ref([])
  const initPlugins = async () => {
    // appList.value = await appSearch(nativeImage);
  }
}

export default createPluginManager