
import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-16 ml-7 ' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjh4mBSyhx84yY3fSUSCZaKolesHOd3GUHfgzuXsO2ftgeIIez6QW4gu1x_UY6CPNccJD2pj3XEFND9Nc3-K6epdPMjm11Mughs60ALI1rVJb40v5RnK5auxjMxIlUiaLqGg3_SkW-5_EAJcI2_1eW8vLCT3lLEhss5apWno8QXG2g_g1QHk6A8s33eD9c/s1024/ChatGPT%20Image%20May%2024,%202025,%2004_52_30%20PM.pngl" alt="" />
        <div className='bg-white pb-8 py-4 px-4'>
          <h2 className='text-[30px] font-semibold'>Get Started with NexTrip</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start