import React, { useEffect } from "react";
import { Form, Input, Button, Card, Avatar, Result, Spin,Tag } from "antd";
import { UserOutlined, ReloadOutlined } from "@ant-design/icons";
import { useUser } from "../hooks/useUser";

const ProfileSetting: React.FC = () => {
  // 🚀 통합된 훅에서 필요한 상태와 함수를 가져옵니다.
  const { user, loading, error, fetchMyProfile, updateProfile } = useUser();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMyProfile(); // 페이지 진입 시 내 정보 로드
  }, []);

  useEffect(() => {
    if (user) {
      // 서버에서 받은 데이터를 폼에 채워줍니다.
      form.setFieldsValue({
        nickname: user.nickname, // 백엔드 필드명에 맞춰 수정 (name -> nickname 등)
        bio: user.bio,
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    await updateProfile(values);
  };

  // 1. 로딩 중 UI
  if (loading && !user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <Spin size="large" tip="프로필을 불러오는 중..." />
      </div>
    );
  }

  // 2. 에러 발생 시 UI
  if (error) {
    return (
      <Result
        status="error"
        title="문제가 발생했습니다"
        subTitle={error}
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={fetchMyProfile}>
            다시 시도
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <Card title="내 프로필 정보 관리">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Avatar
              size={100}
              src={user?.profileImageUrl}
              icon={<UserOutlined />}
            />
            <p style={{ marginTop: 12, fontWeight: "bold", fontSize: "16px" }}>
              {user?.email}
            </p>
            <Tag color="blue">{user?.role}</Tag>
          </div>

          <Form.Item
            name="nickname"
            label="활동명 (닉네임)"
            rules={[{ required: true, message: "활동명을 입력하세요" }]}
          >
            <Input placeholder="표시될 이름을 입력하세요" />
          </Form.Item>

          <Form.Item name="bio" label="자기소개">
            <Input.TextArea rows={4} placeholder="작가 소개 또는 상태 메시지를 입력하세요" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            변경사항 저장
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileSetting;