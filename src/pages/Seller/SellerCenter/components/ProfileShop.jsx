import '../style/profileShopStyle.scss'
function ProfileShop(props){
  return(
    <div id="profile-shop" className="d-flex flex-column justify-content-center align-items-center">
      <div className="image-shop d-flex justify-content-center align-items-center">
        {props.shop.img?<img src={props.shop.img}/>: <i className="fas fa-user"/>}
      </div>
      <div className="name w-100 text-center">
        <h2>{props.shop?.name}</h2>
        <div className="rank">
          <p>Shop chua co rank</p>
        </div>
        <div>
          {props.shop.active?<p style={{color:"#dc3545"}}>Shop đang tạm nghỉ ok :)</p>:<p/>}
        </div>
      </div>
    </div>
  )
}
export default ProfileShop;