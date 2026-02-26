import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200}>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            { key: "/admin/dashboard", icon: <DashboardOutlined />, label: "대시보드" },
            { key: "/admin/artworks", icon: <PictureOutlined />, label: "작품 관리" },
            { key: "/admin/users", icon: <TeamOutlined />, label: "유저 관리" },
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;