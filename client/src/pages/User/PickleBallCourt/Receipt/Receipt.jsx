import React from 'react'
import HeaderComponent from '../../../../components/UserComponent/PickleBallCourt/HeaderPickleComponent/HeaderPickleComponent';
import BookingDetailHandle from '../HandlePage/BookingDetail/BookingDetail';
import Receiptt from '../HandlePage/Receipt/Receipt';

const Receipt = () => {
  return (
    <>
      <HeaderComponent/>
      <div style={{ 
        marginTop: "100px",
        maxWidth: '600px',
        padding: '0 8px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <Receiptt/>
      </div>
    </>
  )
}

export default Receipt