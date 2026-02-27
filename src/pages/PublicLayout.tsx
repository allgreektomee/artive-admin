import React from "react";
// import { Layout, Menu, Row, Col } from "antd";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout,Row, Col } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  // 메뉴 아이템 정의
  // const menuItems = [
  //   { key: "/report", label: "ARTIVE REPORT" },
  //   { key: "/critic", label: "CRITIC & VIEW" },
  //   { key: "/gallery", label: "THE GALLERY" },
  //   { key: "/office", label: "EDITOR'S OFFICE" },
  // ];

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          borderBottom: "1px solid #e8e8e8",
          height: 'auto',
          lineHeight: 'normal'
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <div
              onClick={() => navigate("/")}
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                cursor: "pointer",
                padding: '16px 0'
              }}
            >
              ARTIVE
            </div>
          </Col>
          {/* <Col>
            <Menu theme="light" mode="horizontal" selectedKeys={[location.pathname]} onClick={({ key }) => navigate(key)} items={menuItems} style={{ background: 'transparent', borderBottom: 'none', fontFamily: 'serif', fontSize: '16px' }} />
          </Col> */}
        </Row>
      </Header>
      <Content style={{ padding: '0', minHeight: 'calc(100vh - 184px)', background: '#fff' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center', background: '#fff' }}>Park Jae Young ©2026</Footer>
    </Layout>
  );
};

export default PublicLayout;