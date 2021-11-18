let local = {}

local.set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

local.get = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

local.clear = () => {
  localStorage.clear()
}

export default local
