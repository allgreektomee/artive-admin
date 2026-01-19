import React from 'react';
import { Layout, Menu, theme, Spin } from 'antd'; // Spin 추가
import { 
  DesktopOutlined, 
  FileAddOutlined, 
  LogoutOutlined, 
  UnorderedListOutlined, 
  TeamOutlined,
  UserOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Auth 훅에서 정보 가져오기
  const { user, isAdmin, loading } = useUser(); // error 상태가 있다고 가정
  const token = localStorage.getItem("accessToken");

  // 1. [방어 로직] 토큰이 아예 없으면 로그인 페이지로 강제 이동
  React.useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [loading, token, navigate]);

  // 2. 권한별 메뉴 구성
  const menuItems = [
    { key: "/admin/dashboard", icon: <DesktopOutlined />, label: "대시보드" },
    { key: "/profile", icon: <UserOutlined />, label: "내 프로필" },
    { key: "/admin/artworks", icon: <UnorderedListOutlined />, label: "작품 목록" },
    { key: "/admin/artworks/post", icon: <FileAddOutlined />, label: "작품 등록" },
    
    // 에러가 났더라도 일단 ADMIN 메뉴를 보여주고 싶다면 아래 조건을 (isAdmin || error)로 조절 가능
    ...(isAdmin ? [
      { type: 'divider' as const }, 
      { key: "/admin/users", icon: <TeamOutlined />, label: "유저 관리" },
      { key: "/admin/settings", icon: <SettingOutlined />, label: "시스템 설정" },
    ] : []),
    
    { type: 'divider' as const },
    { key: "logout", icon: <LogoutOutlined />, label: "로그아웃", danger: true },
  ];

  // 3. [로딩 처리] 정보를 가져오는 중일 때는 전체 화면 Spin 또는 Skeleton
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="사용자 권한 확인 중..." />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ 
          height: 32, margin: 16, background: "rgba(255,255,255,.2)", 
          borderRadius: 6, color: '#fff', textAlign: 'center', lineHeight: '32px',
          fontWeight: 'bold'
        }}>
          ARTIVE {isAdmin ? 'ADMIN' : 'USER'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => {
            if (key === "logout") onLogout();
            else navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer, 
          display: 'flex', 
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: 16 }}>
            {/* user가 없을 때(에러 시)를 대비한 옵셔널 체이닝 */}
            <b>{user?.nickname || '방문객'}</b>님 환영합니다 
            {user && <small style={{ marginLeft: 8, color: '#888' }}>({user?.role})</small>}
          </span>
        </Header>
        <Content style={{ margin: '24px 16px' }}>
          <div style={{ 
            padding: 24, 
            minHeight: 'calc(100vh - 112px)', 
            background: colorBgContainer, 
            borderRadius: borderRadiusLG,
          }}>
            {/* [핵심] 에러가 나도 Outlet은 렌더링되어야 ProfileSetting 안의 에러 UI가 보입니다 */}
            <Outlet /> 
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

/**
 * 
 * 
 * 조건부 렌더링 (Spread Operator):
...(isAdmin ? [...] : []) 문법을 사용하여 isAdmin이 true일 때만 배열에 요소를 추가합니다. 
리액트 실무에서 메뉴 필터링을 할 때 가장 많이 쓰는 깔끔한 방식입니다.

중앙화된 상태 관리:
useAuth에서 이미 토큰 검사와 유저 정보를 가져오기 때문에, 이 레이아웃 안에서 별도의 API 호출 코드를 적을 필요가 없습니다. 
코드가 훨씬 읽기 편해졌죠?

사용자 편의성(UX):
loading 상태일 때 Skeleton을 보여주어 화면이 번쩍이며 바뀌는 현상을 방지했습니다.
헤더에 현재 로그인한 유저의 이름과 역할(Role)을 표시하여 내가 어떤 권한으로 들어왔는지 명확히 알 수 있게 했습니다.

 */