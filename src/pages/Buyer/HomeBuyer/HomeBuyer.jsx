import React, { useEffect, useState } from 'react'
import CategoryCarousel from './components/CategoryCarousel'
import ProductItem from 'pages/components/ProductItem'

import './homeBuyer.scss'
import request from '../../../services/request'

function HomeBuyer() {
  useEffect(async () => {

    // const fetch = async () => {
    //   let res = await request.get('/todos/2')
    //   console.log(res)
    //   console.log(local.get('sasa'))
    // }
    // fetch()
    await getProduct()
  }, [])

  const [product, setProduct] = useState([])
  const getProduct = async () => {
    let res = await request.get('/api/product')
    if (res) {
      setProduct(res.products)
    }
  }
  return (
    <div className='h-home-buyer'>
      <div className='h-banner'>
        <div className='h-banner__left'>
          <img src='https://cf.shopee.vn/file/4432d25e163a938681690362507c39ad_xxhdpi' alt='' />
        </div>
        <div className='h-banner__right'>
          <img src='https://cf.shopee.vn/file/4432d25e163a938681690362507c39ad_xxhdpi' alt='' />
          <img src='https://cf.shopee.vn/file/4432d25e163a938681690362507c39ad_xxhdpi' alt='' />
        </div>
      </div>
      <CategoryCarousel />
      <div className='h-product'>
        <div className='h-product__header'>GỢI Ý HÔM NAY</div>
        <div className='h-product__list'>
          {/*{Array.from(Array(20).keys()).map((e, i) => (*/}
          {/*  <ProductItem product={PRODUCTS[0]} />*/}
          {/*))}*/}
          {product.map((value) => {
            if (value.export)
            return (
              <ProductItem product={value} />
            )
          })}
        </div>

      </div>

    </div>
  )
}

export default HomeBuyer

const PRODUCTS = [
  {
    id: '1',
    name: 'Bán sỉ - Giày Swat PUBG, dã ngoại, đi phượt, giày motor, xe máy, bảo vệ cổ chân, mắt cá chân',
    img: 'https://cf.shopee.vn/file/570cf67f80a87870ebb065c330e344ca_tn',
    price: 300000,
    promoPrice: 250000,
    voucher: '10% giảm',
    historicalSold: '199'
  }
]
