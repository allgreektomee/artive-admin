import React from "react";
import { Layout, Row, Col } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          borderBottom: "1px solid #f0f0f0",
          height: 'auto',
          lineHeight: 'normal',
          position: 'sticky', // 상단 고정 (선택 사항)
          top: 0,
          zIndex: 1000
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <div
              onClick={() => navigate("/")}
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: "22px",
                fontWeight: 800,
                cursor: "pointer",
                padding: '15px 0',
                letterSpacing: '-0.5px'
              }}
            >
              ARTIVE
            </div>
          </Col>
          <Col>
            {/* Menu 컴포넌트 대신 직접 텍스트 배치 */}
            <div 
              onClick={() => navigate("/profile")}
              style={{ 
                fontFamily: 'serif', 
                fontSize: '16px', 
                fontWeight: 500,
                cursor: 'pointer',
                padding: '10px 5px',
                color: '#333'
              }}
            >
              에필로그
            </div>
          </Col>
        </Row>
      </Header>
      
      {/* MagazineHome에서 이미 여백을 조절했으므로 padding은 0 유지 */}
      <Content style={{ minHeight: 'calc(100vh - 120px)', background: '#fff' }}>
        <Outlet />
      </Content>

      {/* MagazineHome 내부에 이미 푸터를 만드셨으므로, 
          레이아웃 중복 방지를 위해 여기 푸터는 제거하거나 아주 간단히 유지합니다. */}
      <Footer style={{ textAlign: 'center', background: '#fff', padding: '20px 0' }}>artive for me ©2026</Footer>
    </Layout>
  );
};

export default PublicLayout;