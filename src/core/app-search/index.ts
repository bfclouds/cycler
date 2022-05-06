import commonConst from '@/common/utils/commonConst'

let appSearch: any

if (commonConst.macOs()) {
  appSearch = await import ('./darwin')
}

export default appSearch

