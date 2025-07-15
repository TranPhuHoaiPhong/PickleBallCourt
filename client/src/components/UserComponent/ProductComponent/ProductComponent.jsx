import { Card, Col, Row, Button } from 'antd';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/product/pd1.webp'
import img2 from '../../../assets/product/pd2.webp'
import { convertPrice } from '../../../utils';

const { Meta } = Card;



const CartComponent = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(10); // Ban đầu hiển thị 8 sản phẩm
  const [hovered, setHovered] = useState(null); // Theo dõi trạng thái hover

  const visibleProducts = products.slice(0, visibleCount); // Cắt danh sách sản phẩm hiển thị
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Mỗi lần bấm, hiển thị thêm 8 sản phẩm
  };

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '8px', marginBottom: '8px', padding: '0 8px' }}>
        <Row gutter={[16, 16]} justify="start">
          {visibleProducts.map((item, index) => (
            <Col
              xs={24} // Màn hình nhỏ nhất: 1 sản phẩm mỗi hàng
              sm={12} // Màn hình nhỏ: 2 sản phẩm mỗi hàng
              md={12} // Hàng đầu tiên có 2 sản phẩm, các hàng sau có 4 sản phẩm
              lg={index < 2 ? 12 : 6} 
              key={item._id}
            >
              <Link to={`/product/detail/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card
                  cover={
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        height: "100%",
                      }}
                      onMouseEnter={() => setHovered(item._id)}
                      onMouseLeave={() => setHovered(null)}
                    >

                      <img
                         src={img1} 
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          transform: hovered === item._id ? "translateX(-100%)" : "translateX(0)",
                        }}
                      />
                      <img
                        src={img2}
                        alt={item.name}
                        style={{
                          position: "absolute",
                          left: "100%",
                          width: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          transform: hovered === item._id ? "translateX(-100%)" : "translateX(0)",
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

        {/* Nút "Xem thêm" chỉ hiện nếu vẫn còn sản phẩm chưa hiển thị */}
        {visibleCount < products.length && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button
              onClick={handleLoadMore}
              type="default"
              style={{ padding: "10px 40px", fontSize: "16px", borderRadius: "5px" }}
            >
              Xem thêm <DownOutlined style={{ fontSize: '10px', marginLeft: "5px" }} />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartComponent;
