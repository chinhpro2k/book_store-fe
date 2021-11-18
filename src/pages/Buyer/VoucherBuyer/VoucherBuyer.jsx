import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import request from 'services/request'
import './VoucherBuyer.scss'

function VoucherBuyer() {

  const[vouchers, setVoucher] = useState([])
  useEffect(() => {
    const fetchVoucher = async () =>{
      let res = await fetch('http://localhost:8080/api/voucher') 
      res = await res.json()
      setVoucher(res)
      console.log(res)
    }
    fetchVoucher()
    
  },[])





  return <div className="voucher">
    
       
     <ul className="voucher__list">
      {vouchers.map((voucher)=> (
         <li className="voucher__item">
         <a href="" className="voucher__item-link">
           
           <div className="voucher__item-img">
              <div className="voucher__item-img-name">{voucher.name}</div>
           </div>
           <div className="voucher__item-info">
               <p className="voucher__item-description">{voucher.description}</p>
               <p className="voucher__item-date">{voucher.date}</p>
           </div>
           <div className="voucher__item-button">
             <a className="voucher__item-apply">Dùng ngay</a>
             <a className="voucher__item-detail">Điều kiện</a>
           </div>
           
         </a>
         <div className="voucher__item-link-seen">
          
         </div>
    </li>
      ))}
      
      
       
       </ul>  
  </div>
}

export default VoucherBuyer