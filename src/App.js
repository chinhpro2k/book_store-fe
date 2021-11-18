import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'libs/Toast/toast.scss'
import 'scss/style.scss'

import Loader from 'components/Loader'
import BuyerLayout from 'layouts/BuyerLayout'
import SellerLayout from 'layouts/SellerLayout'
import LoginBuyer from 'pages/Buyer/LoginBuyer'
import SignUpBuyer from 'pages/Buyer/SignUpBuyer'
import LoginSeller from 'pages/Seller/LoginSeller'
import SignUpSeller from 'pages/Seller/HSignUpSeller'
import SellerCenter from './pages/Seller/SellerCenter'
import CPLayout from './layouts/CPLayout'
import ProductDetail from './pages/components/ProductDetail'
import local from './services/local'
function App() {
  useEffect(()=>{
    if (local.get('user')===undefined){
      localStorage.removeItem('user')
    }
  },[])
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              exact path='/login'
              name='Buyer Login '
              render={(props) => <LoginBuyer {...props} />}
            />
            <Route
              exact path='/signup'
              name='Buyer Signup '
              render={(props) => <SignUpBuyer {...props} />}
            />
            <Route
              exact path='/seller/login'
              name='Seller Login '
              render={(props) => <LoginSeller {...props} />}
            />
            <Route
              exact path='/seller/register'
              name='Seller Login '
              render={(props) => <SignUpSeller {...props} />}
            />
            <Route
              exact path='/seller'
              name='Seller Layout'
              render={(props) => <SellerLayout {...props} />}
            />
            <Route
              path='/seller/home-center'
              name='Seller Layout'
              render={(props) => <SellerCenter {...props} />}
            />
            <Route
              exact path='/admin'
              name='CP Layout'
              render={(props) => <CPLayout {...props} />}
            />
            <Route
            exact path='/product-detail/:id'
            name='CP Layout'
            render={(props) => <ProductDetail {...props} />}
          />
            <Route  path='/' name='Buyer Layout' render={(props) => <BuyerLayout {...props} />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}
export default App
