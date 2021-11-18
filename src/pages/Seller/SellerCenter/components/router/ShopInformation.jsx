import { useEffect, useState } from 'react'
import local from '../../../../../services/local'
import request from '../../../../../services/request'
import '../../style/shopInformation.scss'
import helper from '../../../../../services/helper'
function ShopInformation() {
  const [shop, setShop] = useState({})
  const [typeEdit,setTypeEdit]=useState("");
  const user = local.get('user')
  useEffect(async () => {
    if (user) {
      const res = await request.get(`/api/shop?id=${user.shop_id}`)
      if (res) {
        setShop(res.shop)
      }
    }
  }, [])
const handleClickEdit = (type) => {
  setTypeEdit(type);
}
const handleChange = (e,type) => {
    let obj={...shop};
  if (type==="name"){
    obj.name=e.currentTarget.value;
    setShop(obj)
  }else if (type==="address"){
    obj.address=e.currentTarget.value;
    setShop(obj)
  }else if (type==="img"){
    obj.img=e.currentTarget.value;
    setShop(obj)
  }
}
const handleUnActiveShop=async (idShop)=>{
   if (shop){
     const res=await request.put('/api/shop/unActive',{
       id:idShop
     })
     if (res){
       if (res.error===0){
         helper.toast('success', 'Update success!')
       }else helper.toast('danger', 'fail!')
     }
   }
}

  const handleActiveShop=async (idShop)=>{
    if (shop){
      const res=await request.put('/api/shop/active',{
        id:idShop
      })
      if (res){
        if (res.error===0){
          helper.toast('success', 'Update success!')
        }else helper.toast('danger', 'fail!')
      }
    }
  }
const handleEditShop = async () => {
  const res=await request.post('/api/shop/edit',{
    id:shop.id,
    name:shop.name,
    address:shop.address,
    img:shop.img
  })
  if (res){
    helper.toast('success', 'Update success!')
  }
}
  return (
    <div id={"shop-info"} className='container d-flex justify-content-center'>
      <div>
        <h2>Thông tin của shop</h2>
        <div className='form'>
          <div className='item d-flex'>
            <p>Tên shop</p>
            <input disabled={typeEdit!=="name"} value={shop.name?shop.name:''} onChange={(e)=>handleChange(e,"name")}/>
            {typeEdit===""?<button onClick={()=>handleClickEdit("name")}>Sửa</button>:<button onClick={()=>handleClickEdit("")}>Hủy</button>}
          </div>
          <div className='item d-flex'>
            <p>Địa chỉ</p>
            <input disabled={typeEdit!=="address"} value={shop.address?shop.address:''}  onChange={(e)=>handleChange(e,"address")}/>
            {typeEdit===""?<button onClick={()=>handleClickEdit("address")}>Sửa</button>:<button onClick={()=>handleClickEdit("")}>Hủy</button>}
          </div>
          <div className='item d-flex'>
            <p>imageUrl</p>
            <input disabled={typeEdit!=="img"} value={shop.img?shop.img:''}  onChange={(e)=>handleChange(e,"img")}/>
            {(typeEdit==="")?<button onClick={()=>handleClickEdit("img")}>Sửa</button>:<button onClick={()=>handleClickEdit("")}>Hủy</button>}
          </div>
        </div>
        <div className="btn-save d-flex justify-content-center">
          <button onClick={()=>handleEditShop()}>Lưu lại</button>
          {shop.active?<button onClick={()=>handleActiveShop(shop.id)}>Hoạt động</button>:<button onClick={()=>handleUnActiveShop(shop.id)}>Tạm nghỉ</button>}
        </div>
      </div>
    </div>
  )
}

export default ShopInformation