import { useEffect, useState } from 'react'
import request from '../../../../../services/request'
import '../../style/warehouseDetail.scss'
import { Link } from 'react-router-dom'
import toast from '../../../../../libs/Toast/Toast'

function WarehouseDetail(props) {
  useEffect(async () => {
    const res = await request.get(`/api/warehouse/detail?id=${props.match.params.id}`)
    if (res) {
      setWarehouse(res.warehouse)
    }
  }, [])
  const [warehouse, setWarehouse] = useState({})
  const exportProduct = async (id) => {
    const res = await request.post('/api/warehouse/export', {
      id
    })
    if (res) {
      toast.show('success', 'Xuất thành công!')
      let arr
      arr = { ...warehouse }
      arr.products.map((value, i) => {
        if (value.id === id) {
          value.export = true
        }
      })
      setWarehouse(arr)
    }
  }
  const handleDeleteProduct = async (id) => {
    const res = await request.delete('/api/product', { id: id })
    if (res) {
      toast.show('success', 'Xóa sp thành công')
      let arr
      arr = { ...warehouse }
      arr.products.map((value, i) => {
        if (value.id === id) {
          arr.products.splice(i, 1)
        }
      })
      setWarehouse(arr)
    }
  }
  return (
    <div id={'warehouse-detail'} className='container'>
      <div className=' d-flex justify-content-center'>
        <h2>XIN CHÀO ĐẾN VỚI KHO {warehouse.name}!</h2>
      </div>
      <div>
        <div style={{ marginBottom: '20px' }} className='btn-nav'>
          <Link to={`/seller/home-center/warehouse`}>Quay lại</Link>
          <Link to={`/seller/home-center/product/add/ware/${warehouse.id}`}>Nhập hàng</Link>
        </div>
        <div>
          <p>Danh sách sản phẩm trong kho</p>
          {(warehouse.products && warehouse.products.length !== 0) ? warehouse.products.map((value, i) => {
            return (
              <div className='product d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <div className='img-product'>
                    {value.imageUrl ? <img src={value.imageUrl} /> : <div />}
                  </div>
                  <div className='info'>
                    <div className='name'>
                      <p>{value.name}</p>
                    </div>
                    <div className='price'>
                      <p>Giá:{value.price}</p>
                    </div>
                    <div>
                      {value.export ? <p style={{ color: '#1b9e3e' }}>Đã xuất hàng</p> :
                        <p style={{ color: '#0d6efd' }}>Chưa xuất hàng</p>}
                    </div>
                  </div>
                </div>
                <div className='btn-nav d-flex'>
                  <button onClick={() => handleDeleteProduct(value.id)}>Xóa</button>
                  <button>Sửa</button>
                  <button onClick={() => exportProduct(value.id)} disabled={value.export}>Xuất hàng</button>
                </div>
              </div>
            )
          }) : <div>Chưa có sản phẩm nào!</div>}
        </div>

      </div>
    </div>
  )
}

export default WarehouseDetail