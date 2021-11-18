import { useEffect, useState } from 'react'
import request from '../../../../../services/request'
import '../../style/warehouse.scss'
import { Link } from 'react-router-dom'
import helper from '../../../../../services/helper'
function WareHouse(){
  useEffect(async ()=>{
    const res=await request.get("/api/warehouse");
    setWarehouses(res.wareHouses);
  },[])

  const [warehouses,setWarehouses]=useState([]);
  const [nameEdit,setNameEdit]=useState("");
  const [addressEdit,setAddressEdit]=useState("");
  const [idEdit,setIdEdit]=useState(0);
  const handleShowFormEdit=(id,name,address)=>{
    setIdEdit(id);
    setNameEdit(name);
    setAddressEdit(address);
  }
  const handleEdit=async ()=>{
    const res=await request.post("/api/warehouse/edit",{
      id:idEdit,
      name:nameEdit,
      address:addressEdit
    })
    if (res){
      if (res.error===0){
        helper.toast('success', 'Update warehouse success!')
      }else helper.toast('danger', 'Update warehouse fail!')
    }
  }
  const handleDeleteWarehouse = async (id) => {
    const res=await request.delete("/api/warehouse",{
      id
    })
   if (res){
     if (res.error===0){
       helper.toast('success', 'Delete warehouse success!')
       let arr=[...warehouses];
       arr.map((value,i)=>{
         if (value.id===id)
         {
           arr.splice(i,1);
         }
       })
       setWarehouses(arr);
     }else {
       helper.toast('danger', 'Delete warehouse fail!')
     }
   }
  }

if (warehouses.length!==0){
  return(
    <div className="list-warehouse container justify-content-center">
      <h2 style={{marginBottom:"20px"}}>Vui lòng chọn kho!</h2>
      {warehouses.map((value,i)=>{
        return(
          <div className="warehouse d-flex justify-content-between align-items-center">
           <Link to={`/seller/home-center/warehouse/${value.id}`} className="d-flex">
             <div className="image">
             </div>
             <div className="infor">
               <div className="name">
                 {value.name}
               </div>
               <div className="address">
                 {value.address}
               </div>
             </div>
           </Link>
            <div className="btn-nav">
              <button onClick={()=>handleDeleteWarehouse(value.id)}>Xóa</button>
              <button onClick={()=>handleShowFormEdit(value.id,value.name,value.address)}>Sửa</button>
            </div>
          </div>
        )
      })}
      <Link to={"/seller/home-center/warehouse-create/add"} style={{width:"500px"}} className="d-flex justify-content-center">
        <i style={{fontSize:"30px",color:"#0d6efd",cursor:"pointer"}} className="fas fa-plus-circle"/>
      </Link>

      {idEdit!==0&&
      <div>
        <div className="nen">
        </div>
        <div className="popup-edit-warehouse">
          <h3>Sửa thông tin kho</h3>
          <div className="name d-flex">
            <p>Nhập tên:</p>
            <input value={nameEdit} placeholder="Vui lòng nhập tên" onChange={(e)=>setNameEdit(e.currentTarget.value)}/>
          </div>
          <div className="address d-flex">
            <p>Nhập địa chỉ:</p>
            <input value={addressEdit} placeholder="Vui lòng nhập địa chỉ" onChange={(e)=>setAddressEdit(e.currentTarget.value)}/>
          </div>
          <div className="btn-save d-flex justify-content-center">
            <button style={{marginRight:"12px"}} onClick={()=>handleEdit()}>Lưu lại</button>
            <button onClick={()=>setIdEdit(0)}>Hủy bỏ</button>
          </div>
        </div>
      </div>}
    </div>
  )
}else{
  return (
    <div className="no-warehouse">
      Vui lòng đăng ký kho <Link to={"/seller/home-center/warehouse-create/add"}>tại đây</Link>!
    </div>
  )
}
}

export default WareHouse;