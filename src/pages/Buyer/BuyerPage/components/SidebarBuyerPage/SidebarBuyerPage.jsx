import classNames from 'classnames'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './sidebarBuyerPage.scss'

function SidebarBuyerPage() {
  const location = useLocation()

  return (
    <div className='h-sidebar-buyer'>
      <Link to='/buyer/account/profile' className='h-profile'>
        <div className='h-profile__avatar'></div>
        <div className='h-profile__name'>
          <div className='h-profile__name--name'>phanquanghieu</div>
          <div className='h-profile__name--icon'>
            <i className='fas fa-pencil-alt'></i>Sửa hồ sơ
          </div>
        </div>
      </Link>
      <div className='h-nav'>
        {NAV.map((nav, index) => (
          <Link
            key={index}
            to={nav.url}
            className={classNames(
              'h-nav__item',
              { 'h-nav__item--sub': nav.isSubNav },
              { 'h-nav__item--active': location.pathname === nav.url }
            )}
          >
            {!nav.isSubNav && <i className={`${nav.icon} text-${nav.color}`}></i>}
            {nav.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SidebarBuyerPage

const NAV = [
  {
    name: 'Tài khoản của tôi',
    url: '/buyer/account/profile',
    icon: 'far fa-user',
    color: 'info',
    isSubNav: false,
  },
  {
    name: 'Hồ sơ',
    url: '/buyer/account/profile',
    isSubNav: true,
  },
  {
    name: 'Địa chỉ',
    url: '/buyer/account/address',
    isSubNav: true,
  },
  {
    name: 'Đổi mật khẩu',
    url: '/buyer/account/password',
    isSubNav: true,
  },
  {
    name: 'Đơn mua',
    url: '/buyer',
    icon: 'far fa-calendar-check',
    color: 'success',
    isSubNav: false,
  },
  {
    name: 'Thông báo',
    url: '/buyer/notice',
    icon: 'far fa-bell',
    color: 'warning',
    isSubNav: false,
  },
  {
    name: 'Kho Voucher',
    url: '/buyer/voucher',
    icon: 'far fa-star',
    color: 'danger',
    isSubNav: false,
  },
]
