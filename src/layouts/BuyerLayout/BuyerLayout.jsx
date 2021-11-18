import React, { Suspense, useEffect } from 'react'
import { Redirect, Switch } from 'react-router-dom'

import ProtectedRoute from 'components/ProtectedRoute'
import BuyerLayoutHeader from './components/BuyerLayoutHeader'
import BuyerLayoutFooter from '../../common/footer/BuyerLayoutFooter'
import routes from 'routes'

import './buyerLayout.scss'

function BuyerLayout() {
  console.log("vao")
  return (
    <>
      <BuyerLayoutHeader />
      <div className='h-main'>
        <div className='h-main-container'>
          <Suspense>
            <Switch>
              {routes.buyer.map((route, index) => (
                <ProtectedRoute key={index} redirectUrl={'/login'} {...route} />
              ))}
            </Switch>
          </Suspense>
        </div>
      </div>
      <BuyerLayoutFooter />
    </>
  )
}

export default BuyerLayout
