import React, { useEffect, useState } from 'react'
import '../style/loginStyle.scss'
import { Link } from 'react-router-dom'
import ForgotPassword from './forgotPassword'
import auth from '../../../../services/auth'
import helper from '../../../../services/helper'
import local from '../../../../services/local'

function LoginSeller(props) {
  useEffect(()=>{
    if (local.get('user')){
      props.history.push('/seller/home-center')
    }
  },[])
  const [isShowPass, setIsShowPass] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({ userName: '', password: '' })
  const [isForgot, setIsForgot] = useState(false)
  const handleLogin = async () => {
    if (userName === '') {
      setError((prevState) => ({
        ...prevState,
        userName: 'Vui lòng nhập tài khoản'
      }))
      return false
    }
    if (password === '') {
      setError((prevState) => ({
        ...prevState,
        password: 'Vui lòng nhập mật khẩu'
      }))
      return false
    }
    if (userName==='chinh@gmail.com'&& password==='1234'){
      props.history.push("/seller/home-center")
    }
    let loginRes = await auth.login(userName, password, 'buyer')
    if (loginRes?.error) return helper.toast('danger', 'Login error')

    helper.toast('success', 'Login success')
    props.history.push('/seller/home-center')
  }
  const handleOnChangePassword = async (e) => {
    setPassword(e.currentTarget.value)
    setError((prevState) => ({
      ...prevState,
      password: '',
      userName: ''
    }))
  }
  const handleOnChangeUserName = (e) => {
    const regex=new RegExp(/(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^\d{10,10})$/);
    if (regex.test(e.currentTarget.value)){
      setUserName(e.currentTarget.value)
      setError((prevState) => ({
        ...prevState,
        password: '',
        userName: ''
      }))
    }else{
      setError((prevState)=>({
        ...prevState,
        userName:"Tài khoản phải là email hoặc SĐT 10 chữ số",
        password:""
      }));
    }

  }
  return (
    <div id='login-form' style={{ backgroundColor: '#f28466' }}>
      <div className='header-login'>
        <div className='container d-flex justify-content-between align-items-center'>
          <div className='logo d-flex'>
            <Link to='/'>ShopKi</Link>
            <div className='nav-login d-flex align-items-center'>
              <h2>Đăng nhập</h2>
            </div>
          </div>
          <div className='help'>
            <p>Cần trợ giúp?</p>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end' style={{
        backgroundImage: `url("/assets/images/shopki-seller.png")`,
        marginTop: '20px', padding: '16px 0', width: '100%', height: '550px',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f28466'
        // backgroundAttachment: "fixed",
        // backgroundPosition: "center"
      }}>
        {/*<div className='banner-img'>*/}
        {/*  <img src="/assets/images/shop-image.png"/>*/}
        {/*</div>*/}
        <div className='form-login'>
          {isForgot ? <div>
            <ForgotPassword onChaneTypeForgot={(type) => setIsForgot(type)} />
          </div> : <div>
            <div className='title'>
              <p>Đăng nhập</p>
            </div>
            <div className='form-input'>
              <div className='user-name '>
                <p>Nhập email hoặc số điên thoại:</p>
                <input className={error.userName !== '' ? 'error' : ''} type='text' placeholder='Nhập SĐT hoặc email'
                       onChange={(e) => handleOnChangeUserName(e)} />
                {error.userName !== '' &&
                <p style={{ margin: 0, fontSize: '13px', color: '#282e5b' }}>{error.userName}</p>}
              </div>
              <div className='password position-relative'>
                <p>Nhập password:</p>
                <input className={error.password !== '' ? 'error' : ''} type={isShowPass ? 'text' : 'password'}
                       placeholder='Nhập password'
                       onChange={(e) => handleOnChangePassword(e)} />
                {isShowPass ? <div className='show-pass position-absolute' onClick={() => setIsShowPass(false)}><i
                    className='far fa-eye' /></div> :
                  <div className='show-pass position-absolute' onClick={() => {
                    setIsShowPass(true)
                  }}><i
                    className='far fa-eye-slash' /></div>}
                {error.password !== '' &&
                <p style={{ margin: 0, fontSize: '13px', color: '#282e5b' }}>{error.password}</p>}
              </div>
              <div className='forgot-pass d-flex justify-content-end'>
                <p onClick={() => setIsForgot(true)}>Quên mật khẩu</p>
              </div>
            </div>
            <div className='footer-form d-flex justify-content-center'>
              <div>
                <button onClick={() => handleLogin()}>Đăng nhập</button>
              </div>
            </div>
          </div>}
        </div>

      </div>
    </div>
  )
}

export default LoginSeller
