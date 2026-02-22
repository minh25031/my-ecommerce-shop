import React, { useMemo, useState } from 'react';
import { Row, Col, Typography, Carousel, Card, Menu, List } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get('q') || '';
  const [category, setCategory] = useState('Tất cả');
  const searchValue = query;

  const products = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchQuery = p.name.toLowerCase().includes((searchValue || '').toLowerCase());
      const matchCategory = category === 'Tất cả' || p.category === category;
      return matchQuery && matchCategory;
    });
  }, [searchValue, category]);

  const featured = useMemo(() => MOCK_PRODUCTS.filter(p => p.isFeatured), []);

  return (
    <div>
      <Carousel autoplay className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <div>
          <div className="h-52 md:h-80 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl md:text-4xl font-bold">
            Siêu Sale - Giá Sốc Hôm Nay
          </div>
        </div>
        <div>
          <div className="h-52 md:h-80 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-2xl md:text-4xl font-bold">
            Ưu đãi đặc biệt cho điện thoại
          </div>
        </div>
      </Carousel>

      <Row gutter={[24, 24]}>
        {/* Left: Categories */}
        <Col xs={0} sm={6} md={5} lg={4}>
          <Card size="small" title="Danh mục" className="sticky top-20">
            <Menu
              mode="vertical"
              selectedKeys={[category]}
              onClick={({ key }) => setCategory(key)}
              items={MOCK_CATEGORIES.map(c => ({ key: c, label: c }))}
            />
          </Card>
          <Card size="small" className="mt-4">
            <Title level={5}>Sản phẩm nổi bật</Title>
            <List
              itemLayout="horizontal"
              dataSource={featured.slice(0,4)}
              renderItem={item => (
                <List.Item onClick={() => navigate(`/products/${item.id}`)} className="cursor-pointer">
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.name} loading="lazy" className="w-12 h-12 object-cover rounded" />}
                    title={item.name}
                    description={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Center: Products */}
        <Col xs={24} sm={18} md={14} lg={16}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <Title level={3} className="mb-3 md:mb-0">Sản phẩm</Title>
          </div>

          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>

        {/* Right: Promotions / Quick links */}
        <Col xs={0} md={5} lg={4}>
          <Card size="small" title="Khuyến mãi">
            <div className="mb-3">
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800" alt="promo" className="w-full rounded" />
            </div>
            <p className="text-sm">Mua 1 tặng 1, giảm thêm 10% khi thanh toán online.</p>
          </Card>

          <Card size="small" className="mt-4">
            <Title level={5}>Xem thêm</Title>
            <ul className="text-sm space-y-2">
              <li className="cursor-pointer text-blue-600">Phụ kiện</li>
              <li className="cursor-pointer text-blue-600">Bảo hành & Dịch vụ</li>
              <li className="cursor-pointer text-blue-600">Tin tức & Blog</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;