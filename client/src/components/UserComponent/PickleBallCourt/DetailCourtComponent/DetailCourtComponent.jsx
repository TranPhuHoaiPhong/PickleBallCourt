import React, { useState, useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import i1 from '../../../../assets/introduction/intro/image-product-court.jpg';
import i2 from '../../../../assets/introduction/intro/product1.webp';
import i3 from '../../../../assets/introduction/intro/product2.webp';
import i4 from '../../../../assets/introduction/intro/product3.jpg';
import { CiPhone } from "react-icons/ci";
import { Button, Col, Row, DatePicker, Modal } from 'antd';
import { CiMail } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import dayjs from 'dayjs';
import { useCourtSelection } from '../../../../pages/User/PickleBallCourt/HandlePage/DetailCourt/DetailCourt';
import SearchAndSelectCourts from './SearchAndSelect';
import BookingModal from "./ModalDetail"
import { useNavigate } from 'react-router-dom';
import { showError } from '../../CommonComponent/Message/Message';
import { useSelector } from 'react-redux';


function DetailCourtComponent({ dataCourt }) {
  const user = useSelector((state) => state.user);
  const { detailCourt, idCourt } = dataCourt;
  const [ courtSelected, setCourtSelected ] = useState();
  const [mainImage, setMainImage] = useState(detailCourt.imgs[0]);
  const img = detailCourt.imgs
  

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    selectedDate,
    selectedTimeStart,
    selectedTimeEnd,
    selectedCourts,
    onChangeDate,
    onRemoveCourt,
    disabledDate,
    itemsStart,
    itemsEnd,
    setSelectedTimeStart, 
    setSelectedTimeEnd,
  } = useCourtSelection();


  // Lấy ngày giờ hiện tại ở Việt Nam
const nowVN = new Date(
  new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
);
const nowHourVN = nowVN.getHours();

// Parse giờ mở/đóng từ detailCourt
const startHour = Number(detailCourt.openTime.split(":")[0]);
const endHour = Number(detailCourt.closeTime.split(":")[0]);

// Xác định selectedDate có phải là hôm nay ở VN không
const selectedDateVN = new Date(
  new Date(selectedDate).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
);
const isToday = selectedDateVN.toDateString() === nowVN.toDateString();

// Mảng giờ bắt đầu
const itemsStart1 = [];
for (let hour = startHour; hour <= endHour; hour++) {
  if (!isToday || hour >= nowHourVN) {
    itemsStart1.push({
      key: String(hour),
      label: `${hour}H`,
      value: String(hour),
    });
  }
}


// Mảng giờ kết thúc (lớn hơn giờ bắt đầu)
const itemsEnd1 = selectedTimeStart
  ? itemsStart1.filter(
      (item) => Number(item.value) > Number(selectedTimeStart)
    )
  : itemsStart1;








  const handleSelectedCourts = (selectedCourts) => {
    setCourtSelected([])
    setCourtSelected(selectedCourts)
  };


  const handleNavigate = () => {
    const name = user?.name 

    // console.log("selectedDate", selectedDate);
    // console.log("end", selectedTimeEnd);
    // console.log("start", selectedTimeStart);

    if(!courtSelected || courtSelected.length === 0) {
      showError("Chọn sân trước khi đặt lịch");
      return;
    }

    if(!name) {
      showError("Vui lòng đăng nhập để đặt sân");
      return;
    }
    navigate('/booking-detail', {
      state: {
        selectedDate,
        courtSelected,
        selectedTimeStart,
        selectedTimeEnd
      }
    });
  };


  return (
    <div style={{ fontSize: '14px', padding: '8px' }}>
      <Row gutter={16} style={{ width: '100%' }}>
        <Col xs={24} md={12} style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            <img
                src={`${process.env.REACT_APP_SERVER_URL}/uploads/court/${mainImage}`}
              alt="Main court"
              style={{ width: '100%', height: '500px', borderRadius: '8px', objectFit: 'cover' }}
            />

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: '8px',
              }}
            >
              {img.map((item, index) => (
                <div key={index} style={{ width: '24%' }}>
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/uploads/court/${item}`}
                    alt={`Thumbnail ${index + 1}`}
                    title={`Ảnh ${index + 1}`}
                    onClick={() => setMainImage(item)}
                    style={{
                      width: '100%',
                      height: '100px', 
                      objectFit: 'cover',
                      cursor: 'pointer',
                      outline: mainImage === item ? '2px solid black' : 'none',
                      borderRadius: '5px',
                      transition: '0.3s',
                    }}
                  />
                </div>
              ))}
            </div>

          </div>
 
          
        </Col>
        <Col xs={24} md={12} style={{ width: '100%', position: "relative" }}>
          <h2 style={{ marginTop: '16px' }}>{detailCourt.name}</h2>
          <div style={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '16px',
          }}>
            <p>
              Mở cửa: {detailCourt.openTime} - {detailCourt.closeTime}
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px", fontSize: '16px' }}>
              <FaLocationDot style={{ marginRight: '4px' }} />
              {detailCourt.address}
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px", fontSize: '16px' }}>
              <CiPhone /> {detailCourt.phone}
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px", fontSize: '16px' }}>
              <CiMail /> {detailCourt.email}
            </p>
          </div>

          <SearchAndSelectCourts
            selectedDate={selectedDate}
            selectedTimeStart={selectedTimeStart}
            selectedTimeEnd={selectedTimeEnd}
            setSelectedTimeStart={setSelectedTimeStart}
            setSelectedTimeEnd={setSelectedTimeEnd}
            onChangeDate={onChangeDate}
            disabledDate={disabledDate}
            itemsStart={itemsStart1}
            itemsEnd={itemsEnd1}
            selectedCourts={selectedCourts}
            setSelectedCourts={setCourtSelected}
            onRemoveCourt={onRemoveCourt}
            idCourt={idCourt}
            handleSelectedCourts={handleSelectedCourts}
          /> 

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
            
              <Button onClick={handleNavigate}  style={{ width: "65%", padding: "25px" }} color="default" variant="solid">
                <FaRegCalendarAlt /> Đặt sân ngay
              </Button>
          </div>

          {/* <BookingModal
            isModalOpen={isModalOpen}
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            selectedCourts={courtSelected}
            timeStart={selectedTimeStart}
            timeEnd={selectedTimeEnd}
          /> */}


          
        </Col>
        <div style={{ width: '100%', marginTop: '20px'}}>
          <h2 style={{ fontSize: '14px', background: '#ececec', padding: '15px', borderRadius: '10px'}}>Mô tả sân</h2>
          <div style={{ padding: '10px', border: '1px solid #ececec', borderRadius: '10px'}}>
            <p>Sân đẹp rộng, hiện đại</p>
          </div>
        </div>
        <div style={{ width: '100%', marginTop: '20px'}}>
          <h2 style={{ fontSize: '14px', background: '#ececec', padding: '15px', borderRadius: '10px'}}>Vị trí sân</h2>
          <div style={{ padding: '10px', border: '1px solid #ececec', borderRadius: '10px'}}>
            <iframe
              title="Vị trí sân pickleball"
              src={detailCourt.googleMapLink}

              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div style={{ width: '100%', marginTop: '20px'}}>
          <h2 style={{ fontSize: '14px', background: '#ececec', padding: '15px', borderRadius: '10px'}}>Nội quy</h2>
          <div style={{ padding: '10px', border: '1px solid #ececec', borderRadius: '10px'}}>
            <p>Không xả rác, không làm hư hại các thiết bị của sân</p>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default DetailCourtComponent;
 