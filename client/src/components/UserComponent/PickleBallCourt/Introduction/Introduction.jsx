import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Image, Pagination, Row  } from 'antd';
import { IoLocationSharp } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import i1 from "../../../../assets/introduction/intro/uu-dai-1.png";
import i2 from "../../../../assets/introduction/intro/image-product-court.jpg";

import { motion, AnimatePresence } from 'framer-motion';


const Introduction = () => {

  const data = [
  { 
    title: 'Sân Pickleball 1', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  },
  { 
    title: 'Sân Pickleball 2', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  },
  { 
    title: 'Sân Pickleball 3', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  },
  { 
    title: 'Sân Pickleball 4', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  },
  { 
    title: 'Sân Pickleball 5', 
    openTime: '05:30',
    closeTime: '22:00',
    addressDistrict: "Huyện Ninh Kiều",
    priceHour: 120000,
    img: i2
  },
];

  const [ currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex = currentPage - 1
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    <div style={{ marginBottom: '20px'}}>
      <h2 style={{ fontSize: '21px', marginBottom: '5px'}}>Ưu đãi</h2>
      <span style={{ fontSize: '14px', color: "#A9A9A9"}}>Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn</span>
    </div>
    <div style={{ overflow: 'hidden', borderRadius: '5px', marginTop: '10px' }}>
      <Image
        src={i1}
        alt="Introduction"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
    <div style={{ marginBottom: '20px'}}>
      <h2 style={{ fontSize: '21px', marginBottom: '5px'}}>Đề xuất cho bạn</h2>
      <span style={{ fontSize: '14px', color: "#A9A9A9"}}>Sân tập được người chơi đánh giá cao và gần bạn nhất</span>
    </div>
    <div>
      <div style={{ marginBottom: '10px'}}> 
        <AnimatePresence mode="wait">
  <motion.div
    key={currentPage}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.4 }}
  >
    <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
      {currentItems.map((item, index) => (
        <Col span={8} key={index}>
          <div style={{
            padding: '16px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            background: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Link to={'/'}>
              <div style={{ overflow: 'hidden', height: '200px', borderRadius: "5px"}}>
                <img style={{ width: '100%', height: 'auto', objectFit: 'contain' }} src={item.img} />
              </div>
              <div>
                <p style={{ color: "#A9A9A9"}}>Mở cửa: {item.openTime} - {item.closeTime}</p>
                <h3 style={{ color: "black"}}>{item.title}</h3>
                <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black" }}>
                  <IoLocationSharp style={{ color: "red"}} />
                  {item.addressDistrict}
                </p>
                <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black" }}>
                  <RiMoneyDollarCircleLine style={{ color: "#DAA520"}}/> 
                  {item.priceHour.toLocaleString('vi-VN')} Đ/H
                </p>
              </div>
            </Link>
          </div>
        </Col>
      ))}
    </Row>
  </motion.div>
</AnimatePresence>


      </div>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <Pagination
          current={currentPage}
          onChange={page => setCurrentPage(page)}
          total={data.length - (itemsPerPage - 1)} // để tránh out-of-range
          pageSize={1}
          showSizeChanger={false}
        />
      </div>
    </div>
    </>
  )
}

export default Introduction