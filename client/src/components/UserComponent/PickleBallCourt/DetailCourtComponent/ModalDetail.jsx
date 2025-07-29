import React from 'react';
import { Modal, Row, Col, Button } from 'antd';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { generateCourtBookingData } from '../../../../services/users/BookingPickleBall/BookingPickleBall';

const BookingModal = ({ isModalOpen, showModal, handleOk, handleCancel, selectedCourts, timeStart, timeEnd }) => {

  const bookingdata = generateCourtBookingData(selectedCourts, timeStart, timeEnd)


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
      <Button onClick={showModal} style={{ width: "65%", padding: "25px" }} color="default" variant="solid">
        <FaRegCalendarAlt /> Đặt sân ngay
      </Button>

      <Modal
        title="THANH TOÁN"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div>
          <Row>
            <Col span={8} style={colHeaderStyle}>Tên sân</Col>
            <Col span={4} style={colHeaderStyle}>Giờ vào</Col>
            <Col span={4} style={colHeaderStyle}>Giờ ra</Col>
            <Col span={8} style={colHeaderStyle}>Giá</Col>
          </Row>
        </div>

        {bookingdata.map((item, idx) => (
          <Row key={idx}>
            <Col span={8} style={colCellStyle}>{item.name}</Col>
            <Col span={4} style={colCellStyle}>{item.timeStart}</Col>
            <Col span={4} style={colCellStyle}>{item.timeEnd}</Col>
            <Col span={8} style={colCellStyle}>{item.price}</Col>
          </Row>
        ))}

        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '16px', marginTop: '20px', marginRight: '20px' }}>
          Tổng giá: 270.000
        </div>
      </Modal>
    </div>
  );
};

const colHeaderStyle = {
  fontWeight: 'bold',
  fontSize: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '40px',
};

const colCellStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default BookingModal;
