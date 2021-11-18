import React, { useState } from 'react'
import './signUpStyle.scss'
import { Link } from 'react-router-dom'
import helper from '../../../services/helper'

function SignUpSeller() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowRePass, setIsShowRePass] = useState(false)
  const [error, setError] = useState({ userName: '', password: '', rePassword: '' })
  const [notify,setNotify]=useState("")
  const resetError = async () => {
    setError((prevState) => ({
        ...prevState,
        userName: '',
        password: '',
        rePassword: ''
      })
    )
  }
  const handleRegister = async () => {
    if (userName===''){
      setError((prevState)=>({
        ...prevState,
        userName:"Vui lòng nhập tài khoản",
        password:"",
        rePassword:""
      }));
      return false;
    }
    if (password===""){
      setError((prevState)=>({
        ...prevState,
        password:"Vui lòng nhập mật khẩu",
        userName:"",
        rePassword:""
      }));
      return false;
    }
    if (rePassword===""){
      setError((prevState)=>({
        ...prevState,
        password:"",
        userName:"",
        rePassword:"Vui lòng nhập lại mật khẩu"
      }));
      return false;
    }
    if (password!==rePassword){

     setNotify("Mật khẩu nhập lại không khớp")
      helper.toast('success', notify)
      return false;
    }
  }
  const handleOnChange=async (e,type)=>{
    switch (type){
      case "user-name":
        const regex=new RegExp(/(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^\d{10,10})$/);
        if (regex.test(e.currentTarget.value)){
          setUserName(e.currentTarget.value);
          await resetError()
        }else{
          setError((prevState)=>({
            ...prevState,
            userName:"Tài khoản phải là email hoặc SĐT 10 chữ số",
            password:"",
            rePassword:""
          }));
        }

        break;
      case "password":
        setPassword(e.currentTarget.value)
        await resetError()
        break;
      case "re-password":
        setRePassword(e.currentTarget.value)
        await resetError()
        break;
    }
  }
  return (
    <div id='register-form' style={{ backgroundColor: '#FFFFFF' }}>
      <div className='header-login'>
        <div className='container d-flex justify-content-between align-content-center'>
          <div className='logo d-flex '>
            <Link to='/seller'>ShopKi</Link>
            <div className='nav d-flex align-items-center'>
              <h2>Đăng ký</h2>/<Link to='/seller/login'>Đăng nhập</Link>
            </div>
          </div>
          <div className='help'>
            <p>Cần trợ giúp?</p>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center'
           style={{ backgroundImage: `url("/assets/images/background-đăng kí nhà bán.png")`, padding: '16px 0' }}>
        <div className='banner-img'>
          <img src='/assets/images/register-shop.png' alt='banner' />
        </div>
        <div className='form-login'>
          <div className='title'>
            <p>Đăng ký</p>
          </div>
          <div className='form-input'>
            <div className='user-name'>
              <p>Nhập email hoặc số điên thoại:</p>
              <input type='text' placeholder='Nhập SĐT hoặc email'
                     onChange={(e)=>handleOnChange(e,"user-name")} />
              {error.userName !== '' &&
              <p style={{ margin: 0, fontSize: '13px', color: '#f28466' }}>{error.userName}</p>}
            </div>
            <div className='password position-relative'>
              <p>Nhập password:</p>
              <input type={isShowPass ? 'text' : 'password'} placeholder='Nhập password'
                     onChange={(e)=>handleOnChange(e,"password")}/>
              {isShowPass ? <div className='show-pass position-absolute' onClick={() => setIsShowPass(false)}><i
                  className='far fa-eye' /></div> :
                <div className='show-pass position-absolute' onClick={() => setIsShowPass(true)}><i
                  className='far fa-eye-slash' /></div>}
              {error.password !== '' &&
              <p style={{ margin: 0, fontSize: '13px', color: '#f28466' }}>{error.password}</p>}
            </div>
            <div className='re-password position-relative'>
              <p>Nhập lại password:</p>
              <input type={isShowRePass ? 'text' : 'password'} placeholder='Nhập lại password'
                     onChange={(e)=>handleOnChange(e,"re-password")}/>
              {isShowRePass ? <div className='show-pass position-absolute' onClick={() => setIsShowRePass(false)}><i
                  className='far fa-eye' /></div> :
                <div className='show-pass position-absolute' onClick={() => setIsShowRePass(true)}><i
                  className='far fa-eye-slash' /></div>}
              {error.rePassword !== '' &&
              <p style={{ margin: 0, fontSize: '13px', color: '#f28466' }}>{error.rePassword}</p>}
            </div>
          </div>
          <div className='footer-form'>
            <div>
              <button onClick={() => handleRegister()}>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpSeller
