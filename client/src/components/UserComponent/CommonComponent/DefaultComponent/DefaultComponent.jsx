import React from 'react'
import HeaderComponent from '../../PickleBallBrand/HeaderComponent/HeaderComponent'

function DefaultComponent({ children }) {
  return (
    <div>
        <HeaderComponent/>
        {children}
    </div>
  )
}

export default DefaultComponent