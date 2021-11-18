import React from 'react'
import './Style.scss'
function PasswordBuyer() {
  return (
    <div className="container-passBuyer">
      <div className="content-passBuyer">
        {/* div doi mat khau */}
        <div className="h-passBuyer">
          <h5 className="h-passBuyer__heading">Đổi Mật Khẩu</h5>
          <p className="h-passBuyer__text">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
        </div>

        {/* div form */}
        <div className="form-passBuyer">
          {/* pass hien tai */}
          <div className="form-passBuyer__currentPass">
          
              <label htmlFor="" className="label">Mật Khẩu Hiện Tại</label>
              <input type="password" className="passInput" />
            

            {/* <div className="forgotPass-link">
              <a href="./ForgotPassBuyer.jsx" className="link">Quên Mật Khẩu?</a>
            </div> */}

          </div>



          {/* pass ms */}
          <div className="form-passBuyer__newPass">
            <label htmlFor="" className="label">Mật Khẩu Mới</label>
            <input type="password" className="passInput" />
          </div>

          {/* pass xac nhan */}
          <div className="form-passBuyer__confirmPass">
            <label htmlFor="" className="label">Xác Nhận Mật Khẩu</label>
            <input type="password" className="passInput" />
          </div>

          <button className="form-passBuyer__no-confirm ">Xác Nhận</button>

        </div>
      </div>

    </div>


  )
}

export default PasswordBuyer
