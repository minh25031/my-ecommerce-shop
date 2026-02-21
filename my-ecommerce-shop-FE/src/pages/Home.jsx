import React from 'react';
import { Row, Col, Typography, Carousel } from 'antd';
import { useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const { Title } = Typography;

const Home = () => {
  const query = new URLSearchParams(useLocation().search).get('q') || '';
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isFeatured && p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <Carousel autoplay className="mb-10 rounded-lg overflow-hidden shadow-lg">
        <div>
          <div className="h-64 md:h-96 bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            Siêu Sale Mùa Hè - Giảm tới 50%
          </div>
        </div>
        <div>
          <div className="h-64 md:h-96 bg-purple-500 flex items-center justify-center text-white text-3xl font-bold">
            iPhone 15 Pro Max đã sẵn hàng!
          </div>
        </div>
      </Carousel>

      <div className="mb-8">
        <Title level={2} className="text-center mb-10">Sản Phẩm Nổi Bật</Title>
        
        <Row gutter={[24, 24]}>
          {featuredProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;