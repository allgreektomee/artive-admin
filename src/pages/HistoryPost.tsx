import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Select,
  Card,
  message,
  Divider,
  Upload,
  Spin,
} from "antd";
import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useHistory } from "../hooks/useHistory";
import { useImageUpload } from "../hooks/useImageUpload"; // 🚀 기존 업로드 훅 임포트
import { historyApi } from "../api/historyApi";
import type { HistoryCreateRequest } from "../types/history";

const { Dragger } = Upload;

const HistoryPost: React.FC = () => {
  const { id: artworkId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading: saveLoading } = useHistory();
  const [form] = Form.useForm();

  // 🚀 이미지 업로드 관련 훅
  const { uploadSingleImage, isUploading } = useImageUpload();
  const [s3Url, setS3Url] = useState<string>(""); // S3에서 받은 URL 저장용

  const historyType = Form.useWatch("type", form);

  // 🚀 파일 선택 시 S3로 즉시 업로드하는 핸들러
  const handleFileUpload = async (file: File) => {
    try {
      const url = await uploadSingleImage(file, "history"); // S3의 history 폴더에 저장
      if (url) {
        setS3Url(url); // 성공 시 URL 상태 업데이트
        message.success("이미지가 성공적으로 업로드되었습니다.");
      }
    } catch (error) {
      message.error("이미지 업로드 중 오류가 발생했습니다.");
    }
    return false; // 안트디자인 기본 업로드 동작 중단
  };

  const onFinish = async (values: any) => {
    console.log("버튼 클릭됨! 입력값:", values);
    if (!artworkId) {
      console.error("작품 ID가 없습니다.");
      return;
    }

    // 💡 핵심 로직: 타입에 따라 URL 소스 결정
    const finalImageUrl = values.type === "IMGURL" ? s3Url : values.imageUrl;

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
        message.success("기록이 저장되었습니다.");
        navigate(-1);
      }
    } catch (err) {
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
        initialValues={{ isPublic: true, type: "IMGURL" }}
        onFinishFailed={(errorInfo) => console.log("검증 실패:", errorInfo)}
      >
        {/* 한국어/영어 입력 필드 (기존과 동일) */}
        {/* ... (생략) ... */}

        <Divider>기록 상세 설정</Divider>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item name="type" label="기록 유형" style={{ flex: 1 }}>
            <Select
              onChange={() => {
                setS3Url("");
                form.setFieldValue("imageUrl", "");
              }}
              options={[
                { value: "IMGURL", label: "이미지 직접 업로드" },
                { value: "YOUTUBE", label: "유튜브 링크 추가" },
                { value: "MANUAL", label: "직접 링크 작성" },
              ]}
            />
          </Form.Item>
          <Form.Item name="isPublic" label="공개 여부" valuePropName="checked">
            <Switch checkedChildren="공개" unCheckedChildren="비공개" />
          </Form.Item>
        </div>

        {/* 🖼️ 타입별 입력 UI 분기 */}
        <div
          style={{
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #eee",
            marginBottom: 24,
          }}
        >
          {historyType === "IMGURL" ? (
            <Form.Item label="작업 사진 업로드" required>
              <Spin
                spinning={isUploading}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              >
                <Dragger
                  beforeUpload={handleFileUpload}
                  showUploadList={false}
                  style={{ background: "#fff" }}
                >
                  {s3Url ? (
                    <div style={{ padding: "10px" }}>
                      <img
                        src={s3Url}
                        alt="업로드 미리보기"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          borderRadius: "4px",
                        }}
                      />
                      <p style={{ marginTop: 8, color: "#1890ff" }}>
                        파일 교체하려면 클릭하거나 드래그하세요
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="ant-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="ant-upload-text">
                        이미지 파일을 이곳에 드래그하거나 클릭하세요
                      </p>
                      <p className="ant-upload-hint">
                        1개 파일만 업로드 가능합니다 (S3 저장)
                      </p>
                    </>
                  )}
                </Dragger>
              </Spin>
            </Form.Item>
          ) : (
            <Form.Item
              name="imageUrl"
              label={
                historyType === "YOUTUBE" ? "유튜브 영상 URL" : "외부 참조 URL"
              }
              rules={[{ required: true, message: "URL을 입력해주세요" }]}
            >
              <Input
                placeholder="https://..."
                prefix={<PictureOutlined style={{ color: "#ccc" }} />}
              />
            </Form.Item>
          )}
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={saveLoading}
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
