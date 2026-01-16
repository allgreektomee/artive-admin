import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Modal, message, Image, Empty, Result } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const ArtworkList: React.FC = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // 1. 목록 불러오기 (GET /api/v1/artworks)
  const fetchArtworks = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await client.get("/artworks");
      
      // 서버 응답 구조가 response.data.data 일 수도 있고 response.data 일 수도 있음
      const data = response.data?.data || response.data || [];
      setArtworks(Array.isArray(data) ? data : []);
      
    } catch (error) {
      console.error("Fetch Error:", error);
      setError(true);
      message.error("목록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  // 2. 삭제 처리 (DELETE /api/v1/artworks/{id})
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "정말 삭제하시겠습니까?",
      content: "삭제된 작품은 복구할 수 없습니다.",
      okText: "삭제",
      okType: "danger",
      onOk: async () => {
        try {
          await client.delete(`/artworks/${id}`);
          message.success("삭제되었습니다.");
          fetchArtworks();
        } catch (error) {
          message.error("삭제 실패");
        }
      },
    });
  };

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
      dataIndex: "koTitle", // 백엔드 필드명에 따라 title 또는 translations.KO.title 확인 필요
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
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  // 에러 발생 시 UI
  if (error) {
    return (
      <Result
        status="warning"
        title="데이터를 가져올 수 없습니다"
        extra={<Button type="primary" icon={<ReloadOutlined />} onClick={fetchArtworks}>다시 시도</Button>}
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
      />
    </div>
  );
};

export default ArtworkList;