import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, message, Upload } from "antd";
import {
  GlobalOutlined,
  SaveOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { logApi } from "../api/logApi";
import { categoryApi } from "../api/categoryApi";
import type { Category } from "../api/categoryApi";
import { useImageUpload } from "../hooks/useImageUpload";

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

const LogPost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const { uploadSingleImage, isUploading } = useImageUpload();

  // 실시간 미리보기 및 상태 관리용
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await categoryApi.getByType("LOG");
        if (catRes.success) {
          setCategories(catRes.data);
        }

        if (id) {
          const res = await logApi.getLogDetail(id);
          if (res.success) {
            const data = res.data as any; // TypeScript 대응
            form.setFieldsValue({
              ...data,
              categoryId: data.category?.id, // 객체에서 ID 추출
              thumbnailUrl: data.thumbnailUrl, // 폼 필드에 URL 주입
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

  const handleFileUpload = async (file: File) => {
    const url = await uploadSingleImage(file, "log"); // log 폴더에 저장
    if (url) {
      setThumbnailUrl(url);
      form.setFieldsValue({ thumbnailUrl: url }); // 입력창에 자동 입력
      message.success("이미지가 업로드되었습니다.");
    }
    return false;
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    const finalCategoryId =
      typeof values.categoryId === "object"
        ? values.categoryId.id
        : values.categoryId;

    const payload = {
      ...values,
      categoryId: finalCategoryId,
      thumbnailUrl: values.thumbnailUrl, // 폼의 thumbnailUrl 필드 값 사용
    };

    try {
      if (id) {
        await logApi.updateLog(id, payload);
        message.success("수정되었습니다.");
      } else {
        await logApi.createLog(payload);
        message.success("등록되었습니다.");
      }
      navigate("/admin/log");
    } catch (e) {
      message.error("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 0" }}>
      <h2 style={{ marginBottom: 24 }}>
        <FileTextOutlined /> {id ? "로그 수정" : "새 로그(Log) 작성"}
      </h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Card title="기본 정보" style={{ marginBottom: 24 }}>
          <Form.Item
            name="categoryId"
            label="로그 카테고리"
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
            <Input placeholder="로그 제목 입력" />
          </Form.Item>

          <Form.Item name="enTitle" label="제목 (영문)">
            <Input placeholder="Log Title" />
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
            extra="S3 업로드 시 자동으로 채워지며, 외부 URL을 바로 입력할 수도 있습니다."
          >
            <Input
              prefix={<GlobalOutlined />}
              placeholder="https://..."
              onChange={(e) => setThumbnailUrl(e.target.value)}
              allowClear
            />
          </Form.Item>

          {/* 미리보기 컨테이너 */}
          {thumbnailUrl && (
            <div
              style={{
                marginTop: 16,
                textAlign: "center",
                border: "1px solid #f0f0f0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
                썸네일 미리보기
              </p>
              <img
                src={thumbnailUrl}
                alt="thumbnail preview"
                style={{
                  maxHeight: 200,
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                onError={() =>
                  message.error("유효하지 않은 이미지 주소입니다.")
                }
              />
            </div>
          )}
        </Card>

        <Card title="콘텐츠 연결" style={{ marginBottom: 24 }}>
          <Form.Item
            name="externalUrl"
            label="워드프레스 URL"
            tooltip="해당 로그의 워드프레스 본문 주소"
          >
            <Input
              prefix={<GlobalOutlined />}
              placeholder="https://cms.artivefor.me/log/..."
            />
          </Form.Item>

          <Form.Item name="summary" label="짧은 설명 (Excerpt)">
            <TextArea rows={3} placeholder="목록에 표시될 내용입니다." />
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
          로그 저장하기
        </Button>
      </Form>
    </div>
  );
};

export default LogPost;
