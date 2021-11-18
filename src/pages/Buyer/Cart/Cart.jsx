import React, { useEffect } from 'react'
import './cart.scss'
import { useState } from 'react'
import request from 'services/request'
import local from 'services/local'
const user = local.get('user')
function Cart() {
  // const [carts, setCart] = useState(
  //   [
  //     {
  //       id: 1,
  //       shop: 'VTTH',
  //       img: "https://cf.shopee.vn/file/6760bf2461f3f8a43aaa7089e0f5eaf5_tn",
  //       product: 'sp duong da',
  //       price: 93000,
  //       quantity: 1,
  //     },
  //     {
  //       id: 2,
  //       shop: 'VTTH1',
  //       img: "https://cf.shopee.vn/file/6760bf2461f3f8a43aaa7089e0f5eaf5_tn",
  //       product: 'sp duong da1',
  //       price: 930001,
  //       quantity: 1,


  //     }
  //   ]
  // )

  const[carts,setCart] = useState([])
  useEffect(()=>{
    const fetchCart= async() =>{
      let res = await request.post('/api/cart' , {id : user.id})
      
      
      setCart(res)
      console.log(res)
        }
        fetchCart()
  },[])
  const changeCart = (id, amount) => {
  
    let cartsNew = [...carts]
    let cartItem = cartsNew.find((cart) => cart.id === id)
    if(cartItem.quantity+amount === 0) return 
    cartItem.quantity += amount
    setCart(cartsNew)
    let cart = request.post('/api/cart/update',{id:id, quantity:cartItem.quantity})


  }

  const deleteCart = (id) => {
    setCart(carts.filter((cart) => cart.id !== id));
    let cart = request.post('/api/cart/delete',{id:id})
  }

  

  return <div className="cart_buyer">
    <div className="cart__header">
      <div className="cart__header-item1">Sản phẩm</div>
      <div className="cart__header-item2">Đơn Giá</div>
      <div className="cart__header-item3">Số Lượng</div>
      <div className="cart__header-item4">Số Tiền</div>
      <div className="cart__header-item5">Thao Tac</div>

    </div>



    <div className="cart__body">
      <ul className="cart__list">
        {carts.map((cart) => (
          <li className="cart__item">
            <div className="cart__item-header">
              <p className="cart__item-tenshop">
                {cart.shop}
              </p>
            </div>
            <div className="cart__item-body">
              <div className="cart__item-info">
              <input type = "checkbox" className="cart__item-checkbox"></input>
                <img src={cart.img} alt={cart.img} className="cart__item-img" />
                <p className="Cart__item-name">{cart.product}</p>
              </div>
              <div className="cart__item-dongia">{cart.price}</div>
              <div className="cart__item-soluong">
                <button className="btn btn-success " onClick={
                  () => changeCart(cart.id, -1)
                }>
                  <i class="fas fa-minus"></i>
                </button>
                <p className="cart__item-soluong-text">{cart.quantity}</p>
                <button className="btn btn-success" onClick={
                  () => changeCart(cart.id, +1)
                }>

                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div className="cart__item-sotien">
                {
                  cart.quantity * cart.price
                }
              </div>
              <div className="cart__item-thaotac">
                <button type="button"
                  onClick={
                    () => deleteCart(cart.id)
                  }
                  className="btn btn-success">Xóa</button>
              </div>
            </div>
          </li>
        ))
        }
      </ul>
    </div>








  </div>
}

export default Cart

