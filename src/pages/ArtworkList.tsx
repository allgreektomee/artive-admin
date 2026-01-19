import React, { useEffect } from "react";
import { Table, Button, Space, Tag, Image, Empty, Result } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useArtwork } from "../hooks/useArtwork"; // 🚀 분리한 훅 임포트

const ArtworkList: React.FC = () => {
  const navigate = useNavigate();
  const { artworks, loading, error, fetchArtworks, deleteArtwork, totalElements,currentPage } = useArtwork();

  useEffect(() => {
    fetchArtworks();
  }, []);

  const columns = [
    {
      title: "이미지",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (url: string) => (
        <Image src={url} width={50} height={50} style={{ objectFit: "cover", borderRadius: 4 }} fallback="https://via.placeholder.com/50" />
      ),
    },
    {
      title: "제목",
      dataIndex: "koTitle", // 💡 나중에 다국어 대응 시 언어별로 분기 가능
      key: "koTitle",
    },
    {
      title: "공개 여부",
      dataIndex: "isPublic",
      key: "isPublic",
      render: (isPublic: boolean) => (
        <Tag color={isPublic ? "blue" : "default"}>{isPublic ? "PUBLIC" : "PRIVATE"}</Tag>
      ),
    },
    {
      title: "관리",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => navigate(`/admin/artworks/edit/${record.id}`)}>수정</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => deleteArtwork(record.id)} />
        </Space>
      ),
    },
  ];

  if (error) {
    return (
      <Result
        status="warning"
        title="데이터를 가져올 수 없습니다"
        extra={<Button type="primary" icon={<ReloadOutlined />} onClick={() => fetchArtworks()}>다시 시도</Button>}
      />
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>🎨 작품 관리 목록 ({artworks.length})</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/admin/artworks/post")}>
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