import React from 'react'
import { WrapperHeader} from './styled';
import { Col, Popover } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from "../../../../services/users/authServices"
import { resetUser } from '../../../../redux/slides/userSlide';
import * as Util from "../../../../utils/authUtils"



function HeaderComponent() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

    

  const handleLogout = async () => {
    try {
      const token = await Util.getValidAccessToken()
      
      if (token) {
        await UserService.logoutUser(token)
        localStorage.removeItem("access-token");
        dispatch(resetUser())
      }
    } catch (error) {
      console.log(error);
    }
    navigate('/court')
  }


  const content = (
  <div >
    <div style={{ marginBottom: "10px" }}>
      <Link
        to="/profile"
        style={{ textDecoration: 'none', color: '#333', cursor: 'pointer', }}
        onMouseOver={(e) => (e.target.style.color = '#000')}
        onMouseOut={(e) => (e.target.style.color = '#333')}
      >
        Thông tin cá nhân
      </Link>
    </div>
    <div
      style={{ textDecoration: 'none', color: '#333', cursor: 'pointer', }}
      onMouseOver={(e) => (e.target.style.color = '#000')}
      onMouseOut={(e) => (e.target.style.color = '#333')}
      onClick={handleLogout}
      >
        Đăng xuất
    </div>
  </div>
);



  const user = useSelector((state) => state.user);


  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (value) => {
    console.log('Search value:', value);
  };  
  const searchInput = (e) => {
    setSearchValue(e.target.value);
  } 

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
    <>
    
        <div className="header-container" style={{ zIndex: '999', position: 'fixed', width: '100%', top: '0', height: "80px"}}>
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
                            

                          {user?._id ? (
                            
                              <Popover placement="bottom" content={content}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                  <UserOutlined
                                    style={{
                                      fontSize: '30px',
                                      marginRight: '15px',
                                      marginLeft: '40px',
                                      cursor: 'pointer'
                                    }}
                                  />
                                  <div>
                                    <span>{user.name}</span>
                                  </div>
                                </div>
                              </Popover>

                              
                          ) : (
                            <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                              <UserOutlined
                                style={{
                                  fontSize: '30px',
                                  marginRight: '40px',
                                  marginLeft: '40px',
                                  cursor: 'pointer'
                                }}
                              />
                            </Link>
                          )}
                            


                            
                        </div>
                    
                    </div>
                    
                </Col>
            </WrapperHeader>
        </div>
    </>
  )
}

export default HeaderComponent