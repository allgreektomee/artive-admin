import React, { useState, useEffect } from "react";
import { Layout, Menu, theme, Spin, Button } from "antd";
import {
  DesktopOutlined,
  FileAddOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  TagsOutlined,
  ReadOutlined,
  FileTextOutlined,
  MessageOutlined,
  MenuOutlined, // 햄버거 버튼용
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자 정보 및 권한 상태
  const { user, isAdmin, loading } = useUser();
  const token = localStorage.getItem("accessToken");

  // 사이드바 접힘 상태 관리
  const [collapsed, setCollapsed] = useState(false);

  // 1. [방어 로직] 토큰이 없으면 로그인으로 이동
  useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [loading, token, navigate]);

  // 2. 권한별 메뉴 구성
  const menuItems = [
    { key: "/admin/dashboard", icon: <DesktopOutlined />, label: "대시보드" },
    { key: "/admin/chat", icon: <MessageOutlined />, label: "채팅" },
    { key: "/admin/profile", icon: <UserOutlined />, label: "내 프로필" },
    {
      key: "/admin/artworks",
      icon: <UnorderedListOutlined />,
      label: "작품 목록",
    },
    {
      key: "/admin/artworks/post",
      icon: <FileAddOutlined />,
      label: "작품 등록",
    },
    { key: "/admin/insight", icon: <ReadOutlined />, label: "인사이트" },
    { key: "/admin/log", icon: <FileTextOutlined />, label: "로그 (Log)" },
    {
      key: "/admin/indexpage",
      icon: <TagsOutlined />,
      label: "목차 관리",
    },
    ...(isAdmin
      ? [
          { type: "divider" as const },
          { key: "/admin/users", icon: <TeamOutlined />, label: "유저 관리" },
          {
            key: "/admin/categories",
            icon: <TagsOutlined />,
            label: "카테고리 관리",
          },  
          {
            key: "/admin/settings",
            icon: <SettingOutlined />,
            label: "시스템 설정",
          },
        ]
      : []),

    { type: "divider" as const },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "로그아웃",
      danger: true,
    },
  ];

  // 3. 로딩 처리
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="사용자 권한 확인 중..." />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sider 핵심 설정:
        - breakpoint="lg": 1024px 미만일 때 반응형 모드 진입
        - collapsedWidth="0": 모바일에서 접혔을 때 너비를 0으로 하여 본문을 가리지 않음
      */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          zIndex: 1001,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255,255,255,.2)",
            borderRadius: 6,
            color: "#fff",
            textAlign: "center",
            lineHeight: "32px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          ARTIVE {isAdmin ? "ADMIN" : "USER"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => {
            if (key === "logout") onLogout();
            else {
              navigate(key);
              // 모바일에서 메뉴 클릭 시 사이드바 자동으로 닫기
              if (window.innerWidth < 992) setCollapsed(true);
            }
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* 모바일용 메뉴 버튼 (사이드바가 0일 때만 보임) */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "18px",
              width: 40,
              height: 40,
            }}
          />

          <div
            style={{
              flex: 1,
              textAlign: "right",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ marginRight: 8 }}>
              <b>{user?.nickname || "방문객"}</b>님
            </span>
            {user && (
              <small
                style={{
                  color: "#888",
                  display: window.innerWidth < 480 ? "none" : "inline",
                }}
              >
                ({user?.role})
              </small>
            )}
          </div>
        </Header>

        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: window.innerWidth < 480 ? 12 : 24, // 모바일에서 패딩 축소
              minHeight: "calc(100vh - 112px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowX: "auto", // 테이블 등 가로 깨짐 방지
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
