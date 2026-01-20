import React, { useEffect } from "react";
import { Table, Button, Space, Tag, Image, Empty, Result } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useArtwork } from "../hooks/useArtwork"; // 🚀 분리한 훅 임포트

const ArtworkList: React.FC = () => {
  const navigate = useNavigate();
  const {
    artworks,
    loading,
    error,
    fetchArtworks,
    deleteArtwork,
    totalElements,
    currentPage,
  } = useArtwork();

  useEffect(() => {
    fetchArtworks();
  }, []);

  const columns = [
    {
      title: "이미지",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (url: string) => (
        <Image
          src={url}
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    {
      title: "제목",
      dataIndex: "title", // 🚀 'koTitle'에서 'title'로 변경 (콘솔 데이터 기준)
      key: "title",
    },
    {
      title: "상태",
      dataIndex: "status", // 🚀 'isPublic' 대신 백엔드가 준 'status' 사용
      key: "status",
      render: (status: string) => (
        // status가 'COMPLETED'면 초록색, 아니면 파란색 Tag
        <Tag color={status === "COMPLETED" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "히스토리",
      dataIndex: "totalHistoryCount", // 🚀 콘솔에 찍힌 count 필드 추가하면 좋음
      key: "totalHistoryCount",
      render: (_: any, record: any) => (
        <Space vertical size={4}>
          <div style={{ fontWeight: '500' }}>
            {record.totalHistoryCount || 0}개
          </div>
          <Button 
            size="small" 
            icon={<PlusOutlined />} 
            onClick={() => navigate(`/admin/artworks/${record.id}/history/post`)} // 🚀 히스토리 등록 페이지 경로
          >
            기록 추가
          </Button>
        </Space>
      ),
    },
    {
      title: "관리",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/artworks/edit/${record.id}`)}
          >
            수정
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteArtwork(record.id)}
          />
        </Space>
      ),
    },
  ];

  if (error) {
    return (
      <Result
        status="warning"
        title="데이터를 가져올 수 없습니다"
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => fetchArtworks()}
          >
            다시 시도
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>🎨 작품 관리 목록 ({artworks.length})</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/artworks/post")}
        >
          새 작품 등록
        </Button>
      </div>

      <Table
        dataSource={artworks}
        columns={columns}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: <Empty description="등록된 작품이 없습니다." /> }}
        pagination={{
          current: currentPage,
          total: totalElements,
          pageSize: 10, // ArtworkConstants.PAGE_SIZE와 일치
          onChange: (page) => fetchArtworks(page - 1), // 서버로는 -1 해서 보냄
        }}
      />
    </div>
  );
};

export default ArtworkList;
