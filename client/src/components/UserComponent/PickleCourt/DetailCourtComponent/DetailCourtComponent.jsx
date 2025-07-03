import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import i1 from '../../../../assets/introduction/intro/image-product-court.jpg';
import i2 from '../../../../assets/introduction/intro/product1.webp';
import i3 from '../../../../assets/introduction/intro/product2.webp';
import i4 from '../../../../assets/introduction/intro/product3.jpg';
import { CiPhone } from "react-icons/ci";
import { Button, Col, Row } from 'antd';
import { CiMail } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";


const DetailCourtComponent = () => {
  const [mainImage, setMainImage] = useState(i1);
    const thumbnails = [i1, i2, i3, i4, i4];
    const img = thumbnails.slice(0, 4);


  return (
    <div style={{ fontSize: '14px', padding: '8px' }}>
      <Row gutter={16} style={{ width: '100%' }}>
        <Col xs={24} md={12} style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            {/* Ảnh chính */}
            <img
              src={mainImage}
              alt="Main court"
              style={{ width: '100%', height: '400px', borderRadius: '8px', objectFit: 'cover' }}
            />

            {/* Ảnh thumbnail */}
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
                      height: '100px', // 👈 chiều cao cố định
                      objectFit: 'cover', // 👈 giữ ảnh không méo
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: "absolute", bottom: '37px', width: '100%'}}>
            <Button style={{ width: "65%", padding: "25px"}} color="default" variant="solid"><FaRegCalendarAlt /> Đặt sân ngay</Button>
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
