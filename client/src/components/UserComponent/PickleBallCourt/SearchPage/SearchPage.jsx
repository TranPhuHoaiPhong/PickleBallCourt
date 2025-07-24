import React, {useState} from 'react'
import slide1 from '../../../../assets/images/slide1.webp';
import slide2 from '../../../../assets/images/slide2.webp';

import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import { IoLocationSharp } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import "./styled.css"


const SearchPagecomponent = ({mockProducts}) => {
    return (
    <div>
        
        <Row gutter={[16, 16]} justify="start">
            {mockProducts.map((item, index) => ( 
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    key={item._id}
                >
                    
                    <div 
                    className="product-card"
                    style={{
                        padding: '16px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '8px',
                        background: '#f9f9f9',
                        }}>
                        <Link to={`/detailCourt/${item.id}`}>
                            <div style={{ overflow: 'hidden', height: 'auto', borderRadius: "5px"}}>
                                <img style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: "10px" }} src={item.img} />
                            </div>
                            <div>
                                <p style={{ color: "#A9A9A9"}}>Mở cửa: {item.openTime} - {item.closeTime}</p>
                                <h3 style={{ color: "black"}}>{item.title}</h3>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <div>
                                        <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px" }}>
                                            <IoLocationSharp style={{ color: "red"}} />
                                            {item.addressDistrict}
                                        </p>
                                        <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", paddingLeft: "10px" }}>
                                            <RiMoneyDollarCircleLine style={{ color: "#DAA520"}}/> 
                                            {item.priceHour.toLocaleString('vi-VN')} Đ/H
                                        </p>
                                    </div>
                                    <div>
                                        <Button color="default" variant="solid">Đặt sân ngay</Button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                </Col>
            ))}
        </Row>
    </div>
  )
}

export default SearchPagecomponent
