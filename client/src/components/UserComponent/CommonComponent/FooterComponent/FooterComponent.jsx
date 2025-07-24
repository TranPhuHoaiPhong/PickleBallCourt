import { Col, Row } from 'antd'
import React from 'react'
import { PhoneOutlined } from "@ant-design/icons";
import { CiLocationOn, CiMail, CiFacebook, CiInstagram, CiYoutube } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { LiHover, LinkHover, UlPadding } from './styled';



const FooterComponent = () => {
  return (
    <div style={{ backgroundColor: '#f3f4f8' }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: "8px", backgroundColor: '#f3f4f8'}}>
            <h1 style={{textAlign: 'center'}}>
                Cửa hàng T&P
            </h1>
            <Row>
                <Col xs={24} md={8}>
                    <UlPadding style={{ listStyle: "none", fontSize: '16px' }}>
                        <li style={{ marginBottom: '5px'}}>© 2025 - CÔNG TY TNHH T&P VN</li>
                        <li style={{display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '5px'}}>
                            <PhoneOutlined style={{marginRight: '5px'}} />
                            0966259599</li>
                        <li style={{display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '5px'}}>
                            <CiLocationOn style={{marginRight: '5px'}}/>
                            54H4 3/2 Ninh Kiều Cần Thơ</li>
                        <li style={{display: 'flex', alignItems: 'center', fontSize: '16px', marginBottom: '5px'}}>
                            <CiMail style={{marginRight: '5px'}}/>
                            congtytap@gmail.com</li>
                    </UlPadding>
                </Col>
                <Col xs={24} md={8}>
                    <UlPadding style={{ listStyle: "none", fontSize: '16px' }}>
                        <LiHover style={{marginBottom: '5px'}}>
                            <Link to="/support" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                Hướng dẫn mua hàng
                            </Link>
                        </LiHover>
                        <LiHover style={{marginBottom: '5px'}}>
                            <Link to="/support" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                Hướng dẫn đổi trả hàng
                            </Link>
                        </LiHover>
                        <LiHover style={{marginBottom: '5px'}}>
                            <Link to="/support" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                Hướng dẫn đăng ký/đăng nhập
                            </Link>
                        </LiHover>
                        <LiHover style={{marginBottom: '5px'}}>
                            <Link to="/support" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                Hướng dẫn tìm kiếm
                            </Link>
                        </LiHover>
                    </UlPadding>
                </Col>
                <Col xs={24} md={8}>
                    <UlPadding style={{ listStyle: "none", fontSize: '16px' }}>
                        <LiHover>
                            <LinkHover to="https://www.nike.com/vn/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginBottom: '5px' }} target="_blank">
                                <CiFacebook style={{marginRight: '5px'}}/>
                                Facebook
                            </LinkHover>
                        </LiHover>
                        <LiHover style={{marginBottom: '5px'}}>
                            <LinkHover to="https://www.nike.com/vn/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginBottom: '5px' }} target="_blank">
                                <FaTiktok style={{marginRight: '5px'}}/>
                                Tiktok
                            </LinkHover>
                        </LiHover>
                        <LiHover style={{marginBottom: '5px'}}>
                            <LinkHover to="https://www.nike.com/vn/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginBottom: '5px' }} target="_blank">
                                <CiInstagram style={{marginRight: '5px'}}/>
                                Instagram
                            </LinkHover>
                        </LiHover>
                        <LiHover style={{marginBottom: '5px'}}>
                            <LinkHover to="https://www.nike.com/vn/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginBottom: '5px' }} target="_blank">
                                <CiYoutube style={{marginRight: '5px'}}/>
                                Youtube
                            </LinkHover>
                        </LiHover>
                    </UlPadding>
                </Col>
            </Row>
        </div>
    </div>
    
  )
}

export default FooterComponent