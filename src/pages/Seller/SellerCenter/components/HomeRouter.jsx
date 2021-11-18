import { Route } from 'react-router-dom'
import SignUpSeller from '../../SignUpSeller'
import React from 'react'
import ShopInformation from './router/ShopInformation'
import CreateProduct from './router/CreateProduct'
import Dashboard from './router/Dashboard'
import ProductList from './router/ProductList'
import WareHouse from './router/WareHouse'
import WarehouseDetail from './router/WarehouseDetail'
import CreateWarehouse from './router/CreateWarehouse'
import Coupon from './router/Coupon'

function HomeRouter() {
  return (
    <>
      <Route
        exact path='/seller/home-center'
        render={(props) => <Dashboard {...props} />}
      />
      <Route
        exact path='/seller/home-center/shop/address'
        render={(props) => <ShopInformation {...props} />}
      />
      <Route
        exact path='/seller/home-center/shop'
        render={(props) => <ShopInformation {...props} />}
      />
      <Route
        exact path='/seller/home-center/product/add'
        render={(props) => <CreateProduct {...props} />}
      />
      <Route
        exact path='/seller/home-center/product/add/:query/:id'
        render={(props) => <CreateProduct {...props} />}
      />
      <Route
        exact path='/seller/home-center/products/state=All'
        render={(props) => <ProductList {...props} />}
      />
      <Route
        exact path='/seller/home-center/warehouse'
        render={(props) => <WareHouse {...props} />}
      />
      <Route
        exact path='/seller/home-center/warehouse/:id'
        render={(props) => <WarehouseDetail {...props} />}
      />
      <Route
        exact path='/seller/home-center/warehouse-create/add'
        render={(props) => <CreateWarehouse {...props} />}
      />
      <Route
        exact path='/seller/home-center/coupon'
        render={(props) => <Coupon {...props} />}
      />
    </>
  )

}

export default HomeRouter