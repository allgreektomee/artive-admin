import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Space, Input, Card, Typography } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useIndexPage } from "../hooks/useIndexPage";
//import dayjs from "dayjs";

const { Title } = Typography;

const IndexPageList: React.FC = () => {
  const { fetchIndexPages, data, loading } = useIndexPage();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchIndexPages(currentPage - 1, pageSize);
  }, [currentPage, fetchIndexPages]);

  // 테이블 컬럼 정의
  const columns = [
    {
      title: "Issue No",
      dataIndex: "header",
      key: "issueNo",
      render: (header: any) => <Tag color="blue" style={{ fontSize: '14px', padding: '2px 8px' }}>{header.issueNo}</Tag>,
    },
    {
      title: "Main Title",
      dataIndex: "header",
      key: "mainTitle",
      render: (header: any) => <b>{header.mainTitle}</b>,
    },
    {
      title: "Description",
      dataIndex: "header",
      key: "description",
      ellipsis: true,
      render: (header: any) => <span style={{ color: '#888' }}>{header.description}</span>,
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "itemsCount",
      render: (items: any[]) => `${items?.length || 0} pieces`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button size="small" icon={<EyeOutlined />} onClick={() => window.open(`/sewhajung?issue=${record.header.issueNo}`, '_blank')}>
            Preview
          </Button>
          <Button size="small" icon={<EditOutlined />} type="primary" ghost>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <Card 
        title={<Title level={4} style={{ margin: 0 }}>아카이브 관리 목록</Title>}
        extra={
          <Input.Search
            placeholder="IssueNo 검색 (예: 2026-03)"
            onSearch={(value) => console.log("검색:", value)} // 추후 검색 API 연결
            style={{ width: 250 }}
            enterButton
          />
        }
      >
        <Table
          columns={columns}
          dataSource={data?.content || []} // Spring Page 객체의 content 사용
          rowKey={(record) => record.header.issueNo}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.totalElements || 0,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
            position: ['bottomCenter']
          }}
        />
      </Card>
    </div>
  );
};

export default IndexPageList;