import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/UserComponent/PickleCourt/HeaderPickleComponent/HeaderPickleComponent';
import FooterPickleCourt from '../../components/UserComponent/PickleCourt/FooterPickleCourt/FooterPickleCourt';

import slide1 from '../../assets/images/slide1.webp';
import slide2 from '../../assets/images/slide2.webp';

const { Meta } = Card;

const mockProducts = [
  {
    _id: '1',
    name: 'Sân Pickleball A',
    colors: [{ price: 200000 }],
  },
  {
    _id: '2',
    name: 'Sân Pickleball B',
    colors: [{ price: 250000 }],
  },
  {
    _id: '3',
    name: 'Sân Pickleball C',
    colors: [{ price: 180000 }],
  },
  {
    _id: '4',
    name: 'Sân Pickleball D',
    colors: [{ price: 220000 }],
  },
  {
    _id: '5',
    name: 'Sân Pickleball E',
    colors: [{ price: 300000 }],
  },
  {
    _id: '6',
    name: 'Sân Pickleball F',
    colors: [{ price: 270000 }],
  },
];

const isAllEmpty = mockProducts.every(
  (item) => !item.colors || item.colors.length === 0
);

const convertPrice = (price) => {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

const SearchPage = () => {
  const [products] = useState(mockProducts);
  const [visibleCount, setVisibleCount] = useState();
  const [hovered, setHovered] = useState(null);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <>
      <HeaderComponent />


      <div style={{ marginTop: '120px', marginBottom: '40px'}}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>

            {!isAllEmpty ? (

                <Row gutter={[16, 16]} justify="start">
                    {visibleProducts.map((item, index) => (
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        key={item._id}
                    >
                        <Link
                        to={`/product/detail/${item._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                        <Card
                            hoverable
                            cover={
                            <div
                                style={{
                                position: 'relative',
                                overflow: 'hidden',
                                height: '250px',
                                }}
                                onMouseEnter={() => setHovered(item._id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <img
                                src={slide1}
                                alt={item.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease',
                                    transform:
                                    hovered === item._id
                                        ? 'translateX(-100%)'
                                        : 'translateX(0)',
                                }}
                                />
                                <img
                                src={slide2}
                                alt={item.name}
                                style={{
                                    position: 'absolute',
                                    left: '100%',
                                    top: 0,
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease',
                                    transform:
                                    hovered === item._id
                                        ? 'translateX(-100%)'
                                        : 'translateX(0)',
                                }}
                                />
                            </div>
                            }
                        >
                            <Meta
                            title={item.name}
                            description={convertPrice(item.colors[0].price)}
                            />
                        </Card>
                        </Link>
                    </Col>
                    ))}
                </Row>

            ) : (

                <h2 style={{ textAlign: "center"}}>Không có kết quả tương ứng. 
                    <Link to='/court' style={{ textDecoration: 'none'}}> Quay lại trang trước</Link>
                </h2>

            )
            }
        </div>
      </div>
      <FooterPickleCourt />
    </>
  );
};

export default SearchPage;
