import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser"; // 🚀 통합 훅 임포트

const { Title } = Typography;

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { login, loading } = useUser(); // 🚀 훅에서 기능 가져오기

  const onFinish = async (values: any) => {
    try {
      // 훅에 정의된 로그인 로직 실행
      const success = await login({
        email: values.email,
        password: values.password,
      });

      if (success) {
        message.success("관리자 인증에 성공했습니다.");
        onLoginSuccess();
        navigate("/admin/dashboard", { replace: true });
      } else {
        message.error("인증 정보가 올바르지 않습니다.");
      }
    } catch (error: any) {
      message.error("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 350, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Title level={3}>Artive Admin</Title>
          <Typography.Text type="secondary">
            관리자 계정으로 로그인하세요
          </Typography.Text>
        </div>

        <Form name="login_form" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "이메일을 입력해주세요!" },
              { type: "email" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Admin Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
