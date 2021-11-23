import React, { useEffect } from 'react'
import './cart.scss'
import { useState } from 'react'
import request from 'services/request'
import helper from 'services/helper'
import local from 'services/local'
import { Button, Modal } from 'react-bootstrap'
import Select from 'react-select'
const user = local.get('user')
function Cart() {
  const [shipment, setShipment] = useState('')
  const [price, setPrice] = useState()
  const [address, setAddress] = useState('')
  const [listAddress, setListAddress] = useState([])
  const [carts, setCart] = useState([])
  const optionAddress = []
  useEffect(() => {
    const fetchCart = async () => {
      let res = await request.post('/api/cart/get-carts', { customerId: 1 })

      setCart(res)
      console.log(res)
    }
    fetchCart()
    const fetchListAddress = async () => {
      let res = await request.get('/api/customer/address', { id: user.customerId })
      res = res.address

      for (var i = 0; i < res.length; i++) {
        var labelOptions = res[i].district + ', ' + res[i].city
        optionAddress.push({
          value: res[i].id,
          label: labelOptions,
        })
      }

      setListAddress(optionAddress)
      console.log(optionAddress)
    }
    fetchListAddress()
  }, [])

  const optionsShipment = [
    { value: '1', label: 'Giao hàng nhanh' },
    { value: '2', label: 'Giao hàng tiết kiệm' },
    { value: '3', label: 'Giao hàng hỏa tốc' },
  ]

  const changeCart = (id, amount) => {
    let cartsNew = [...carts]
    let cartItem = cartsNew.find((cart) => cart.bookItemId === id)
    if (cartItem.quantity + amount === 0) return
    cartItem.quantity += amount
    setCart(cartsNew)
    let cart = request.post('/api/cart/save', {
      totalPrice: cartItem.quantity * cartItem.price,
      quantity: cartItem.quantity,
      bookItemId: cartItem.bookItemId,
      userId: 1,
      status: 1,
    })
  }

  const handleCreateShipment = async () => {
    if (shipment === '') {
      helper.toast('danger', 'nhập tên người nhận sản phẩm')
      return false
    }
    if (price === 0) {
      helper.toast('danger', 'Nhập số diện thoại người nhận sản phẩm')
      return false
    }
    if (address === '') {
      helper.toast('danger', 'Nhập địa chỉ nhận hàng')
      return false
    }

    const result = await request.post('/api/shipment1/create', {
      shipment: shipment,
      price: price,
      address: address,
    })
    if (result?.error) return helper.toast('danger', 'Create error')

    helper.toast('success', 'Create success')
  }
  const resetValue = () => {
    setShipment('')
    setPrice()
    setAddress('')
  }

  const deleteCart = (id) => {
    let cartItem = carts.find((cart) => cart.bookItemId === id)
    setCart(carts.filter((cart) => cart.bookItemId !== id))
    let cart = request.post('/api/cart/save', {
      totalPrice: cartItem.quantity * cartItem.price,
      quantity: cartItem.quantity,
      bookItemId: cartItem.bookItemId,
      userId: 1,
      status: 0,
    })
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const changeShipment = (event)=>{
    setShipment(event.label);
  }

  const changeAddress = (event)=>{
    setListAddress(event.label);
  }

  const createOrder = async()=>{
    const createShipment = await request.post("/api/shipment1/create", {
      shipment: shipment, price: 15000, address: address,
    })
    
    const createOrder = await request.post("/api/order/create", {
      cartId: 1, shipmentId: createShipment.id, status: 1, customerId: user.customerId
    })

    setShow(false)
    window.location.href= "/book";
  }

  return (
    <div className='cart_buyer'>
      <div className='cart__header'>
        <div className='cart__header-item1'>Sản phẩm</div>
        <div className='cart__header-item2'>Đơn Giá</div>
        <div className='cart__header-item3'>Số Lượng</div>
        <div className='cart__header-item4'>Số Tiền</div>
        <div className='cart__header-item5'>Thao Tac</div>
      </div>

      <div className='cart__body'>
        <ul className='cart__list'>
          {carts.map((cart) => (
            <li className='cart__item'>
              <div className='cart__item-header'>
                <p className='cart__item-tenshop'>{cart.shop}</p>
              </div>
              <div className='cart__item-body'>
                <div className='cart__item-info'>
                  <img src={cart.img} alt={cart.img} className='cart__item-img' />
                  <p className='Cart__item-name'>{cart.title}</p>
                </div>
                <div className='cart__item-dongia'>{cart.price}</div>
                <div className='cart__item-soluong'>
                  <button className='btn btn-success ' onClick={() => changeCart(cart.id, -1)}>
                    <i class='fas fa-minus'></i>
                  </button>
                  <p className='cart__item-soluong-text'>{cart.quantity}</p>
                  <button className='btn btn-success' onClick={() => changeCart(cart.id, +1)}>
                    <i class='fas fa-plus'></i>
                  </button>
                </div>
                <div className='cart__item-sotien'>{cart.quantity * cart.price}</div>
                <div className='cart__item-thaotac'>
                  <button
                    type='button'
                    onClick={() => deleteCart(cart.id)}
                    className='btn btn-success'
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='btn cart_footer btn-success'>
        <Button className='btn-order' variant='primary' onClick={handleShow}>
          Thanh toán
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='create-add'>
            <div className='form-create-add'>
              <h2 style={{fontSize: '1.25rem'}}>Hình thức giao hàng</h2>
              <div className="mb-2">
                <Select options={optionsShipment} placeholder="Hình thức giao hàng" onChange={changeShipment}/>
              </div>
              <div className="mb-2">
                <Select options={listAddress} placeholder="Địa chỉ" onChange={changeAddress}/>
              </div>
              <h3 style={{fontSize: '1.25rem'}}>Giá: 15.000 vnđ</h3>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Đóng
          </Button>
          <Button variant='primary' onClick={createOrder}>
            Thanh toán
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Cart
