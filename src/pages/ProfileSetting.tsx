import React, { useEffect } from "react";
import { Form, Input, Button, Card, Avatar, Result, Spin, Divider } from "antd";
import { UserOutlined, ReloadOutlined } from "@ant-design/icons";
import { useProfile } from "../hooks/useProfile";

const ProfileSetting: React.FC = () => {
  const { profile, loading, error, loadProfile, handleUpdate } = useProfile();
  const [form] = Form.useForm();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.profile?.name,
        bio: profile.profile?.bio,
        email: profile.email,
      });
    }
  }, [profile, form]);

  // 1. 데이터 로딩 중 UI
  if (loading && !profile) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
  }

  // 2. 에러 발생 시 UI (가장 중요!)
  if (error) {
    return (
      <Result
        status={error === "FORBIDDEN" ? "403" : "500"}
        title={error === "FORBIDDEN" ? "접근 권한이 없습니다" : "문제가 발생했습니다"}
        subTitle="서버와 연결이 원활하지 않거나 인증이 만료되었을 수 있습니다."
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={loadProfile}>
            다시 시도
          </Button>
        }
      />
    );
  }

  // 3. 정상 렌더링 UI
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card title="내 프로필 정보 관리">
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar size={80} src={profile?.profile?.thumbnailUrl} icon={<UserOutlined />} />
            <p style={{ marginTop: 8, color: '#888' }}>{profile?.email}</p>
          </div>

          <Form.Item name="name" label="활동명" rules={[{ required: true, message: '이름을 입력하세요' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="bio" label="자기소개">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            변경사항 저장
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileSetting;