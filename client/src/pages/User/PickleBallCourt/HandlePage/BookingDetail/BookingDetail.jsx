import React, { useEffect, useState } from 'react'
import InputField from "../../../../../components/UserComponent/PickleBallCourt/Component/InputComponent/InputComponent"
import { Button, Col, Row, Table } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { generateCourtBookingData } from '../../../../../services/users/BookingPickleBall/BookingPickleBall';
import { useNavigate } from 'react-router-dom';
import PaymentPage from './HandlePay';


const BookingDetailHandle = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState('');
    const location = useLocation();
    const { courtSelected, selectedTimeStart, selectedTimeEnd } = location.state || {};

    const {data, totalPrice} = generateCourtBookingData(courtSelected, selectedTimeStart, selectedTimeEnd)
    const price_booking = totalPrice * 0.2

    useEffect(() => {
        const now = new Date();
        const formattedTime = now.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        });
        setCurrentTime(formattedTime);
    }, []);
    const user = useSelector(state => state.user)
    const { name, phone } = user

    const [namee, setName] = useState(name)
    const [phonee, setPhone] = useState(phone);

    const handleNameChange = (value) => {
        setName(value)
    }

    const handlePhoneChange = (value) => {
        setPhone(value)
    };
    const [showPayment, setShowPayment] = useState(false);

    const handlePayment = (value) => {
        setShowPayment(true);
    }




    const columns = [
        {
        title: 'Tên sân',
        dataIndex: 'name',
        key: 'name',
        },
        {
        title: 'Giờ vào',
        dataIndex: 'timeStart',
        key: 'timeStart',
        },
        {
        title: 'Giờ ra',
        dataIndex: 'timeEnd',
        key: 'timeEnd',
        },
        {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        render: (text) => `${text.toLocaleString()} đ`,
        },
    ];


  return (
    <>
        <div style={{padding: "10px"}}>
        <div style={{ marginBottom: "25px", fontSize: "25px"}}>
            <h2 style={{textAlign: "center"}}>HÓA ĐƠN TẠM TÍNH</h2>
        </div>
        <Row>
            <Col span={24}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px"}}>
                <span style={{fontSize: "16px"}}>Thông tin người đặt sân</span>
                <span>{currentTime}</span>
            </div>
            <div>
                <InputField
                label="Tên"
                type="name"
                value={namee}
                setValue={setName}
                handleOnchange={handleNameChange}
                />
            </div>
            <div>
                <InputField
                label="Số điện thoại"
                type="phone"
                value={phonee}
                setValue={setPhone}
                handleOnchange={handlePhoneChange}
                />
            </div>

            <div style={{ marginTop: 24 }}>
                <Table columns={columns} dataSource={data} pagination={false} bordered />
                <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '16px', marginTop: '20px', marginRight: '20px' }}>
                Tổng giá: {totalPrice.toLocaleString()} đ
                </div>
            </div>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
                {/* <Button style={{ background: "black", height: "45px", width: "180px"}} type="primary" onClick={handlePayment}>
                    Thanh toán
                </Button> */}


                {!showPayment ? (
                    <Button
                        style={{ background: "black", height: "45px", width: "180px" }}
                        type="primary"
                        onClick={handlePayment}
                    >
                        Thanh toán
                    </Button>
                    ) : (
                    <PaymentPage namee={namee} phonee={phonee} totalPrice={price_booking} />
                    )}


            </div>
                
            </Col>
        </Row>
    </div>
    </>
  )
}

export default BookingDetailHandle