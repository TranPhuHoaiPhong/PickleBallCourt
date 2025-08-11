import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getBookedCourt } from '../../../../../services/users/BookingPickleBall/BookingPickleBall';

const Receiptt = ({bookinginfo}) => {
  const data = bookinginfo

  const [expanded, setExpanded] = useState(null)


  const sortedBookings = [...data].sort(
    (a, b) => new Date(b.startTime) - new Date(a.startTime)
  )

  const formatTimeRange = (startISO, endISO) => {
    const start = new Date(startISO)
    const end = new Date(endISO)

    const dateStr = start.toLocaleDateString('vi-VN')
    const startHour = start.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    const endHour = end.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

    return `${dateStr}: ${startHour} => ${endHour}`
  }

  const getVietnamNow = () => {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    return new Date(utc + 7 * 3600000)
  }

  const handleCancelBooking = (id) => {
    console.log("Đã gửi yêu cầu hủy đơn với ID:", id)
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h2 style={{ fontSize: "20px"}}>🧾 Danh sách hóa đơn đặt sân</h2>
      {sortedBookings.map((booking, index) => {
        const bookingStart = new Date(booking.startTime)
        const nowVN = getVietnamNow()
        const isExpired = nowVN >= bookingStart

        return (
          <div
            key={booking._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              padding: 15,
              marginBottom: 10,
              backgroundColor: '#f9f9f9',
              fontSize: "16px"
            }}
          >
            <div
              onClick={() => setExpanded(expanded === index ? null : index)}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>⏱ {formatTimeRange(booking.startTime, booking.endTime)}</span>
              <span>{expanded === index ? '▲ Thu gọn' : '▼ Xem chi tiết'}</span>
            </div>

            {expanded === index && (
              <div style={{ marginTop: 10 }}>
                <p><strong>Mã đơn:</strong> {booking._id}</p>
                <p><strong>Tên người đặt:</strong> {booking.name}</p>
                <p><strong>Số điện thoại:</strong> {booking.phone}</p>
                <p><strong>Trạng thái:</strong> {booking.status === 'booked' ? 'Đã đặt' : 'Đã hủy'}</p>
                <p><strong>Tổng tiền:</strong> {booking.totalPrice.toLocaleString()} VND</p>

                {booking.status === 'booked' && !isExpired && (
                  <button
                    style={{
                      marginTop: 10,
                      padding: '8px 16px',
                      backgroundColor: '#e53935',
                      color: 'white',
                      border: 'none',
                      borderRadius: 5,
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    Hủy đơn
                  </button>
                )}

                {isExpired && (
                  <p style={{ color: 'red', fontStyle: 'italic' }}>
                    
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Receiptt
