import React, { useState, useEffect } from 'react'
import helper from 'services/helper'
import local from 'services/local'
import request from 'services/request'
import './style.scss'
import { Link } from 'react-router-dom'

const user = local.get('user')

function ProfileBuyer() {
  const [profile, setProfile] = useState({})
  const [number, setNumber] = useState('')
  const [street, setStreet] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [numberphone, setNumberphone] = useState('')
  const [isChangeAddress, setIsChangeAddress] = useState(false)
  useEffect(() => {
    console.log(user)
    const fetchProfile = async () => {
      let res = await request.post('/api/customer/getById', { customerId: user.customerId })
      setProfile(res.customer)
      console.log('data', res)
    }
    fetchProfile()
  }, [])

  const handleChangeProfile = (key, value) => {
    let profileNew = { ...profile }
    profileNew[key] = value
    setProfile(profileNew)
  }
  const handleUpdateAddress = async () => {
    let res = await request.post('/api/customer/change/address',
      { uId: user.customerId, number: number, city, district, street, numberphone })
    if (res?.error == 0) {
      helper.toast('success', 'add address success')
    } else {
      helper.toast('danger', 'error')
    }
  }
  const handleClickSave = async () => {
    let res = await request.post('/user/update', {
      id: user.id,
      name: profile.name,
      gender: profile.gender,
      birthday: profile.birthday
    })
    if (res?.error == 0) {
      helper.toast('success', 'add address success')
    } else {
      helper.toast('danger', 'error')
    }

  }

  return (
    <div className='form'>
      <div className='content'>
        {/* ho so cua toi */}
        <div className='profile-name'>
          <dv>
            <h5>Hồ Sơ Của Tôi</h5>
            <p className='profile-p'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </dv>
          <div>
            <Link to='/'>Quay lại trang chủ</Link>
            <button onClick={()=>setIsChangeAddress(true)}>Thêm địa chỉ</button>
          </div>
        </div>

        {/* noi dung */}
        <div className='profile-content'>
          {/* label input */}
          <div className='profile-detail'>
            {/* ten dang nhap */}
            <div className='profile-label-text'>
              <label htmlFor='' className='profile-label'>
                Tên Đăng Nhập
              </label>
              <p className='profile-text'>{profile.name}</p>
            </div>
            {/* Ten */}
            <div className='profile-label-input'>
              <label htmlFor='' className='profile-label'>
                Tên
              </label>
              <input type='text' className='profile-input' placeholder='Thư Thư' value={profile?.name || ''}
                     onChange={(e) => handleChangeProfile('name', e.target.value)} />
            </div>

            {/* email */}
            <div className='profile-label-email'>
              <label htmlFor='' className='profile-label'>
                Email
              </label>
              <input value={profile?.email || ''}
                     onChange={(e) => handleChangeProfile('name', e.target.value)} />
              <p className='profile-input'>{profile?.email}</p>
            </div>

            {/* SĐT */}
            <div className='profile-label-email'>
              <label htmlFor='' className='profile-label'>
                Số Điện Thoại
              </label>
              <input value={profile?.email || ''}
                     onChange={(e) => handleChangeProfile('name', e.target.value)} />
              <p className='profile-input'>{profile?.email}</p>
              <p className='profile-input'>{profile?.phone}</p>

            </div>


            {/* giới tính */}
            <div className='profile-label-input'>
              <label htmlFor='' className='profile-label'>
                Giới tính
              </label>
              <form className='profile-gender'>
                <input checked={profile?.gender === 'nam' ? true : false} className='gender' name='gioitinh'
                       type='radio' value='Nam' onChange={(e) => handleChangeProfile('gender', 'nam')} />
                Nam
                <input checked={profile?.gender === 'nu' ? true : false} className='gender' name='gioitinh' type='radio'
                       value='Nữ' onChange={(e) => handleChangeProfile('gender', 'nu')} />
                Nữ
                <input checked={profile?.gender === 'khac' ? true : false} className='gender' name='gioitinh'
                       type='radio' value='Khác' onChange={(e) => handleChangeProfile('gender', 'khac')} />
                Khác
              </form>
            </div>

            {/* ngày sinh */}
            <div className='profile-birthday'>
              <label htmlFor='' className='profile-label'>
                Ngày sinh
              </label>
              <input type='date' className='day' placeholder='' />
            </div>

            <button type='button' class='btn btn-success'
                    onClick={handleClickSave}>
              Lưu
            </button>
          </div>
          {/* anh */}
          <div className='profile-img'></div>
        </div>
        {
          isChangeAddress&&
        <div>
          <div className="nen"/>
          <div className='popup-address'>
            <div className='d-flex'>
              <p>Số nhà</p>
              <input placeholder='nhập số nhà' onChange={(e) => setNumber(e.currentTarget.value)} />
            </div>
            <div className='d-flex'>
              <p>Phố</p>
              <input placeholder='nhập Phố' onChange={(e) => setStreet(e.currentTarget.value)} />
            </div>
            <div className='d-flex'>
              <p>Quận</p>
              <input placeholder='nhập quận' onChange={(e) => setDistrict(e.currentTarget.value)} />
            </div>
            <div className='d-flex'>
              <p>Thành phố</p>
              <input placeholder='nhập thành phố' onChange={(e) => setCity(e.currentTarget.value)} />
            </div>
            <div className='d-flex'>
              <p>Số điện thoại</p>
              <input placeholder='nhập số điện thoại' onChange={(e) => setNumberphone(e.currentTarget.value)} />
            </div>
            <div>
              <button onClick={() => handleUpdateAddress()}>Thêm</button>
              <button onClick={() => setIsChangeAddress(false)}>Cancel</button>
            </div>
          </div>
        </div>
        }

      </div>
    </div>
  )
}

export default ProfileBuyer
