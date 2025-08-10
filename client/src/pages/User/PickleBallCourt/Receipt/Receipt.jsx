import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../../../components/UserComponent/PickleBallCourt/HeaderPickleComponent/HeaderPickleComponent';
import BookingDetailHandle from '../HandlePage/BookingDetail/BookingDetail';
import Receiptt from '../HandlePage/Receipt/Receipt';
import { getBookedCourt } from '../../../../services/users/BookingPickleBall/BookingPickleBall';

const Receipt = () => {
  const [ bookinginfo, setBookinginfo] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBookedCourt()
      if(res.status !== false) {
        setBookinginfo(res.data)
      }
    };
    fetchData()
  }, [])

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
        {bookinginfo ? (
          <Receiptt bookinginfo={bookinginfo}/>

        ) : (
          <p style={{ textAlign: "center", fontSize: "16px" }}>Đang tải thông tin hóa đơn...</p>
        )}
      </div>
    </>
  )
}

export default Receipt