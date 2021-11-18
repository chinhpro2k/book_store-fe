import React, { useEffect } from 'react'
import '../homeStyle/header.scss'
import { Link } from 'react-router-dom'
function Header(props) {
  useEffect(() => {
    console.log(props)
  })
  return (
    <div id='header-seller' className='header-seller'>
      <div className='container d-flex justify-content-between align-items-center'>
        <div className='logo'>
          <Link to='/'>
            {' '}
            <img src='/assets/images/logo-shopki.png' alt='banner' />
          </Link>
        </div>
        {/* <div className="login-register">
            <Link to="/seller/login"><button className="btn-login">Đăng nhập</button></Link>
          <Link to="/seller/register" ><button className="btn-register" >Đăng kí</button></Link>
        </div> */}
      </div>
      <h1 className='d-flex justify-content-center text-base-color'>Home Seller</h1>
    </div>
  )
}

export default Header
