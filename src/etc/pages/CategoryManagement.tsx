import React, { useEffect, useState } from "react";
import {
  Tabs,
  List,
  Button,
  Input,
  Form,
  Card,
  message,
  Popconfirm,
  Tag,
} from "antd";
import { DeleteOutlined, PlusOutlined, TagOutlined } from "@ant-design/icons";
import { categoryApi } from "../api/categoryApi";
import type { Category } from "../api/categoryApi";

const CategoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"INSIGHT" | "LOG">("INSIGHT");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 목록 불러오기: GET /api/v1/articles/categories?type=INSIGHT
  const fetchCategories = async (type: "INSIGHT" | "LOG") => {
    setLoading(true);
    try {
      const res = await categoryApi.getByType(type);
      if (res.success) {
        setCategories(res.data);
      }
    } catch (err) {
      message.error("카테고리 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(activeTab);
  }, [activeTab]);

  // 카테고리 추가: POST /api/v1/articles/categories?type=INSIGHT
  const handleAdd = async (values: any) => {
    try {
      const payload = {
        ...values,
        type: activeTab,
        displayOrder: categories.length + 1,
      };

      // 💡 변경: 이제 주소에서 admin이 빠지고 type은 쿼리 파라미터로 전달됩니다.
      const res = await categoryApi.create(activeTab, payload);
      if (res.success) {
        message.success("카테고리가 추가되었습니다.");
        form.resetFields();
        fetchCategories(activeTab);
      }
    } catch (err) {
      message.error("추가 실패");
    }
  };

  // 카테고리 삭제: DELETE /api/v1/articles/categories/{id}
  const handleDelete = async (id: number) => {
    try {
      // 💡 변경: 삭제 API 명세에 맞춰 id만 전달합니다.
      const res = await categoryApi.delete(id);
      if (res.success) {
        message.success("삭제되었습니다.");
        fetchCategories(activeTab);
      }
    } catch (err) {
      message.error("삭제 실패");
    }
  };

  const renderContent = () => (
    <div style={{ maxWidth: 600 }}>
      <div
        style={{
          marginBottom: 24,
          padding: 16,
          background: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <Form form={form} layout="inline" onFinish={handleAdd}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "이름 입력" }]}
          >
            <Input placeholder="카테고리명 (예: Essay)" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "코드 입력" }]}
          >
            <Input placeholder="식별 코드 (예: essay)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              추가
            </Button>
          </Form.Item>
        </Form>
      </div>

      <List
        loading={loading}
        bordered
        dataSource={categories}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                title="정말 삭제하시겠습니까?"
                onConfirm={() => handleDelete(item.id)}
                okText="예"
                cancelText="아니오"
              >
                <Button danger type="text" icon={<DeleteOutlined />}>
                  삭제
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<TagOutlined />}
              title={item.name}
              description={<Tag>{item.code}</Tag>}
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Card title="🗂️ 콘텐츠 카테고리 관리">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as any)}
        items={[
          {
            label: "인사이트 (Insight)",
            key: "INSIGHT",
            children: renderContent(),
          },
          { label: "로그 (Log)", key: "LOG", children: renderContent() },
        ]}
      />
    </Card>
  );
};

export default CategoryManagement;
