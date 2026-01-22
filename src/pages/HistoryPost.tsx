import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Select,
  Card,
  message,
  Divider,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useHistory } from "../hooks/useHistory";
import { historyApi } from "../api/historyApi";
import type { HistoryCreateRequest } from "../types/history";
// ArtworkUpload 컴포넌트가 있다면 import 하세요.
// import ArtworkUpload from "../components/ArtworkUpload";

const HistoryPost: React.FC = () => {
  const { id: artworkId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading } = useHistory();
  const [form] = Form.useForm();

  // 현재 선택된 타입을 추적하기 위한 상태 (기본값: IMGURL)
  const historyType = Form.useWatch("type", form);
  const [imageUrl, setImageUrl] = useState<string>("");

  const onFinish = async (values: any) => {
    if (!artworkId) return;

    // 최종적으로 서버에 보낼 URL 결정
    // IMGURL 타입이면 직접 관리하는 상태(imageUrl)를 쓰고, 나머지는 폼 입력값(values.imageUrl) 사용
    const finalImageUrl = values.type === "IMGURL" ? imageUrl : values.imageUrl;

    if (!finalImageUrl) {
      return message.warning(
        values.type === "IMGURL"
          ? "이미지를 업로드해주세요."
          : "링크 주소를 입력해주세요.",
      );
    }

    const payload: HistoryCreateRequest = {
      ...values,
      imageUrl: finalImageUrl,
      visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
    };

    try {
      const res = await historyApi.createHistory(Number(artworkId), payload);
      if (res.data.success) {
        message.success("작업 기록이 저장되었습니다.");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      message.error("저장 실패");
    }
  };

  return (
    <Card
      title="📜 작업 기록 추가"
      style={{ maxWidth: 800, margin: "20px auto" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ isPublic: true, type: "IMGURL" }} // 기본값 이미지 업로드
      >
        {/* 다국어 입력 영역 */}
        <Card
          size="small"
          type="inner"
          title="한국어 정보 (KO)"
          style={{ marginBottom: 16 }}
        >
          <Form.Item
            name="koTitle"
            label="기록 제목"
            rules={[{ required: true, message: "제목을 입력하세요" }]}
          >
            <Input placeholder="예: 작업 과정 브이로그 1화" />
          </Form.Item>
          <Form.Item
            name="koContent"
            label="기록 내용"
            rules={[{ required: true, message: "내용을 입력하세요" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="진행된 작업 내용을 상세히 적어주세요."
            />
          </Form.Item>
        </Card>

        <Card
          size="small"
          type="inner"
          title="영어 정보 (EN)"
          style={{ marginBottom: 16 }}
        >
          <Form.Item name="enTitle" label="History Title">
            <Input placeholder="English title" />
          </Form.Item>
          <Form.Item name="enContent" label="History Content">
            <Input.TextArea rows={4} placeholder="English content" />
          </Form.Item>
        </Card>

        <Divider orientation="left">기록 상세 설정</Divider>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item name="type" label="기록 유형" style={{ flex: 1 }}>
            <Select
              onChange={() => {
                // 🚀 타입이 바뀔 때 여기서 직접 초기화하면 에러가 발생하지 않습니다.
                setImageUrl("");
                form.setFieldsValue({ imageUrl: "" });
              }}
              options={[
                { value: "IMGURL", label: "이미지 업로드" },
                { value: "YOUTUBE", label: "유튜브 링크추가" },
                { value: "MANUAL", label: "직접링크 작성" },
              ]}
            />
          </Form.Item>

          <Form.Item name="isPublic" label="공개 여부" valuePropName="checked">
            <Switch checkedChildren="공개" unCheckedChildren="비공개" />
          </Form.Item>
        </div>

        {/* --- 타입에 따른 동적 입력 영역 --- */}
        <div
          style={{
            padding: "20px",
            background: "#fafafa",
            borderRadius: "8px",
            border: "1px solid #f0f0f0",
            marginBottom: "24px",
          }}
        >
          {historyType === "IMGURL" && (
            <Form.Item label="작업 이미지 업로드" required>
              {/* 이미지 업로드 컴포넌트 자리 (기존 ArtworkUpload 재사용 가정) */}
              {/* <ArtworkUpload onUploadSuccess={(url) => setImageUrl(url)} /> */}
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="이미지 업로드 컴포넌트를 연결하거나 URL을 넣으세요"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="미리보기"
                  style={{ width: 120, marginTop: 10, borderRadius: 4 }}
                />
              )}
            </Form.Item>
          )}

          {historyType === "YOUTUBE" && (
            <Form.Item
              name="imageUrl"
              label="유튜브 영상 주소"
              rules={[{ required: true, message: "유튜브 링크를 입력하세요" }]}
            >
              <Input placeholder="https://www.youtube.com/watch?v=..." />
            </Form.Item>
          )}

          {historyType === "MANUAL" && (
            <Form.Item
              name="imageUrl"
              label="참조 링크 주소"
              rules={[{ required: true, message: "연결할 링크를 입력하세요" }]}
            >
              <Input placeholder="https://example.com/external-link" />
            </Form.Item>
          )}
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          size="large"
        >
          기록 저장하기
        </Button>
      </Form>
    </Card>
  );
};

export default HistoryPost;
