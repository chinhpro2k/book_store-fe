import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import auth from 'services/auth'
import helper from 'services/helper'
import local from 'services/local'

function BuyerLayoutHeader() {
  const history = useHistory()
  const user = auth.getUser()

  const handleLogout = () => {
    local.clear()
    helper.toast('danger', 'Logout success')
    history.push('/')
  }

  return (
    <header className='h-header'>
      <div className='h-header-container'>
        <div className='h-header-top'>
          <div className='h-header-top__left'>
            <Link to='/seller/login' className='h-header-top__item'>
              <div className='h-header-top__link'>Kênh người bán</div>
            </Link>
            <div className='h-header-top__item'>
              <a
                className='h-header-top__link'
                href='https://www.facebook.com/phanhieu15/'
                target='_blank'
                rel='noreferrer'
              >
                Kết nối <i className='fab fa-facebook'></i>
              </a>
            </div>
          </div>
          <div className='h-header-top__right'>
            <Link to='/buyer/notice' className='h-header-top__item h-dropdown h-dropdown--noti'>
              <div className='h-header-top__link h-dropdown__toggle'>
                <i className='fas fa-bell'></i> Thông báo
              </div>
              <div className='h-dropdown__menu'>
                <div className='h-menu__item'>sss</div>
              </div>
            </Link>
            {!user ? (
              <>
                <Link to='/signup' className='h-header-top__item'>
                  <div className='h-header-top__link'>Đăng ký</div>
                </Link>
                <Link to='/login' className='h-header-top__item'>
                  <div className='h-header-top__link'>Đăng Nhập</div>
                </Link>
              </>
            ) : (
              <div className='h-header-top__item h-dropdown h-dropdown--profile'>
                <div className='h-header-top__link h-dropdown__toggle'>
                  <i className='fas fa-user'></i> {user.name?user.name:user.phone}
                </div>
                <div className='h-dropdown__menu'>
                  <div className='h-menu__item'>
                    <Link to='/buyer/account/profile'>Tài khoản của tôi</Link>
                  </div>
                  <div className='h-menu__item'>
                    <Link to='/buyer/purchase'>Đơn mua</Link>
                  </div>
                  <div className='h-menu__item' onClick={handleLogout}>
                    <div>Đăng xuất</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='h-header-main'>
          <Link to='/' className='h-header__brand'>
            ShopKi
          </Link>
          <div className='h-header__search'>
            <input className='h-search__input' type='text' placeholder='Tìm kiếm trên ShopKi' />
            <button className='h-search__btn'>
              <i className='fas fa-search'></i>
            </button>
          </div>
          <div className='h-header__cart'>
            <div className='h-dropdown h-dropdown--cart'>
              <Link to='/cart' className='h-cart__icon h-dropdown__toggle'>
                <i className='fas fa-cart-arrow-down'></i>
                <div className='h-cart__amount'>299</div>
              </Link>
              <div className='h-dropdown__menu'>
                <div className='h-menu__item opacity-50'>Sản phẩm mới thêm</div>
                <div className='h-menu__item'></div>
                <div className='h-menu__item'></div>
                <div className='h-menu__item'></div>
                <div className='h-menu__footer'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default BuyerLayoutHeader
