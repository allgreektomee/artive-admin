import React, { useEffect } from "react";
import { Card, Row, Col, Statistic, Table, Tag, Button, Alert, Space, Skeleton } from "antd";
import {
  UserOutlined,
  PictureOutlined,
  WarningOutlined,
  GlobalOutlined,

} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin"; // 🚀 분리한 훅 사용

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  // 훅에서 데이터와 함수를 가져옵니다.
  const { stats, recentUsers, loading, fetchDashboardData } = useAdmin();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 테이블 컬럼 설정
  const columns = [
    { title: "이름", dataIndex: "nickname", key: "name", render: (text: string) => <a>{text || '이름 없음'}</a> },
    { title: "이메일", dataIndex: "email", key: "email" },
    {
      title: "권한",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "volcano" : "blue"}>{role}</Tag>
      ),
    },
    { title: "가입일", dataIndex: "createdAt", key: "createdAt", render: (date: string) => date?.split("T")[0] },
  ];

  if (loading && stats.totalUsers === 0) return <Skeleton active style={{ padding: 24 }} />;

  return (
    <div style={{ padding: "12px" }}>
      <h2 style={{ marginBottom: 24 }}>🚀 시스템 관리 대시보드</h2>

      {/* 1. 다국어 알림 영역 */}
      {stats.pendingTranslations > 0 && (
        <Alert
          message="다국어 작업 알림"
          description={`현재 일본어(JA) 및 중국어(ZH) 번역이 필요한 작품이 ${stats.pendingTranslations}건 있습니다.`}
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/* 2. 핵심 지표 카드 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable><Statistic title="총 가입 유저" value={stats.totalUsers} prefix={<UserOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable><Statistic title="전체 작품 수" value={stats.totalArtworks} prefix={<PictureOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable><Statistic title="미번역 항목" value={stats.pendingTranslations} prefix={<GlobalOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable><Statistic title="신고/문의" value={stats.reports} prefix={<WarningOutlined />} /></Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* 3. 최근 유저 목록 (최근 5명) */}
        <Col xs={24} xl={16}>
          <Card title="최근 가입 유저" extra={<Button onClick={() => navigate("/admin/users")}>전체보기</Button>}>
            <Table
              dataSource={recentUsers} // 🚀 훅에서 받은 데이터 연결
              columns={columns}
              rowKey="id"
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* 4. 퀵 액션 */}
        <Col xs={24} xl={8}>
          <Card title="시스템 설정">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button block icon={<PictureOutlined />} onClick={() => navigate("/admin/artworks/post")}>새 작품 등록</Button>
              <Button block icon={<GlobalOutlined />}>다국어 사전 관리</Button>
              <Button block danger type="dashed">시스템 점검</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;