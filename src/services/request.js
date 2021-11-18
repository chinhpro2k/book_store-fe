import qs from 'query-string'
import auth from 'services/auth'
import helper from './helper'

let request = {}
const sendRequest = async (url = '', options = {}) => {
  try {
    let response = await fetch(process.env.REACT_APP_BE_URL + url, {
      headers: {
        'Content-Type': 'application/json',
        ...auth.getHeaderAuthentication(),
      },
      ...options,
    })

    if (response.ok) return await response.json()
    if (response.status === 404) helper.toast('error', 'Not found')
    if (response.status === 403) helper.toast('error', "You don't have permission")
    if (response.status === 500) helper.toast('error', 'Server error')
    return null
  } catch (error) {
    console.error(error)
    helper.toast('error', 'Request error')
    return null
  }
}

request.get = async (url = '', params = null) => {
  const queryString = params ? '?' + qs.stringify(params) : ''
  return await sendRequest(url + queryString)
}

request.post = async (url = '', data = {}) => {
  return await sendRequest(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

request.put = async (url = '', data = {}) => {
  return await sendRequest(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

request.delete = async (url = '', data = {}) => {
  return await sendRequest(url, {
    method: 'DELETE',
    body: JSON.stringify(data)
  })
}

export default request
