import { useState } from 'react'

const CPLayout = () => {
  const [carts, setCarts] = useState(
    [
      {
        id: 1,
        nameShop: 'CDC',
        img: 'chinh',
        name: 'quan sip bede',
        price: 12000,
        quantity: 1
      },
      {
        id: 2,
        nameShop: 'vvvvv',
        img: 'chinh',
        name: 'chinhfffsgsdfg',
        price: 120000,
        quantity: 3
      }
    ]
  )
  const changeValue = (id) => {
    let arr = [...carts]
    arr.forEach((value, i) => {
      if (value.id === id) {
        arr[i].quantity++
      }
    })
    setCarts(arr)
  }
  return (
    <div>
      <div>
        {carts.map((value, i) => {
          return (
            <p onClick={() => changeValue(value.id)}>{value.quantity}</p>
          )
        })}
      </div>
    </div>
  )
}

export default CPLayout