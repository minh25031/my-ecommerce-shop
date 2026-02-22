import React from 'react';
import { Card, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addItem } from '../features/cart/cartSlice';

const { Meta } = Card;

const formatPrice = (value) => {
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  } catch {
    return value;
  }
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (!product) return null;
  const img = product.image ? product.image.replace(/^\/public/, '') : '/images/placeholder.png';

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }

    dispatch(addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }));
    message.success('Đã thêm vào giỏ hàng');
  };

  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={img} loading="lazy" className="object-cover h-48 w-full" />}
      className="h-full flex flex-col"
      bodyStyle={{ display: 'flex', flexDirection: 'column', padding: 16, flex: 1 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Meta title={product.name} description={product.description} />

        <div className="mt-3 flex-1">
          {/* description area grows to keep consistent card heights */}
          <div className="text-lg font-bold">{formatPrice(product.price)}</div>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <Button type="primary" block onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
          <div className="text-right">
            <Button type="link" onClick={() => navigate(`/products/${product.id}`)}>Xem chi tiết</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
