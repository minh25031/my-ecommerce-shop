import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table, InputNumber, Button, Popconfirm, Typography, message, Empty } from 'antd';
import { updateQuantity, removeItem, clearCart } from '../features/cart/cartSlice';

const { Title } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  const { isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/cart' } });
    }
  }, [isLoggedIn, navigate]);

  const dataSource = items.map(i => ({
    key: i.id,
    ...i,
  }));

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img src={record.image} alt={record.name} className="w-16 h-16 object-cover" />
          <div>{record.name}</div>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (q, record) => (
        <InputNumber min={1} value={q} onChange={(val) => dispatch(updateQuantity({ id: record.id, quantity: val }))} />
      ),
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_, record) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price * record.quantity),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Popconfirm title="Xóa sản phẩm này?" onConfirm={() => { dispatch(removeItem(record.id)); message.success('Đã xóa'); }} okText="Xóa" cancelText="Hủy">
          <Button danger> Xóa </Button>
        </Popconfirm>
      ),
    },
  ];

  const total = useMemo(() => items.reduce((s, it) => s + (it.price * (it.quantity || 1)), 0), [items]);

  if (!isLoggedIn) return null;

  return (
    <div>
      <Title level={2}>Giỏ hàng của bạn</Title>

      {items.length === 0 ? (
        <Empty description="Giỏ hàng trống" />
      ) : (
        <>
          <Table dataSource={dataSource} columns={columns} pagination={false} />

          <Row className="mt-6" justify="end">
            <Col>
              <div className="text-xl font-bold">Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</div>
              <div className="mt-4 flex gap-3">
                <Button onClick={() => { dispatch(clearCart()); message.success('Đã xóa toàn bộ giỏ hàng'); }}>Xóa giỏ</Button>
                <Button type="primary" onClick={() => navigate('/checkout')}>Thanh toán</Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Cart;
