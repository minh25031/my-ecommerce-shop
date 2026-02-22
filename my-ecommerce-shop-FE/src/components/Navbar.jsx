import React, { useState } from 'react';
import { Menu, Button, Badge, Dropdown, Space, Input } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import logo from '../assets/logo/my-shop-logo.png';

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { Search } = Input;
  const location = useLocation();

  // Menu thả xuống khi đã đăng nhập
  const userMenuItems = [
    { key: 'profile', label: <Link to="/my-account">Tài khoản của tôi</Link>, icon: <UserOutlined /> },
    { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true, onClick: () => {
      dispatch(logout());
      navigate('/login');
    }},
  ];

  const onSearch = (value) => {
    navigate(`/?q=${encodeURIComponent(value || '')}`);
  };

  return (
    <div className="flex justify-between items-center px-4 md:px-10 h-16 bg-white">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" loading="lazy" className="h-12 md:h-14 w-auto mr-3" />
        <span className="text-xl font-bold text-blue-600 hidden md:block">MY-SHOP</span>
      </div>
      {/* Menu giữa */}
      <Menu mode="horizontal" className="border-none flex-1 justify-center min-w-[200px]">
        <Menu.Item key="home"><Link to="/">Trang chủ</Link></Menu.Item>
        <Menu.Item key="products"><Link to="/products">Sản phẩm</Link></Menu.Item>
        <Menu.Item key="contact"><Link to="/contact">Liên hệ</Link></Menu.Item>
      </Menu>

      {/* Actions bên phải */}
      <div className="flex items-center gap-2 md:gap-5">
        <div className="hidden sm:block mr-2">
          <Search
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={onSearch}
            enterButton
            style={{ width: 240 }}
          />
        </div>

        <Badge count={items?.length || 0} showZero>
          <Button 
            type="text" 
            className="flex items-center justify-center"
            icon={<ShoppingCartOutlined className="text-2xl" />} 
            onClick={() => {
              if (!isLoggedIn) { navigate('/login', { state: { from: location.pathname + location.search } }); }
              else { navigate('/cart'); }
            }} 
          />
        </Badge>

        {isLoggedIn ? (
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <Space className="cursor-pointer hover:text-blue-600 transition-colors">
              <span className="font-medium hidden md:inline">{user?.fullName}</span>
              <UserOutlined className="text-xl" />
              <DownOutlined className="text-xs" />
            </Space>
          </Dropdown>
        ) : (
          <Button type="primary" shape="round" onClick={() => navigate('/login')}>
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;