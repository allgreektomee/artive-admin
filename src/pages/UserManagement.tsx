// src/pages/UserManagement.tsx
import React from "react";
import { Table, Select, Button, Result } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useUserManagement } from "../hooks/useUserManagement"; // 여기서 파일을 못 찾았던 것!

const UserManagement: React.FC = () => {
  // 훅에서 데이터와 함수를 빌려옵니다.
  const { users, loading, error, fetchUsers, updateRole } = useUserManagement();

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "이름", dataIndex: "name", key: "name" },
    { title: "이메일", dataIndex: "email", key: "email" },
    { 
      title: "권한", 
      dataIndex: "role", 
      key: "role",
      render: (role: string, record: any) => (
        <Select 
          defaultValue={role} 
          onChange={(val) => updateRole(record.id, val)} 
          style={{ width: 100 }}
        >
          <Select.Option value="USER">USER</Select.Option>
          <Select.Option value="ADMIN">ADMIN</Select.Option>
        </Select>
      )
    }
  ];

  if (error) {
    return (
      <Result
        status="warning"
        title="데이터를 가져올 수 없습니다"
        extra={<Button type="primary" icon={<ReloadOutlined />} onClick={fetchUsers}>다시 시도</Button>}
      />
    );
  }

  return <Table dataSource={users} columns={columns} loading={loading} rowKey="id" />;
};

export default UserManagement;