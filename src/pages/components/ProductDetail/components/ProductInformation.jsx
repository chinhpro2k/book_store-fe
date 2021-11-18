import '../style/productInformationStyle.scss'
import request from '../../../../services/request'
import helper from '../../../../services/helper'
import { useState } from 'react'
import local from '../../../../services/local'

function ProductInformation(props){

  const user = local.get('user')
  const [productItem, setProductItem] = useState()

  const handleAddToCart = async (id) => {

    await setProductItem(props.product)

    if (user) {
      const cart = await request.post('/api/cart/create', {
        shop: props.product.shop.name,
        img: props.product.img,
        product: props.product.name,
        price: props.product.price,
        quantity: 1,
        user_id: user.id
      })

      if (cart) {
        helper.toast('success', 'them gio hang thanh cong')
        console.log('them gio hang thanh cong')//viet thong bao o day0
      } else console.log('da co loi xay ra') //thong bao loi cho nguoi dung
    } else console.log('khong co user')
  }
  if (!props.loading){
    return(
      <div id="product-detail" className="container d-flex">
        <div className="image-product">
          {props.product.imageUrl?<img src={props.product.imageUrl}/>
            :<></>}
        </div>
        <div className="product-information">
          <div className="name-product">
            <h1>{props.product.name}</h1>
          </div>
          <div className="price">
            <p>Giá: {props.product.price} đ</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="btn-buy-now">
              <button>Mua ngay</button>
            </div>
            <div className="add-to-cart" onClick={()=>handleAddToCart(props.product.id)}>
              <i className="fas fa-cart-plus"></i>
            </div>
            <div className="favourite">
              <i className="fas fa-heart"></i>
            </div>
          </div>
          <div className="description">
            <h2>Mô tả sản phẩm</h2>
            <p>{props.product.description}</p>
          </div>
        </div>
        {props.product.shop&&<div className="shop-information d-flex">
          <div className="image-shop">
            {props.product.shop.img?<img src={props.product.shop.img}/>:""}
          </div>
          <div className="info">
            <p className="name-shop">{props.product.shop.name}</p>
            <div className="btn-nav">
              <button>Tham quan shop</button>
              <button>Yêu thích</button>
            </div>
          </div>
        </div>}
      </div>
    )
  }else {
    return (
      <div className="loading">
        <i className="fa fa-spinner fa-spin"/>
      </div>
    )
  }

}
export default ProductInformation;