import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Monster from '../assets/lost.png'

const NotFoundPage = () => {
  return (
       <>
            <Navbar isLogin={false} />
            <main className="border center">
              <div className='container container-xs border paper lost'>
                <h3>Are you lost?</h3>
                <img src={Monster} alt="lost" />
              </div>
            </main>
        </>
  )
}

export default NotFoundPage;