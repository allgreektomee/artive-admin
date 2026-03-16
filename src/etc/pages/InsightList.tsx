import React, { useEffect } from "react";
import { Table, Button, Space, Image, Empty, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useInsight } from "../hooks/useInsight";

const InsightList: React.FC = () => {
  const navigate = useNavigate();
  const {
    insight,
    loading,
    getInsightList,
    deleteInsight,
    totalElements,
    currentPage,
  } = useInsight();

  useEffect(() => {
    getInsightList(0);
  }, [getInsightList]);

  const columns = [
    {
      title: "이미지",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (url: string) => (
        <Image
          src={url}
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: 4 }}
          fallback="https://via.placeholder.com/60?text=No+Img"
        />
      ),
    },
    {
      title: "카테고리",
      key: "category",
      render: (_: any, record: any) => (
        // 백엔드 응답에 따라 record.category.name 또는 record.categoryName 사용
        <Tag color={record.type === "INSIGHT" ? "blue" : "cyan"}>
          {/* record.category 객체 안의 name 필드를 읽음 */}
          {record.category?.name || "미지정"}
        </Tag>
      ),
    },
    {
      title: "제목 (KO)",
      dataIndex: "koTitle",
      key: "koTitle",
    },
    {
      title: "관리",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() =>
              navigate(`/admin/insight/${record.id}`, { state: { record } })
            }
          >
            수정
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteInsight(record.id)}
          />
        </Space>
      ),
    },
  ];

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
        <h2>📖 인사이트 관리 ({totalElements})</h2>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => getInsightList(currentPage - 1)}
          >
            새로고침
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/admin/insight/post")}
          >
            새 인사이트 등록
          </Button>
        </Space>
      </div>

      <Table
        dataSource={insight}
        columns={columns}
        loading={loading}
        rowKey="id"
        locale={{
          emptyText: <Empty description="등록된 인사이트가 없습니다." />,
        }}
        pagination={{
          current: currentPage,
          total: totalElements,
          pageSize: 10,
          onChange: (page) => getInsightList(page - 1),
        }}
      />
    </div>
  );
};

export default InsightList;
