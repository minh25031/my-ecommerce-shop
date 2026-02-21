import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AppFooter from './Footer';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen flex flex-col">
      <Header className="bg-white sticky top-0 z-50 w-full p-0 shadow-sm h-auto leading-none">
        <Navbar />
      </Header>
      
      {/* Content sẽ thay đổi nội dung dựa trên URL thông qua Outlet */}
      <Content className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <Outlet />
        </div>
      </Content>

      {/* Footer ở dưới cùng */}
      <Footer className="p-0">
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default MainLayout;