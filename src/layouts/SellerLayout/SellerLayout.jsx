import React, { useEffect } from 'react'
import Home from '../../pages/Seller/HomeSeller'

function SellerLayout(props) {
  useEffect(()=>{
    console.log(props)
  })
  return (
    <div>
      <Home/>
    </div>
  )
}

export default SellerLayout
