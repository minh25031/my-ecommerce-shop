import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Card, Row, Col, Button, Table, Tag, Empty, Drawer, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const formatCurrency = (v) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

const statusColor = (s) => {
  if (!s) return 'default';
  const map = { 'Đã giao': 'green', 'Đang xử lý': 'gold', 'Hủy': 'red' };
  return map[s] || 'blue';
};

const MyAccount = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = user ? allOrders.filter((o) => o.userEmail === user.email) : [];
    // sort desc by createdAt
    userOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    setOrders(userOrders);
  }, [user]);

  const columns = [
    { title: 'Mã đơn', dataIndex: 'id', key: 'id', render: (t) => <b>{t}</b> },
    { title: 'Ngày đặt', dataIndex: 'createdAt', key: 'createdAt', render: (v) => new Date(v).toLocaleString('vi-VN') },
    { title: 'Tổng tiền', dataIndex: 'total', key: 'total', render: (v) => formatCurrency(v) },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (s) => <Tag color={statusColor(s)}>{s || 'Chờ xử lý'}</Tag> },
    { title: '', key: 'actions', render: (_, record) => <Button type="link" onClick={() => { setActiveOrder(record); setDrawerVisible(true); }}>Xem</Button> },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Tài khoản của tôi</h1>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card>
            <div className="flex items-center gap-4">
              <Avatar size={72} icon={<UserOutlined />} src={user?.avatar} />
              <div>
                <h3 className="text-xl font-semibold">{user?.fullName || '-'}</h3>
                <p className="text-sm text-gray-600">{user?.email || '-'}</p>
                <Space style={{ marginTop: 12 }}>
                  <Button type="primary">Chỉnh sửa</Button>
                  <Button>Đổi mật khẩu</Button>
                </Space>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Lịch sử đặt hàng">
            {orders.length === 0 ? (
              <div className="py-8"><Empty description="Chưa có đơn hàng" /></div>
            ) : (
              <Table
                dataSource={orders}
                columns={columns}
                rowKey={(r) => r.id}
                pagination={{ pageSize: 6 }}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Drawer
        title={activeOrder ? `Đơn ${activeOrder.id}` : 'Chi tiết đơn hàng'}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={520}
      >
        {activeOrder ? (
          <div>
            <p><strong>Ngày đặt:</strong> {new Date(activeOrder.createdAt).toLocaleString('vi-VN')}</p>
            <p><strong>Tổng:</strong> {formatCurrency(activeOrder.total)}</p>
            <p><strong>Trạng thái:</strong> <Tag color={statusColor(activeOrder.status)}>{activeOrder.status || 'Chờ xử lý'}</Tag></p>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Sản phẩm</h4>
              {Array.isArray(activeOrder.items) && activeOrder.items.length > 0 ? (
                activeOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b">
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-sm text-gray-600">Số lượng: {it.quantity}</div>
                    </div>
                    <div className="font-medium">{formatCurrency((it.price || 0) * (it.quantity || 1))}</div>
                  </div>
                ))
              ) : (
                <pre className="text-sm bg-gray-50 p-3 rounded">{JSON.stringify(activeOrder, null, 2)}</pre>
              )}
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default MyAccount;
