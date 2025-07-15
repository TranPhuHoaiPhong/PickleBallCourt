import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import i1 from '../../../../assets/introduction/intro/image-product-court.jpg';
import i2 from '../../../../assets/introduction/intro/product1.webp';
import i3 from '../../../../assets/introduction/intro/product2.webp';
import i4 from '../../../../assets/introduction/intro/product3.jpg';
import { CiPhone } from "react-icons/ci";
import { Button, Col, Row, DatePicker, Modal } from 'antd';
import { CiMail } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DropdownTime from '../Component/DropdownHuyen/DropDownTime';
import SrollComponent from '../Component/ScrollComponent/SrollComponent';



function DetailCourtComponent() {
  const [mainImage, setMainImage] = useState(i1);
    const thumbnails = [i1, i2, i3, i4, i4];
    const img = thumbnails.slice(0, 4);
    const onChangeDate = (date, dateString) => {
      console.log(date, dateString);
    };

    const disabledDate = (current) => {
      return current && current < dayjs().startOf('day');
    };

    const currentHour = dayjs().hour(); // Lấy giờ hiện tại (0-23)
    const hours = [16, 17, 18, 19, 20, 21, 22];

    // Lọc giờ lớn hơn giờ hiện tại
    const filteredHours = hours.filter(hour => hour > currentHour);

    // Tạo mảng items đúng cấu trúc
    console.log(filteredHours);
    const items = filteredHours.map((hour, index) => ({
      key: String(index + 1), // key = 1, 2, 3,...
      label: String(hour)     // label = "9", "10",...
    }));

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

    

  return (
    <div style={{ fontSize: '14px', padding: '8px' }}>
      <Row gutter={16} style={{ width: '100%' }}>
        <Col xs={24} md={12} style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            <img
              src={mainImage}
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
                    src={item}
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
          <h2 style={{ marginTop: '16px' }}>Sân bóng Đầm Hồng 1</h2>
          <div style={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '16px',
          }}>
            <p>
              Mở cửa: 05:30 - 22:00
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px", fontSize: '16px' }}>
                <RiMoneyDollarCircleLine style={{ color: "#DAA520"}}/> 
                190.000 Đ/H
                {/* {item.priceHour.toLocaleString('vi-VN')} Đ/H */}
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px", fontSize: '16px' }}>
              <FaLocationDot style={{ marginRight: '4px' }} />
              XRVF+X8R, Phường Khương Đình, Quận Thanh Xuân, Thành phố Hà Nội
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px", fontSize: '16px' }}>
              <CiPhone /> 0966259577
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px", fontSize: '16px' }}>
              <CiMail /> tranphuhoaiphong@gmail.com
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', // căn giữa theo chiều ngang
              gap: '10px',
              marginTop: '20px', // tùy thêm cho đẹp
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <DatePicker 
              onChange={onChangeDate} 
              disabledDate={disabledDate} 
              format="DD/MM/YYYY"
              style={{
                boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15)",
                padding: '8px'
              }}
            />

            <DropdownTime items={items} />

            <Button
              style={{
                width: "25%",
                padding: "19px",
                marginLeft: '17px',
                minWidth: '120px' // đảm bảo nút không bị nhỏ quá
              }}
              color="default"
              variant="solid"
            >
              Tìm kiếm
            </Button>
          </div>

          <div>
            <SrollComponent />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '10px', flexWrap: 'wrap'}}>
            Chọn sân: 
            <div style={{
              position: 'relative',
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              width: 'fit-content',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Sân 1</span>
                <span>18H</span>
              </div>
              <span
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '3px',
                  cursor: 'pointer',
                  color: 'red',
                  fontWeight: 'bold',
                }}
                onClick={() => console.log('Đã bấm đóng')}
              >
                ×
              </span>
            </div>

            <div style={{
              position: 'relative',
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              width: 'fit-content',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Sân 2</span>
                <span>19H</span>
              </div>

              <span
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '3px',
                  cursor: 'pointer',
                  color: 'red',
                  fontWeight: 'bold',
                }}
                onClick={() => console.log('Đã bấm đóng')}
              >
                ×
              </span>
            </div>

            <div style={{
              position: 'relative',
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              width: 'fit-content',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Sân 1</span>
                <span>18H</span>
              </div>
              <span
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '3px',
                  cursor: 'pointer',
                  color: 'red',
                  fontWeight: 'bold',
                }}
                onClick={() => console.log('Đã bấm đóng')}
              >
                ×
              </span>
            </div>

            <div style={{
              position: 'relative',
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              width: 'fit-content',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Sân 2</span>
                <span>19H</span>
              </div>

              <span
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '3px',
                  cursor: 'pointer',
                  color: 'red',
                  fontWeight: 'bold',
                }}
                onClick={() => console.log('Đã bấm đóng')}
              >
                ×
              </span>
            </div>

            <div style={{
              position: 'relative',
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              width: 'fit-content',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Sân 1</span>
                <span>18H</span>
              </div>
              <span
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '3px',
                  cursor: 'pointer',
                  color: 'red',
                  fontWeight: 'bold',
                }}
                onClick={() => console.log('Đã bấm đóng')}
              >
                ×
              </span>
            </div>

            <div style={{
              position: 'relative',
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              width: 'fit-content',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Sân 2</span>
                <span>19H</span>
              </div>

              <span
                style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '3px',
                  cursor: 'pointer',
                  color: 'red',
                  fontWeight: 'bold',
                }}
                onClick={() => console.log('Đã bấm đóng')}
              >
                ×
              </span>
            </div>

            

          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '20px'}}>
             {/* <Link to="/bookCourt" style={{ width: '100%', display: 'contents'}}>${item.id} */}
              <Button onClick={showModal} style={{ width: "65%", padding: "25px"}} color="default" variant="solid"><FaRegCalendarAlt /> Đặt sân ngay</Button>
            {/* </Link> */}
            <Modal
              title="THANH TOÁN"
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <div>
                <Row>
                  <Col
                    span={10}
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                      height: '40px'            // Phải có chiều cao để align dọc có tác dụng
                    }}
                  >
                    Tên sân
                  </Col>

                  <Col
                    span={4}
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '40px'
                    }}
                  >
                    Giờ
                  </Col>

                  <Col
                    span={10}
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '40px'
                    }}
                  >
                    Giá
                  </Col>
                </Row>

              </div>
              <div>
                <Row>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={10}> Sân 1</Col>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={4}>18H</Col>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={10}>90.000</Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={10}> Sân 2</Col>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={4}>19H</Col>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={10}>90.000</Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={10}> Sân 3</Col>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={4}>20H</Col>
                  <Col style={{display: 'flex',
                      justifyContent: 'center', // Căn giữa ngang
                      alignItems: 'center',     // Căn giữa dọc
                    }} span={10}>90.000</Col>
                </Row>
              </div>

              <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '16px', marginTop: '20px', marginRight: '20px' }}>
                Tổng giá: 270.000
              </div>
            </Modal>
          </div>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.636965743097!2d105.7654703758332!3d10.046785972226251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0880f08006ffb%3A0x9a745510330faf4e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBL4bu5IHRodeG6rXQgLSBDw7RuZyBuZ2jhu4cgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1751532641794!5m2!1svi!2s"
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
