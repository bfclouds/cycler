

import search from './search'

const renderPluginManager = () => {
  const {
    searchValue,
    onSearch,
    searchOptions
  } = search()

  return {
    searchValue,
    onSearch,
    searchOptions
  }
}
export default renderPluginManager