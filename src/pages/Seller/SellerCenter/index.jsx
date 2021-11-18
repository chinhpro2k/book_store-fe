import Menu from './components/Menu'
import PageRight from './components/PageRight'
import { useEffect, useState } from 'react'
import HomeRouter from './components/HomeRouter'
import ProfileShop from './components/ProfileShop'
import local from '../../../services/local'
import request from '../../../services/request'

function SellerCenter(props) {
  const [choseMenu, setChoseMenu] = useState({
    parentTitle: '',
    childrenTitle: '',
    path: ''
  })
  const [shop, setShop] = useState({})
  const user = local.get('user')
  useEffect(async () => {
    if (user) {
      if (!user.shop_id) {
        props.history.push('/seller/register')

      } else {
        const res = await request.get(`/api/shop?id=${user.shop_id}`)
        if (res) {
          setShop(res.shop)
        }
      }
    }
  }, [])
  const handleOnClick = () => {

  }
  const handleChangeMenu = (chose) => {
    setChoseMenu(chose)
  }
  return (
    <div className='w-100 d-flex'>
      <div style={{ width: '20%', marginTop: '20px' }}>
        <ProfileShop shop={shop} />
        <Menu handleChangeMenu={(chose) => handleChangeMenu(chose)} />
      </div>
      <div style={{ width: '80%' }}>
        <PageRight choseMenu={choseMenu} />

      </div>

    </div>
  )
}

export default SellerCenter