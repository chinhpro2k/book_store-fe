// import NoticeBuyer from 'pages/Buyer/NoticeBuyer/NoticeBuyer'

// import VoucherBuyer from 'pages/Buyer/Voucher/VoucherBuyer'
import React from 'react'

const HomeBuyer = React.lazy(() => import('pages/Buyer/HomeBuyer'))
const Cart = React.lazy(() => import('pages/Buyer/Cart'))
const BuyerPage = React.lazy(() => import('pages/Buyer/BuyerPage'))
const ProfileBuyer = React.lazy(() => import('pages/Buyer/BuyerPage/Account/ProfileBuyer'))
const AddressBuyer = React.lazy(() => import('pages/Buyer/BuyerPage/Account/AddressBuyer'))
const PasswordBuyer = React.lazy(() => import('pages/Buyer/BuyerPage/Account/PasswordBuyer'))
const HomeSeller = React.lazy(() => import('pages/Seller/HomeSeller'))
const NoticeBuyer = React.lazy(() => import('pages/Buyer/NoticeBuyer'))
const VoucherBuyer = React.lazy(() => import('pages/Buyer/VoucherBuyer'))
let routes = {}

routes.buyer = [
  {
    path: '/',
    exact: true,
    component: HomeBuyer,
    isProtected: false,
  },
  {
    path: '/cart',
    exact: true,
    component: Cart,
    isProtected: false,
  },
 
  {
    path: '/buyer',
    component: BuyerPage,
    isProtected: true,
    subRoutes: [
      {
        path: '/buyer/account/profile',
        exact: true,
        component: ProfileBuyer,
        isProtected: true ,
      },
      {
        path: '/buyer/account/address',
        exact: true,
        component: AddressBuyer,
        isProtected: true,
      },
      {
        path: '/buyer/account/password',
        exact: true,
        component: PasswordBuyer,
        isProtected: true,
      },
      {
        path: '/buyer/notice',
        exact: true,
        component: NoticeBuyer,
        isProtected: true,
      },
      {
        path: '/buyer/voucher',
        exact: true,
        component: VoucherBuyer,
        isProtected: true,
      }
    ],
  },
]

routes.seller = [
  {
    path: '/seller',
    exact: true,
    component: HomeSeller,
    isProtected: true,
  },
]

export default routes
