import { useEffect, useState } from 'react'
import request from '../../../../../services/request'
import '../../style/coupon.scss'
import helper from '../../../../../services/helper'

function Coupon() {
  const [listVoucher, setListVoucher] = useState([])
  const [addVoucher,setAddVoucher]=useState(false);
  const [nameVoucher,setNameVoucher]=useState('');
  const [descriptionVoucher,setDescriptionVoucher]=useState('');
  useEffect(async () => {
    const res = await request.get('/api/voucher')
    if (res) {
      setListVoucher(res.vouchers)
    }
  })
  const handleCreateVoucher=async ()=>{
    if (nameVoucher===""){
      return false;
    }
    if (descriptionVoucher===""){
      return false;
    }
    const res=await request.post("/api/voucher/create",{
      name:nameVoucher,
      description:descriptionVoucher
    })
    if (res){
      if (res.error===0){
        helper.toast('success', 'Create voucher success!')
      }else {
        helper.toast('danger', 'Create voucher fail!')
      }
    }
  }
  const handleDeleteVoucher=async (id)=>{
    const res=await request.delete('/api/voucher',{
      id:id
    })
    if (res){
      if (res.error===0){
        helper.toast('success', 'delete voucher success!')
      }else {
        helper.toast('danger', 'delete voucher fail!')
      }
    }
  }
  if (listVoucher.length !== 0) {
    return (
      <div>
        <h2>Danh sach voucher</h2>
        {listVoucher.map((value, i) => {
          return (
            <div>
              <div className='voucher d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                  <div className='image'>
                  </div>
                  <div className='infor'>
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}> {value.name}</p>
                    <p> {value.description}</p>
                  </div>
                </div>
                <div className='btn-direct d-flex'>
                  <button onClick={()=>handleDeleteVoucher(value.id)}>Xóa</button>
                  <button>Sửa</button>
                </div>
              </div>

            </div>
          )
        })}
        <div className='add-coupon d-flex justify-content-center'>
          <i style={{ fontSize: '30px', color: '#0d6efd', cursor: 'pointer' }} className='fas fa-plus-circle' onClick={()=>setAddVoucher(true)}/>
        </div>
        {addVoucher&&<div>
          <div className="nen"/>
          <div className="form-create ">
            <h2>Thêm voucher</h2>
            <div className="name-voucher d-flex" >
              <p>Nhập tên:</p>
              <input placeholder={"Nhập tên voucher"} onChange={(e)=>setNameVoucher(e.currentTarget.value)}/>
            </div>
            <div className="name-voucher d-flex" >
              <p>Nhập description:</p>
              <input placeholder={"Nhập description"} onChange={(e)=>setDescriptionVoucher(e.currentTarget.value)}/>
            </div>
            <div className="btn-direct d-flex justify-content-center">
              <button onClick={()=>handleCreateVoucher()}>Thêm</button>
              <button onClick={()=>setAddVoucher(false)}>Hủy bỏ</button>
            </div>
          </div>
        </div>}
      </div>
    )
  } else {
    return (
      <div>
       <p style={{color:"#0d6efd",cursor:"pointer",fontSize:"20px"}} onClick={()=>setAddVoucher(true)}> Tạo voucher ngay!</p>
        {addVoucher&&<div>
          <div className="nen"/>
          <div className="form-create ">
            <h2>Thêm voucher</h2>
            <div className="name-voucher d-flex" >
              <p>Nhập tên:</p>
              <input placeholder={"Nhập tên voucher"} onChange={(e)=>setNameVoucher(e.currentTarget.value)}/>
            </div>
            <div className="name-voucher d-flex" >
              <p>Nhập description:</p>
              <input placeholder={"Nhập description"} onChange={(e)=>setDescriptionVoucher(e.currentTarget.value)}/>
            </div>
            <div className="btn-direct d-flex justify-content-center">
              <button onClick={()=>handleCreateVoucher()}>Thêm</button>
              <button onClick={()=>setAddVoucher(false)}>Hủy bỏ</button>
            </div>
          </div>
        </div>}
      </div>
    )
  }

}

export default Coupon