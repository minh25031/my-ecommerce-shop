import React from 'react';
import { Card, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (!product) return null;
  const img = product.image ? product.image.replace(/^\/public/, '') : '/images/placeholder.png';

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    dispatch(addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }));
    message.success('Đã thêm vào giỏ hàng');
  };

  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={img} className="object-cover h-48 w-full" />}
      className="h-full"
      actions={[<Button type="link">Xem chi tiết</Button>]}
    >
      <Meta title={product.name} description={product.description} />
      <div className="mt-3">
        <div className="font-bold text-lg">{formatPrice(product.price)}</div>
        <div className="mt-3 flex justify-end">
          <Button type="primary" className="w-full md:w-auto" onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
