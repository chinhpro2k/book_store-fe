import helper from '../../../../../services/helper'
import request from '../../../../../services/request'
import { useState } from 'react'
import '../../style/createWarehouseStyle.scss'
import { Link } from 'react-router-dom'

function CreateWarehouse(){

  const [nameWarehouse,setNameWarehouse]=useState("");
  const [addressWarehouse,setAddressWarehouse]=useState("");
  const handleCreateWarehouse=async ()=>{
    if (nameWarehouse===""){
      helper.toast('danger', 'Input name!')
      return false;
    }
    if (addressWarehouse===""){
      helper.toast('danger', 'Input address!')
      return false;
    }
    const res=await request.post('/api/warehouse/create',{
      name:nameWarehouse,
      address:addressWarehouse
    })
    if (res){
      if (res.error===0){
        helper.toast('success', 'Create success!')
      }
    }
  }
  return(
    <div className="container d-flex justify-content-center">
      <div className="form-warehouse">
        <div>
          <div className="name">
            <p>Tên:</p>
            <input placeholder="nhập tên nhà kho" onChange={(e)=>setNameWarehouse(e.currentTarget.value)}/>
          </div>
          <div className="address">
            <p>Địa chỉ:</p>
            <input placeholder="nhập địa chỉ" onChange={(e)=>setAddressWarehouse(e.currentTarget.value)}/>
          </div>
        </div>
        <div className="btn-register d-flex justify-content-center">
          <button onClick={()=>handleCreateWarehouse()}>
            Đăng ký
          </button>
          <Link className="btn-link" to={"/seller/home-center/warehouse"}>
            Quay lại
          </Link>
        </div>
      </div>

    </div>
  )
}

export default CreateWarehouse;