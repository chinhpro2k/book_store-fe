
import React, { useEffect } from 'react'
import './address.scss'
import { useState } from 'react'
import helper from 'services/helper'
import request from 'services/request'
import local from 'services/local'
const user = local.get('user')
function Shipment(props) {

    const [shipment, setShipment] = useState('')
    const [price, setPrice] = useState()
    const [address, setAddress] = useState('')
    const [listAddress, setListAddress] = useState([])
    useEffect(()=>{
        const fetchListAddress = async() =>{
          let res = await request.post('/api/address' , {id : user.id})
          
          
          setListAddress(res)
          console.log(res)
            }
            fetchListAddress()
      },[])

   

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

        const result = await request.post("/api/shipment1/create", {
            shipment: shipment, price: price, address: address,

        })
        if (result?.error) return helper.toast('danger', 'Create error')

        helper.toast('success', 'Create success')


    }
    const resetValue = () => {
        setShipment('')
        setPrice()
        setAddress('')
    }
    return (
        <div className="create-add">
            <div className="form-create-add">
                <h2>Hình thức giao hàng</h2>
                <div class="dropdown show">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Shipment
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <div class="dropdown-item" href="#" onClick={}>Giao hàng nhanh  </div>
                        <div class="dropdown-item" href="#">Giao hàng tiết kiệm</div>
                        <div class="dropdown-item" href="#">Giao hàng hỏa tốc</div>
                    </div>
                </div>
                <div class="dropdown show">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Địa chỉ nhận hàng 
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {listAddress.map((value,i)=>{
                            return (
                                <div>
                                    <div>{value.phone}</div>
                                    <div>{value.city} {value.disctrict} {value.street}</div>
                                </div>
                                
                            )
                        })}
                    </div>
                </div>
             
            </div>
            <div className="btn-create-add" onClick={() => handleCreateAddress()}>
                <button>Hoàn Thành</button>
            </div>

        </div>
    )
}
export default Shipment