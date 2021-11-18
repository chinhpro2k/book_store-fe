import React, { Suspense } from 'react'
import { Switch, Redirect } from 'react-router-dom'

import Loader from 'components/Loader'
import ProtectedRoute from 'components/ProtectedRoute'
import SidebarBuyerPage from './components/SidebarBuyerPage'
import './buyerPage.scss'

function BuyerPage(props) {
  return (
    <div className='h-buyer-page'>
      <div className='h-buyer-page__sidebar'>
        <SidebarBuyerPage />
      </div>
      <div className='h-buyer-page__content'>
        <Suspense fallback={<Loader />}>
          <Switch>
            {props.subRoutes.map((subRoute, index) => (
              <ProtectedRoute key={index} redirectUrl={'/login'} {...subRoute} />
            ))}
            <Redirect path='/' to='/buyer/account/profile' />
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}

export default BuyerPage
