import { useEffect } from 'react'
import '../style/forgotPassword.scss'
function ForgotPassword(props){
  useEffect(()=>{
    console.log(props)
  })
  return(
    <div id="forgot-password">
      <div className="header-forgot d-flex justify-content-between">
        <i onClick={()=>props.onChaneTypeForgot(false)} className="fas fa-chevron-left"/>
        <p>Đặt lại mất khẩu</p>
        <p></p>
      </div>
      <div className="form-forgot">
        <div className="user-name">
          <input className="w-100" placeholder="Nhập email và số điện thoại"/>
        </div>
        <div className="btn d-flex justify-content-center">
          <button>Tiếp theo</button>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword;