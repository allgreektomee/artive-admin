import { useEffect } from "react";
import { Table, Button, Space, Tag, Image, Empty, Result, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useArtwork } from "../hooks/useArtwork.js";

const LIST_BASE = "/dev/react-test/artworks";

/**
 * reactTestProject: 실제 목록·페이지 조회만 동작.
 * 등록·수정·삭제는 운영 API를 건드리지 않도록 막고 alert 만 띄움 (실제 호출 코드는 주석).
 *
 * 확장자 .jsx = 자바스크립트 + JSX (타입스크립트 아님). Vite/배포 시 JSX 변환 대상.
 */
export default function ArtworkListPage() {
  const navigate = useNavigate();
  const { artworks, loading, error, fetchArtworks, totalElements, currentPage } = useArtwork();

  useEffect(() => {
    fetchArtworks(0);
  }, [fetchArtworks]);

  const columns = [
    {
      title: "이미지",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (url) => (
        <Image
          src={url}
          width={50}
          height={50}
          style={{ objectFit: "cover", borderRadius: 4 }}
          fallback="https://via.placeholder.com/50?text=No+Img"
        />
      ),
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "COMPLETED" ? "green" : "blue"}>{status}</Tag>,
    },
    {
      title: "히스토리",
      dataIndex: "totalHistoryCount",
      key: "totalHistoryCount",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 4, fontWeight: "bold" }}>{record.totalHistoryCount || 0}개</div>
          <Tooltip title="reactTestProject에서는 히스토리 화면으로 이동하지 않습니다.">
            <Button size="small" disabled>
              (비활성)
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "관리",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => navigate(`${LIST_BASE}/${record.id}`)}
          >
            상세
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              window.alert(
                "[reactTestProject]\n실제 수정·저장은 비활성화되어 있습니다.\n(실제 코드: navigate(`/admin/artworks/edit/${id}`))",
              );
            }}
          >
            수정
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              window.alert(
                "[reactTestProject]\n실제 삭제 API는 호출하지 않습니다.\n(실제 코드: deleteArtwork(record.id))",
              );
            }}
          >
            삭제
          </Button>
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
          <Button type="primary" icon={<ReloadOutlined />} onClick={() => fetchArtworks(0)}>
            다시 시도
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>
          reactTestProject · 작품 목록 ({artworks.length})
        </h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            window.alert(
              "[reactTestProject]\n실제 등록 화면으로 이동하지 않습니다.\n(실제 코드: navigate(`/admin/artworks/post`))",
            );
          }}
        >
          새 작품 등록
        </Button>
      </div>
      <p style={{ color: "#666", marginBottom: 16, fontSize: 13 }}>
        목록·상세 조회는 동작합니다. 등록·수정·삭제는 alert 만 뜹니다.
      </p>

      <Table
        dataSource={artworks}
        columns={columns}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: <Empty description="등록된 작품이 없습니다." /> }}
        pagination={{
          current: currentPage,
          total: totalElements,
          pageSize: 10,
          onChange: (page) => fetchArtworks(page - 1),
        }}
      />
    </div>
  );
}
