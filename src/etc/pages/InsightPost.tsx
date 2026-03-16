import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, message, Upload } from "antd";
import { GlobalOutlined, SaveOutlined, ReadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { insightApi } from "../api/insightApi";
import { categoryApi } from "../api/categoryApi";
import type { Category } from "../api/categoryApi";
import { useImageUpload } from "../hooks/useImageUpload";

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

const InsightPost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const { uploadSingleImage, isUploading } = useImageUpload();

  // 미리보기용 상태 (입력창과 동기화됨)
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await categoryApi.getByType("INSIGHT");
        if (catRes.success) {
          setCategories(catRes.data);
        }

        if (id) {
          const res = await insightApi.getInsightDetail(id);
          if (res.success) {
            const data = res.data as any; // 타입 에러 방지를 위해 any 처리
            form.setFieldsValue({
              ...data,
              categoryId: data.category?.id, // 객체에서 ID 추출
              thumbnailUrl: data.thumbnailUrl, // 폼 필드에 URL 세팅
            });
            setThumbnailUrl(data.thumbnailUrl);
          }
        }
      } catch (e) {
        message.error("초기 데이터를 불러오는데 실패했습니다.");
      }
    };
    init();
  }, [id, form]);

  // 파일 업로드 핸들러
  const handleFileUpload = async (file: File) => {
    const url = await uploadSingleImage(file, "insight");
    if (url) {
      setThumbnailUrl(url); // 미리보기 업데이트
      form.setFieldsValue({ thumbnailUrl: url }); // 폼 입력창 값 업데이트
      message.success("이미지가 업로드되었습니다.");
    }
    return false;
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    // categoryId가 객체로 넘어올 경우를 대비한 안전한 처리
    const finalCategoryId =
      typeof values.categoryId === "object"
        ? values.categoryId.id
        : values.categoryId;

    const payload = {
      ...values,
      categoryId: finalCategoryId,
      thumbnailUrl: values.thumbnailUrl, // 폼 입력창의 값을 최종 사용
    };

    try {
      if (id) {
        await insightApi.updateInsight(id, payload);
        message.success("수정되었습니다.");
      } else {
        await insightApi.createInsight(payload);
        message.success("등록되었습니다.");
      }
      navigate("/admin/insight");
    } catch (e) {
      message.error("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 0" }}>
      <h2 style={{ marginBottom: 24 }}>
        <ReadOutlined /> {id ? "인사이트 수정" : "새 인사이트 등록"}
      </h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Card title="기본 정보" style={{ marginBottom: 24 }}>
          <Form.Item
            name="categoryId"
            label="카테고리"
            rules={[{ required: true, message: "카테고리를 선택해주세요." }]}
          >
            <Select placeholder="카테고리 선택">
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.code})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="koTitle"
            label="제목 (국문)"
            rules={[{ required: true }]}
          >
            <Input placeholder="제목을 입력하세요" />
          </Form.Item>

          <Form.Item name="enTitle" label="제목 (영문)">
            <Input placeholder="English Title" />
          </Form.Item>
        </Card>

        <Card title="썸네일 이미지" style={{ marginBottom: 24 }}>
          <Form.Item label="방법 1: 이미지 업로드 (S3)">
            <Dragger beforeUpload={handleFileUpload} showUploadList={false}>
              <p className="ant-upload-text">클릭하거나 드래그하여 업로드</p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="thumbnailUrl"
            label="방법 2: 이미지 URL 직접 입력"
            extra="S3 업로드 시 자동으로 채워지며, 외부 URL을 직접 입력할 수도 있습니다."
          >
            <Input
              prefix={<GlobalOutlined />}
              placeholder="https://..."
              onChange={(e) => setThumbnailUrl(e.target.value)}
              allowClear
            />
          </Form.Item>

          {/* 미리보기 영역 */}
          {thumbnailUrl && (
            <div
              style={{
                marginTop: 16,
                textAlign: "center",
                border: "1px solid #f0f0f0",
                padding: 10,
              }}
            >
              <p style={{ fontSize: 12, color: "#888" }}>미리보기</p>
              <img
                src={thumbnailUrl}
                alt="thumbnail preview"
                style={{
                  maxHeight: 200,
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                onError={() => message.error("이미지 URL이 유효하지 않습니다.")}
              />
            </div>
          )}
        </Card>

        <Card title="상세 연결" style={{ marginBottom: 24 }}>
          <Form.Item
            name="externalUrl"
            label="워드프레스 URL"
            tooltip="iframe으로 보여질 주소"
          >
            <Input
              prefix={<GlobalOutlined />}
              placeholder="https://cms.artivefor.me/..."
            />
          </Form.Item>

          <Form.Item name="summary" label="요약문 (Summary)">
            <TextArea rows={3} placeholder="리스트에 보여질 간단한 설명" />
          </Form.Item>
        </Card>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading || isUploading}
          block
          size="large"
          icon={<SaveOutlined />}
        >
          저장하기
        </Button>
      </Form>
    </div>
  );
};

export default InsightPost;
