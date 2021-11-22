import local from './local'

const URL_BY_USER_TYPE = {
  buyer: '',
  seller: '/seller',
}

let auth = {}

auth.signUp = async (phone, password,name) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_BE_URL + "/api/customer/create",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName:phone, password,name }),
      }
    )
    if (!response.ok) return { error: 1, message: 'Server error' }
    return await response.json()
  } catch (error) {
    console.error(error)
    return { error: 1, message: 'Server error' }
  }
}

auth.login = async (phone, password) => {
  try {
    let response = await fetch(
      process.env.REACT_APP_BE_URL + URL_BY_USER_TYPE + '/api/customer/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName:phone, password }),
      }
    )
    if (!response.ok) return { error: 1, message: 'Server error' }
    response = await response.json()
    return response
  } catch (error) {
    console.error(error)
    return { error: 1, message: 'Server error' }
  }
}

auth.logout = () => {
  local.clear()
}

auth.getUser = () => {
  return local.get('user')
}

auth.getHeaderAuthentication = () => {
  const token = local.get('token')
  return token ? { Authentication: `Bearer ${token}` } : {}
}

export default auth
