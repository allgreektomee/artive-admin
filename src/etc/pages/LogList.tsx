import React, { useEffect } from "react";
import { Table, Button, Space, Image, Empty, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLog } from "../hooks/useLog";

const LogList: React.FC = () => {
  const navigate = useNavigate();
  const { log, loading, fetchLog, deleteLog, totalElements, currentPage } =
    useLog();

  useEffect(() => {
    fetchLog(0);
  }, [fetchLog]);

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
        <Tag color="cyan" icon={<FileTextOutlined />}>
          {record.category?.name || record.categoryName || "Log"}
        </Tag>
      ),
    },
    {
      title: "제목",
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
            onClick={() => navigate(`/admin/log/${record.id}`)}
          >
            수정
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteLog(record.id)}
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
        <h2>📝 로그 관리 ({totalElements})</h2>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchLog(currentPage - 1)}
          >
            새로고침
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/admin/log/post")}
          >
            새 로그 등록
          </Button>
        </Space>
      </div>

      <Table
        dataSource={log}
        columns={columns}
        loading={loading}
        rowKey="id"
        locale={{ emptyText: <Empty description="등록된 로그가 없습니다." /> }}
        pagination={{
          current: currentPage,
          total: totalElements,
          pageSize: 10,
          onChange: (page) => fetchLog(page - 1),
        }}
      />
    </div>
  );
};

export default LogList;
