import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  message,
  Upload,
  Space,
} from "antd";
import { GlobalOutlined, SaveOutlined, ReadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { insightApi } from "../api/insightApi";
import { categoryApi, Category } from "../api/categoryApi";
import { useImageUpload } from "../hooks/useImageUpload";

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

const InsightPost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 카테고리 목록 상태
  const [categories, setCategories] = useState<Category[]>([]);

  // 이미지 업로드 훅
  const { uploadSingleImage, isUploading } = useImageUpload();
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // 초기 데이터 로드 (카테고리 목록 + 수정 시 상세 정보)
  useEffect(() => {
    const init = async () => {
      try {
        // 1. 카테고리 목록 불러오기 (INSIGHT 타입만)
        const catRes = await categoryApi.getByType("INSIGHT");
        if (catRes.success) {
          setCategories(catRes.data);
        }

        // 2. 수정 모드일 경우 데이터 불러오기
        if (id) {
          const res = await insightApi.getInsight(id);
          if (res.success) {
            form.setFieldsValue(res.data);
            setThumbnailUrl(res.data.thumbnailUrl);
          }
        }
      } catch (e) {
        message.error("초기 데이터를 불러오는데 실패했습니다.");
      }
    };
    init();
  }, [id, form]);

  const handleFileUpload = async (file: File) => {
    const url = await uploadSingleImage(file, "insight");
    if (url) {
      setThumbnailUrl(url);
      message.success("이미지가 업로드되었습니다.");
    }
    return false;
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const payload = {
      ...values,
      thumbnailUrl, // 업로드된 이미지 URL
    };

    try {
      if (id) {
        await insightApi.updateInsight(id, payload);
        message.success("수정되었습니다.");
      } else {
        await insightApi.createInsight(payload);
        message.success("등록되었습니다.");
      }
      navigate("/admin/insights");
    } catch (e) {
      message.error("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 24 }}>
        <ReadOutlined /> {id ? "인사이트 수정" : "새 인사이트 등록"}
      </h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Card title="기본 정보" style={{ marginBottom: 24 }}>
          <Space
            style={{ display: "flex", width: "100%" }}
            direction="vertical"
          >
            {/* 동적 카테고리 선택 */}
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
          </Space>
        </Card>

        <Card title="콘텐츠 연결" style={{ marginBottom: 24 }}>
          <Form.Item label="썸네일 이미지">
            <Dragger beforeUpload={handleFileUpload} showUploadList={false}>
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt="thumbnail"
                  style={{ maxHeight: 150 }}
                />
              ) : (
                <p className="ant-upload-text">클릭하거나 드래그하여 업로드</p>
              )}
            </Dragger>
          </Form.Item>

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
