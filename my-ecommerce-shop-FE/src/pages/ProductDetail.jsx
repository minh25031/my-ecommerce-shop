import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Carousel, Button, InputNumber, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockData';
import { addItem } from '../features/cart/cartSlice';
import ProductCard from '../components/ProductCard';

const { Title, Paragraph } = Typography;

const formatPrice = (value) => {
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  } catch {
    return value;
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) return <div>Sản phẩm không tồn tại.</div>;

  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }

    dispatch(addItem({ id: product.id, name: product.name, price: product.price, quantity, image: product.image }));
    message.success('Đã thêm vào giỏ hàng');
  };

  const related = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={10}>
          <Carousel autoplay>
            {product.images && product.images.length ? product.images.map((src, idx) => (
              <div key={idx} className="flex items-center justify-center bg-white">
                <img src={src} alt={`${product.name}-${idx}`} className="max-h-96 object-contain mx-auto" />
              </div>
            )) : (
              <div className="flex items-center justify-center bg-white">
                <img src={product.image} alt={product.name} className="max-h-96 object-contain mx-auto" />
              </div>
            )}
          </Carousel>
        </Col>

        <Col xs={24} md={12} lg={14}>
          <Title level={2}>{product.name}</Title>
          <div className="text-2xl font-bold mb-4">{formatPrice(product.price)}</div>
          <Paragraph>{product.description}</Paragraph>
          <div className="mb-4"><strong>Thông số kỹ thuật:</strong> {product.specs}</div>

          <div className="flex items-center gap-4 mb-4">
            <div>
              Số lượng:
              <InputNumber min={1} max={product.stock || 999} value={quantity} onChange={(v) => setQuantity(v)} />
            </div>
            <Button type="primary" onClick={handleAdd}>Thêm vào giỏ hàng</Button>
          </div>
        </Col>
      </Row>

      <div className="mt-12">
        <Title level={3}>Sản phẩm liên quan</Title>
        <Row gutter={[24, 24]}>
          {related.length ? related.map(p => (
            <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
              <ProductCard product={p} />
            </Col>
          )) : <div>Không có sản phẩm liên quan.</div>}
        </Row>
      </div>
    </div>
  );
};

export default ProductDetail;
