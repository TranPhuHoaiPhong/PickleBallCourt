import React from 'react'
import { WrapperHeader} from './styled';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';


function HeaderComponent() {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (value) => {
    console.log('Search value:', value);
  };  
  const searchInput = (e) => {
    setSearchValue(e.target.value);
  } 


  return (
    <>
    
        <div className="header-container" style={{ zIndex: '1', position: 'fixed', width: '100%', top: '0', height: "80px"}}>
            <WrapperHeader>
                <Col span={24}>
                    <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '5px auto'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                              <HomeOutlined style={{ fontSize: '30px', marginRight: '40px' }} />
                          </Link>
                          <Link to="/court" style={{ textDecoration: 'none', color: 'inherit' }}>
                              <span style={{color: "#fff"}}>SÂN PICKLEBALL</span>
                          </Link>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', width: "60%"}}>
                            
                          <Link to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <UserOutlined style={{ fontSize: '30px', marginRight: '40px', marginLeft: '40px', cursor: 'pointer' }} />
                          </Link>
                            
                          <Link
                            to={"/register"}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                          </Link>


                            
                        </div>
                    
                    </div>
                    
                </Col>
            </WrapperHeader>
        </div>
    </>
  )
}

export default HeaderComponent