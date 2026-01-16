import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Table, Tag, Button, Alert, Space, message, Skeleton } from "antd";
import {
  UserOutlined,
  PictureOutlined,
  WarningOutlined,
  GlobalOutlined,
  ArrowUpOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

// 유저 데이터 타입 정의
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  artworkCount?: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtworks: 0,
    pendingTranslations: 0,
    reports: 0,
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  // 데이터 가져오기 (API 호출)
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. 유저 목록 가져오기 (GET /api/v1/admin/users)
      const userRes = await client.get("/admin/users");
      const allUsers = userRes.data.data || userRes.data;
      
      setRecentUsers(allUsers.slice(0, 5)); // 최근 5명만 표시
      
      // 2. 통계 데이터 가공 (실제 통계 API가 없을 경우 목록 데이터로 계산)
      setStats({
        totalUsers: allUsers.length,
        totalArtworks: 85, // 예시 (실제 API: GET /api/v1/artworks 활용 가능)
        pendingTranslations: 12, // 다국어 확장(JP/CN) 관련 미완성 건수
        reports: 2,
      });
    } catch (error) {
      console.error("대시보드 로드 실패:", error);
      message.error("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 유저 테이블 컬럼 설정
  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "권한",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "volcano" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => date?.split("T")[0],
    },
  ];

  if (loading && stats.totalUsers === 0) return <Skeleton active style={{ padding: 24 }} />;

  return (
    <div style={{ padding: "12px" }}>
      <h2 style={{ marginBottom: 24 }}>🚀 시스템 관리 대시보드</h2>

      {/* 상단 알림 영역 */}
      {stats.pendingTranslations > 0 && (
        <Alert
          message="다국어 작업 알림"
          description={`현재 일본어(JA) 및 중국어(ZH) 번역이 필요한 작품이 ${stats.pendingTranslations}건 있습니다.`}
          type="info"
          showIcon
          closable
          style={{ marginBottom: 24 }}
        />
      )}

      {/* 핵심 지표 (Statistics) */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="총 가입 유저"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="전체 작품 수"
              value={stats.totalArtworks}
              prefix={<PictureOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="미번역 항목"
              value={stats.pendingTranslations}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="신고/문의"
              value={stats.reports}
              prefix={<WarningOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* 최근 유저 목록 (Table) */}
        <Col xs={24} xl={16}>
          <Card 
            title="최근 가입 유저" 
            extra={<Button onClick={() => navigate("/admin/users")}>전체보기</Button>}
            style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          >
            <Table
              dataSource={recentUsers}
              columns={columns}
              rowKey="id"
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* 퀵 액션 및 설정 (Quick Actions) */}
        <Col xs={24} xl={8}>
          <Card title="시스템 설정 및 관리" style={{ borderRadius: "8px" }}>
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              <Button 
                block 
                icon={<PictureOutlined />} 
                onClick={() => navigate("/admin/artworks/post")}
              >
                새 공지/작품 등록
              </Button>
              <Button block icon={<GlobalOutlined />}>
                다국어(KO/EN/JA/CN) 사전 관리
              </Button>
              <Button block icon={<SettingOutlined />}>
                S3 스토리지 모니터링
              </Button>
              <div style={{ marginTop: 16, borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
                <Button block danger type="dashed">
                  시스템 긴급 점검 모드
                </Button>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;