import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} onClick={({key}) => navigate(key)}>
          <Menu.Item key="/">Home</Menu.Item>
          <Menu.Item key="/about">About</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px', minHeight: 'calc(100vh - 184px)' }}><Outlet /></Content>
      <Footer style={{ textAlign: 'center' }}>Just Art ©2024 Created by Artive</Footer>
    </Layout>
  );
};

export default PublicLayout;