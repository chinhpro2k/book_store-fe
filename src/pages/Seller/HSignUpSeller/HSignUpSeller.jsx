import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormGroup, Input, Button } from 'reactstrap'
import BuyerLayoutFooter from 'common/footer/BuyerLayoutFooter'
import classNames from 'classnames'

// import auth from 'services/auth'
import helper from 'services/helper'
import request from 'services/request'
import local from 'services/local'

import './hSignUpSeller.scss'

function HSignUpSeller(props) {
  const history = useHistory()
  const user = local.get('user')

  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState()
  const [shopName, setShopName] = useState('')
  const [shopAddress, setShopAddress] = useState('')

  useEffect(() => {
    if (!user) return history.push('/login')
  }, [])

  const handleSendMail = async () => {
    let res = await request.post('/api/auth/sendmail', {
      id: user.id,
      email: email,
    })
    if (res?.error === 1) return helper.toast('error', 'error send mail')
    helper.toast('success', 'OTP đã được gửi đến email của bạn \n Hãy nhập mã OTP')
    setCurrentStep(1)
  }

  const handleSendOTP = async () => {
    let res = await request.post('/api/auth/confirmOTP', {
      id: user.id,
      otp,
    })
    if (res?.error === 1) return helper.toast('error', 'Nhập sai mã OTP')
    helper.toast('success', 'Chính xác! Hãy nhập tên shop để hoành thành')
    setCurrentStep(2)
  }

  const handleCreateShop = async () => {
    let res = await request.post('/api/auth/createShop', {
      id: user.id,
      email,
      shopName,
      shopAddress,
    })
    if (res?.error === 1) return helper.toast('error', 'Loi')
  if (res){
    helper.toast('success', 'Tạo shop thành công')
    props.history.push('/seller/home-center')
  }else  helper.toast('danger', 'Đã có lỗi xảy ra')
  }

  return (
    <div className='h-signup-seller'>
      <div className='h-ss-header'>
        <h3
          className='h-ss__title'
          onClick={() => setCurrentStep(currentStep === 2 ? 0 : currentStep + 1)}
        >
          Đăng ký để trở thành người bán
        </h3>
      </div>
      <div className='h-ss-container'>
        <div className='h-step-container'>
          <div
            className={classNames(
              'h-step__item',
              { current: currentStep === 0 },
              { past: currentStep > 0 }
            )}
          >
            <div className='h-step__num'>1</div>
            <div className='h-step__name'>Nhập Email</div>
          </div>
          <div className={classNames('h-step__arrow', { past: currentStep > 0 })}>
            <div className='h-arrow'></div>
          </div>
          <div
            className={classNames(
              'h-step__item',
              { current: currentStep === 1 },
              { past: currentStep > 1 }
            )}
          >
            <div className='h-step__num'>2</div>
            <div className='h-step__name'>Xác Thực Email</div>
          </div>
          <div className={classNames('h-step__arrow', { past: currentStep > 1 })}>
            <div className='h-arrow'></div>
          </div>
          <div
            className={classNames(
              'h-step__item',
              { current: currentStep === 2 },
              { past: currentStep > 2 }
            )}
          >
            <div className='h-step__num'>3</div>
            <div className='h-step__name'>Tạo Tên Shop</div>
          </div>
        </div>
        <div className='h-ss-content'>
          <div
            className={classNames(
              'form-container',
              { 'toSlide-40': currentStep === 1 },
              { 'toSlide-80': currentStep === 2 }
            )}
          >
            <div className='h-signup__from'>
              <div className='row mb-4 mt-4'>
                <h4 className=' d-flex justify-content-center'>Vui lòng nhập email của bạn</h4>
              </div>
              <div className='row'>
                <p className=' d-flex justify-content-center align-center mb-0'>
                  Để tạo shop hãy cho chúng tôi biết email của bạn!!!
                </p>
              </div>
              <div className='row m-5 flex-shrink-0'>
                <FormGroup className='p-0 mb-5'>
                  <Input
                    type='email'
                    placeholder='Nhập Email của bạn'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <Button className='bg-base-color text-white' onClick={handleSendMail}>
                  Gửi mã OTP
                </Button>
              </div>
            </div>

            <div className='h-signup__from'>
              <div className='row mb-4 mt-4'>
                <h4 className=' d-flex justify-content-center'>Vui lòng nhập mã xác minh</h4>
              </div>
              <div className='row'>
                <p className=' d-flex justify-content-center align-center mb-2'>
                  Nhập mã xác minh được gửi đến email của bạn
                </p>
              </div>
              <div className='row m-5 flex-shrink-0'>
                <FormGroup className='p-0 mb-5'>
                  <Input
                    type='number'
                    placeholder='Nhập mã xác minh'
                    value={otp || null}
                    onChange={(e) => setOtp(e.target.value.replace(/[^\d]/g, ''))}
                  />
                </FormGroup>

                <Button className='bg-base-color text-white' onClick={handleSendOTP}>
                  Xác nhận
                </Button>
              </div>
            </div>

            <div className='h-signup__from'>
              <div className='row mb-4 mt-4'>
                <h4 className=' d-flex justify-content-center'>Hãy nhập tên Shop của bạn</h4>
              </div>
              <div className='row'>
                <p className=' d-flex justify-content-center align-center mb-0'>
                  Nhập tên và địa chỉ shop để hoàn thành việc tạo shop
                </p>
              </div>
              <div className='row m-5 flex-shrink-0'>
                <FormGroup className='p-0 mb-3'>
                  <Input
                    type='text'
                    placeholder='Nhập tến Shop của bạn'
                    value={shopName}
                    className='mb-3'
                    onChange={(e) => setShopName(e.target.value)}
                  />
                  <Input
                    type='text'
                    placeholder='Nhập địa chỉ Shop của bạn'
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                  />
                </FormGroup>

                <Button className='bg-base-color text-white' onClick={handleCreateShop}>
                  Hoàn thành
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BuyerLayoutFooter />
    </div>
  )
}

export default HSignUpSeller
