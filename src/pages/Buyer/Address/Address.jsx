import React, { useEffect } from 'react'
import './style.scss'
import { useState } from 'react'
import request from 'services/request'
import local from 'services/local'
import { Link } from 'react-router-dom'
import helper from 'services/helper';
const user = local.get('user')

function Address() {
    useEffect(() => {
        fetchAddress()
    }, [])

    const [addresses, setAddress] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [addressEdit, setAddressEdit] = useState()

    const fetchAddress = async () => {
        let res = await request.post("/api/address", { id:1})

        if(res == null) {
            console.log('khong tim dc')
        }
        setAddress(res)
        console.log(res)
    }
    const handleEdit = (address) => {
        setAddressEdit(address);
        setIsEdit(true);
    }
    const handleChanValue = (e) => {

        let addres = { ...addressEdit };
        addres.phone = e.currentTarget.value;
        setAddressEdit(addres);

    }
    const handleEditAddress = async () => {
        const res = await request.post("/api/address/update", {
            phone: addressEdit.phone,
            id: addressEdit.id
        })
        if (res.error===0){
            helper.toast('success', 'Chỉnh sửa thành công!')
            setIsEdit(false);
            let arr=[...addresses];
            addresses.map((value,i)=>{
              if (value.id===addressEdit.id){
                arr[i].phone=addressEdit.phone;
                
              }
            })
            setAddress(arr);
            // let address = addresses.filter(e => e.id===addressEdit.id)
            // address.phone = addressEdit.phone;
            // setAddress(address);
         }


    }
    const deleteAddress = (id) => {
        setAddress(addresses.filter((address) => address.id !== id));
        let address = request.post('/api/address/delete', { id: id })

        if (address) {
            helper.toast('success', 'xóa thanh cong')
            console.log('xóa thanh cong')//viet thong bao o day0
        } else console.log('da co loi xay ra') //thong bao loi cho nguoi dung

    }
    return (

        <div className="address__buyer">
            <div className="header">
                <Link to="/buyer/address/create" className="btn btn-success" > Tao địa chỉ mới</Link>
            </div>
            <ul className="address__list">
                {addresses.map((address) => (
                    <li className="address-item">
                        <div className="address-item-info">
                            <div className="name"><b>Tên người nhận :</b> {address.name}</div>
                            <div className="phone"><b>Số điện thoại :</b>                {address.phone}</div>
                            <div className="address"><b>Địa chỉ nhận hàng        : </b> {address.address}</div>
                        </div>
                        <div className="address-item-btn">
                            <button className="btn1 btn-success"
                                onClick={() => handleEdit(address)}
                            >Sửa</button>
                            <button className="btn1 btn-success"
                                onClick={() => deleteAddress(address.id)}
                            >Xóa</button>


                        </div>
                    </li>
                ))}



            </ul>
            {isEdit && <div>
                <div className="nen" onClick={() => setIsEdit(false)}>
                </div>
                <div className="edit-product">
                    <div className="title-edit">
                        <p>Chỉnh sửa sản phẩm</p>
                    </div>
                    <div className="form-edit">
                        <div className="name-product">
                            <p>Tên sản phẩm</p>
                            <input value={addressEdit.phone} placeholder="tên sản phẩm" onChange={(e) => handleChanValue(e)} />
                        </div>
                       
                    </div>
                    <div className="btn-confirm d-flex justify-content-center">
                        <button onClick={() => handleEditAddress()}>Xác nhận</button>
                    </div>
                </div>
            </div>}
        </div>

    )
}
export default Address