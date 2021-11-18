import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormGroup, Input, Button } from 'reactstrap'
import BuyerLayoutFooter from 'common/footer/BuyerLayoutFooter'

import helper from 'services/helper'
import auth from 'services/auth'
import './loginBuyer.scss'

function LoginBuyer() {
  const history = useHistory()

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    let loginRes = await auth.login(phone, password, 'buyer')
    if (loginRes?.error) return helper.toast('danger', 'Login error')

    helper.toast('success', 'Login success')
    history.push('/buyer')
  }

  return (
    <div className='h-login-buyer'>
      <div className='h-lb-header'>
        <Link to='/'>
          <div className='h-lb__logo'>ShopKi</div>
        </Link>
        <div className='h-lb__title'>Đăng nhập</div>
      </div>
      <div className='h-lb-container'>
        <div className='h-lb-content'>
          <div className='h-login__title'>
            <div className='h-login__brand'>ShopKi</div>
            <div className='h-login__slogan'>Buy for your future</div>
          </div>
          <div className='h-login__from'>
            <div className='row mb-4'>
              <h4 className=' d-flex justify-content-center'>Đăng Nhập</h4>
            </div>
            <div className='row m-0'>
              <FormGroup className='p-0 mb-4'>
                <Input
                  type='text'
                  placeholder='Số điện thoại'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                />
              </FormGroup>
              <FormGroup className='p-0 mb-4'>
                <Input
                  type='password'
                  placeholder='Mật khẩu'
                  value={password}
                  onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                />
              </FormGroup>
              <Button className='bg-base-color text-white' onClick={handleLogin}>
                Đăng Nhập
              </Button>
            </div>
            <div className='row d-flex justify-content-center my-3'>or</div>
            <div className='row' style={{ height: '4rem' }}>
              <div className='col-4'>
                <Button className='w-100' color='danger'>
                  <i className='fab fa-google'></i>
                  {' Google'}
                </Button>
              </div>
              <div className='col-4 px-0'>
                <Button className='w-100' color='primary'>
                  <i className='fab fa-facebook'></i>
                  {' Facebook'}
                </Button>
              </div>
              <div className='col-4'>
                <Button className='w-100' color='dark'>
                  <i className='fab fa-github mr'></i>
                  {' Github'}
                </Button>
              </div>
            </div>
            <div className='d-flex mt-3 justify-content-center'>
              <div className='text-muted'>Bạn chưa có tài khoản?</div>
              <Link to='/signup' className='text-primary'>
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BuyerLayoutFooter />
    </div>
  )
}

export default LoginBuyer
