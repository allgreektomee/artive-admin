import React, { useEffect } from "react";
import { Table, Select, Button, Result, Card, Tag } from "antd";
import { ReloadOutlined, TeamOutlined } from "@ant-design/icons";
import { useAdmin } from "../hooks/useAdmin"; // 🚀 관리자 전용 훅 사용

const UserManagement: React.FC = () => {
  // 🚀 useAdmin에서 필요한 데이터를 가져옵니다.
  const { allUsers, loading, error, fetchAllUsers, updateRole } = useAdmin();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "이름", dataIndex: "nickname", key: "nickname" }, // name -> nickname 확인 필요
    { title: "이메일", dataIndex: "email", key: "email" },
    { 
      title: "현재 권한", 
      dataIndex: "role", 
      key: "role",
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "volcano" : "blue"}>
          {role === "ADMIN" ? "관리자" : "일반유저"}
        </Tag>
      )
    },
    { 
      title: "권한 변경", 
      key: "action",
      render: (_: any, record: any) => (
        <Select 
          value={record.role} 
          onChange={(val) => updateRole(record.id, val)} 
          style={{ width: 120 }}
          loading={loading}
        >
          <Select.Option value="USER">일반 사용자</Select.Option>
          <Select.Option value="ADMIN">관리자</Select.Option>
        </Select>
      )
    }
  ];

  if (error) {
    return (
      <Result
        status="warning"
        title="유저 목록을 불러올 수 없습니다"
        subTitle={error}
        extra={<Button type="primary" icon={<ReloadOutlined />} onClick={fetchAllUsers}>다시 시도</Button>}
      />
    );
  }

  return (
    <Card 
      title={<span><TeamOutlined /> 시스템 사용자 관리</span>}
      style={{ margin: "12px" }}
    >
      <Table 
        dataSource={allUsers} 
        columns={columns} 
        loading={loading} 
        rowKey="id" 
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default UserManagement;