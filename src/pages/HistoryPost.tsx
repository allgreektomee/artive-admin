import React, { useState } from "react";
import { Form, Input, Button, Switch, Select, Card, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useHistory } from "../hooks/useHistory";
import { historyApi } from "../api/historyApi";
import type { HistoryCreateRequest } from "../types/history";

const HistoryPost: React.FC = () => {
  const { id: artworkId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading } = useHistory();
  const [form] = Form.useForm();
  
  // 이미지 업로드 로직이 추가될 상태 (일단 빈 문자열 처리)
  const [imageUrl, setImageUrl] = useState<string>("");

  const onFinish = async (values: any) => {
    if (!artworkId) return;

    // 백엔드 HistoryCreateRequest 구조에 맞게 매핑
    const payload: HistoryCreateRequest = {
      ...values,
      imageUrl: imageUrl || "", // 업로드된 URL 사용
      visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
    };

    try {
      const res = await historyApi.createHistory(Number(artworkId), payload);
      if (res.data.success) {
        message.success("기록이 저장되었습니다.");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      message.error("저장 실패");
    }
  };

  return (
    <Card title="📜 작업 기록 추가" style={{ maxWidth: 800, margin: "20px auto" }}>
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onFinish} 
        initialValues={{ isPublic: true, type: "MANUAL" }}
      >
        {/* 한국어 입력 세트 */}
        <Form.Item name="koTitle" label="기록 제목 (KO)" rules={[{ required: true, message: '제목을 입력하세요' }]}>
          <Input placeholder="예: 유튜브 작업 브이로그 업로드" />
        </Form.Item>
        <Form.Item name="koContent" label="기록 내용 (KO)" rules={[{ required: true, message: '내용을 입력하세요' }]}>
          <Input.TextArea rows={4} placeholder="오늘의 작업 일지를 작성하세요." />
        </Form.Item>

        <hr style={{ border: "0.5px solid #eee", margin: "24px 0" }} />

        {/* 영어 입력 세트 */}
        <Form.Item name="enTitle" label="기록 제목 (EN)">
          <Input placeholder="History Title" />
        </Form.Item>
        {/* 🚀 중요: enDescription을 enContent로 변경 (백엔드 DTO와 일치) */}
        <Form.Item name="enContent" label="기록 내용 (EN)">
          <Input.TextArea rows={4} placeholder="History Content" />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item name="type" label="기록 유형" style={{ flex: 1 }}>
            <Select options={[
              { value: "MANUAL", label: "직접 작성" }, 
              { value: "YOUTUBE", label: "유튜브" }
            ]} />
          </Form.Item>

          <Form.Item name="isPublic" label="공개 여부" valuePropName="checked">
            <Switch checkedChildren="공개" unCheckedChildren="비공개" />
          </Form.Item>
        </div>

        {/* 이미지 URL 입력 (실제 업로드 컴포넌트로 대체 가능) */}
        <Form.Item label="이미지 URL">
          <Input 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="이미지 주소를 입력하세요" 
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block size="large">
          기록 저장하기
        </Button>
      </Form>
    </Card>
  );
};

export default HistoryPost;