function urlParamsObjectToUrlStr(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj || ''
  }

  let paramsStr = ''
  const params = []
  for (const key in obj) {
    let itemData = obj[key]
    if (typeof obj[key] === 'object') {
      itemData = JSON.stringify(obj[key])
    } else {
      itemData = encodeURIComponent(obj[key])
    }
    params.push(`${key}=${itemData}`)
  }
  paramsStr += params.join('&')
  return paramsStr
}

const baseUrl = ''
const request = {
  get(url, params = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const paramsStr = urlParamsObjectToUrlStr(params)
      xhr.withCredentials = true
      if (!/^http(s?):\/\//i.test(url)) {
        url = baseUrl + url
      }
      xhr.open('GET', `${url}?${paramsStr}`, true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          const res = this.responseText
          if (this.status === 200) {
            resolve(res)
          } else {
            reject(res)
          }
        }
      }
      xhr.send()
    })
  },
}

export default request