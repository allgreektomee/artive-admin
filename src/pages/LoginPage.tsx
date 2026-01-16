// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 백엔드 로그인 API 호출
      const response = await client.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      // 2. 백엔드 응답에서 토큰 추출 (응답 구조에 따라 response.data.accessToken 등으로 확인)
      const  accessToken  = response.data.data.accessToken;
      console.log("추출된 토큰:", accessToken);
      if (accessToken) {
        // 3. 로컬 스토리지에 저장 (client.ts에서 'accessToken'이라는 키로 꺼내쓰기로 했으므로 동일하게 설정)
        localStorage.setItem("accessToken", accessToken);

        message.success("관리자 인증에 성공했습니다.");
        onLoginSuccess();
        // 2. 주소창을 대시보드로 강제 이동 (중요!)
        navigate("/admin/dashboard", { replace: true });
      } else {
        message.error("토큰을 받아오지 못했습니다.");
        
      }
      
    } catch (error: any) {
      console.error(error);
      message.error("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    } finally {
      setLoading(false);
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
