import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormGroup, Input, Button } from 'reactstrap'
import BuyerLayoutFooter from 'common/footer/BuyerLayoutFooter'

import helper from 'services/helper'
import auth from 'services/auth'
import './signUpBuyer.scss'

function SignUpBuyer() {
  const history = useHistory()

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const handleSignUp = async () => {
    if (phone.length !== 10) return helper.toast('warning', 'Số điện thoại không hợp lệ')
    if (password.length < 6) return helper.toast('warning', 'Mật khẩu quá ngắn')
    if (password !== rePassword) return helper.toast('warning', 'Mật khẩu nhập lại không đúng')
    let signUpRes = await auth.signUp(phone, password, 'buyer')
    if (signUpRes?.error) return helper.toast('danger', signUpRes.msg)

    helper.toast('success', "SignUp success!! Let's login ")
    history.push('/login')
  }

  return (
    <div className='h-signup-buyer'>
      <div className='h-sb-header'>
        <Link to='/'>
          <div className='h-sb__logo'>ShopKi</div>
        </Link>
        <div className='h-sb__title'>Đăng Ký</div>
      </div>
      <div className='h-sb-container'>
        <div className='h-sb-content'>
          <div className='h-signup__title'>
            <div className='h-signup__brand'>ShopKi</div>
            <div className='h-signup__slogan'>Buy for your future</div>
          </div>
          <div className='h-signup__from'>
            <div className='row mb-4'>
              <h4 className=' d-flex justify-content-center'>Đăng Ký</h4>
            </div>
            <div className='row m-1 flex-shrink-0'>
              <FormGroup className='p-0 mb-3'>
                <Input
                  type='phone'
                  placeholder='Số điện thoại'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                />
              </FormGroup>
              <FormGroup className='p-0 mb-3'>
                <Input
                  type='password'
                  placeholder='Mật khẩu'
                  value={password}
                  onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                />
              </FormGroup>
              <FormGroup className='p-0 mb-3'>
                <Input
                  type='password'
                  placeholder='Nhập lại mật khẩu'
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value.replace(/\s/g, ''))}
                />
              </FormGroup>
              <Button className='bg-base-color text-white' onClick={handleSignUp}>
                Đăng Ký
              </Button>
            </div>
            <div className='row d-flex justify-content-center my-2'>or</div>
            <div className='row' style={{ height: '2.5rem' }}>
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
              <div className='text-muted'>Bạn đã có tài khoản?</div>
              <Link to='/login' className='text-primary'>
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BuyerLayoutFooter />
    </div>
  )
}

export default SignUpBuyer
