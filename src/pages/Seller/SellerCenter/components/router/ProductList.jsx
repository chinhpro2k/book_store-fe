import { useEffect, useState } from 'react'
import request from '../../../../../services/request'
import '../../style/productList.scss'
import toast from '../../../../../libs/Toast/Toast'
import helper from '../../../../../services/helper'

function ProductList() {
  useEffect(async () => {
   if (products.length===0){
     const res = await request.get('/api/product')
     if (res){
       if (res.products)
       {
         setProducts(res.products)
       }
     }
   }
  },[])
  const [products, setProducts] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [idDelete,setIdDelete]=useState(0)
  const [productEdit,setProductEdit]=useState({})
  const handleDelete = (id) => {
    setIdDelete(id)
    setIsDelete(true)
  }
  const handleEdit = (product) => {
    setProductEdit(product);
    setIsEdit(true);
  }
  const handleChanValue=(e,type)=>{
    if (type==='name'){
      let product={...productEdit};
      product.name=e.currentTarget.value;
      setProductEdit(product)
    }else {
      let product={...productEdit};
      product.price=e.currentTarget.value;
      setProductEdit(product)
    }
  }
  const handleDeleteProduct=async ()=>{
    const res = await request.delete('/api/product',{id:idDelete});
    if (res.error===0){
      toast.show("success","Xóa sp thành công")
      setIsDelete(false);
      let productClone=[...products];
      productClone.map((value,i)=>{
        if (value.id===idDelete){
          productClone.splice(i,1)
        }
      })
      setProducts(productClone);

    }
  }
  const handleEditProduct = async () => {
    const res=await request.put("/api/product/update",{
      id:productEdit.id,
      name:productEdit.name,
      price:productEdit.price
    })
    if (res.error===0){
      helper.toast('success', 'Chỉnh sửa thành công!')
      setIsEdit(false);
      let arr=[...products];
      products.map((value,i)=>{
        if (value.id===productEdit.id){
          arr[i].name=productEdit.name;
          arr[i].price=productEdit.price;
        }
      })
      setProducts(arr);
    }
  }
  if (products.length !== 0) {
    return (
      <div className='d-flex justify-content-center'>
        <div id='product-list' className='position-relative'>
          <div className='title d-flex justify-content-between'>
            <div className='name-price d-flex'>
              <p style={{ marginRight: '240px' }}>Sản phẩm</p>
              <p>Giá</p>
            </div>
            <div className='navigator'>
              <p>Chức năng</p>
            </div>
          </div>
          {products.map((value, i) => {
            return (
              <div className='product d-flex justify-content-between'>
                <div className='d-flex'>
                  <div className='image-product'>
                    {value.imageUrl?<img src={value.imageUrl}/>
                    :<></>}
                  </div>
                  <div className='name-product'>
                    {value.name}
                    {value.wareHouse?<p>Kho:{value.wareHouse.name}</p>:""}
                  </div>
                  <div className='price'>
                    {value.price}đ
                  </div>
                </div>
                <div className='btn-nav d-flex'>
                  <button onClick={()=>handleEdit(value)}>Chỉnh sửa</button>
                  <button onClick={() => handleDelete(value.id)}>Xóa</button>
                </div>
              </div>
            )
          })}


        </div>
        {isDelete &&
        <div>
          <div className='nen' onClick={()=>setIsDelete(false)}/>
          <div className='confirm-delete position-absolute'>
            <h2>Bạn có chắc muốn xóa sản phẩm này?</h2>
            <div className='btn-confirm d-flex justify-content-center'>
              <button onClick={()=>handleDeleteProduct()}>Có</button>
              <button onClick={()=>setIsDelete(false)}>Không</button>
            </div>
          </div>
        </div>}
        {isEdit&&<div>
          <div className="nen" onClick={()=>setIsEdit(false)}>
          </div>
          <div className="edit-product">
            <div className="title-edit">
              <p>Chỉnh sửa sản phẩm</p>
            </div>
            <div className="form-edit">
              <div className="name-product">
                <p>Tên sản phẩm</p>
                <input value={productEdit.name} placeholder="tên sản phẩm" onChange={(e)=>handleChanValue(e,'name')}/>
              </div>
              <div className="price">
                <p>Giá sản phẩm</p>
                <input value={productEdit.price} placeholder="giá sản phẩm" onChange={(e)=>handleChanValue(e,'price')}/>
              </div>
            </div>
            <div className="btn-confirm d-flex justify-content-center">
              <button onClick={()=>handleEditProduct()}>Xác nhận</button>
            </div>
          </div>
        </div>}
      </div>
    )
  } else {
    return (
      <div>
        <p>Vui lòng thêm sản phẩm</p>
      </div>
    )
  }

}

export default ProductList