import local from '../../services/local'

export const createProduct=async (shopId,name,price,description,imageUrl)=>{
  try {
    let response = await fetch(
      process.env.REACT_APP_BE_URL+ '/api/product/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price,shopId,description,imageUrl }),
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
