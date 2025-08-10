import React from 'react'
import HeaderComponent from '../../../../components/UserComponent/PickleBallCourt/HeaderPickleComponent/HeaderPickleComponent';
import BookingDetailHandle from '../HandlePage/BookingDetail/BookingDetail';

const BookingDetail = () => {
  return (
    <>
      <HeaderComponent />
      <div style={{ 
        marginTop: "100px",
        maxWidth: '600px',
        padding: '0 8px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <BookingDetailHandle/>
      </div>
    </>
  )
}

export default BookingDetail