import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Header from './components/header'
import Banner from './components/banner'
import Loader from 'components/Loader'
import request from 'services/request'
import local from 'services/local'

function Home(props) {
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const checkHasShop = async () => {
      const user = local.get('user')
      if(!user?.phone) return history.push('/seller/register')
      const res = await request.post('/api/auth/checkHasShop', {
        phone: user.phone,
      })
      if (res.error === 0) history.push('/seller/register')
      else setIsLoading(false)
    }
    checkHasShop()
  }, [])

  if (isLoading)
    return (
      <div style={{ height: '100vh' }}>
        <Loader />
      </div>
    )

  return (
    <div style={{ backgroundColor: '#ECECEC' }}>
      <Header />
      <Banner />
    </div>
  )
}

export default Home
