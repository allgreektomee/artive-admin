import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Tabs,
  DatePicker,
  Select,
  Switch,
  Upload,
  message,
  Card,
  Space,
  Image,
} from "antd";
import {
  InboxOutlined,
  SaveOutlined,
  LinkOutlined,
  PictureOutlined,
  DeleteOutlined,
  PlusOutlined,
  MenuOutlined,
} from "@ant-design/icons";
// 순서 변경을 위한 dnd-kit import
import { DndContext, closestCenter , type DragEndEvent} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import client from "../api/client";
import { LanguageCode, WorkStatus, WorkStatusLabels } from "../types";
import imageCompression from "browser-image-compression";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

// 드래그 가능한 아이템 컴포넌트
const SortableItem = ({
  id,
  url,
  onRemove,
}: {
  id: string;
  url: string;
  onRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: "#fff",
    border: "1px solid #d9d9d9",
    borderRadius: "8px",
    gap: "12px",
    marginBottom: "8px",
    cursor: "default",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        {...listeners}
        style={{ cursor: "grab", display: "flex", alignItems: "center" }}
      >
        <MenuOutlined style={{ color: "#999" }} />
      </div>
      <Image
        src={url}
        width={48}
        height={48}
        style={{ objectFit: "cover", borderRadius: "4px" }}
        fallback="Error"
      />
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: "14px",
        }}
      >
        {url}
      </div>
      <Button type="text" danger icon={<DeleteOutlined />} onClick={onRemove} />
    </div>
  );
};

const ArtworkPost: React.FC = () => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState<string[]>([]); // 모든 이미지 URL 통합 관리
  const [loading, setLoading] = useState(false);

  // 드래그 종료 시 순서 변경 처리
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImageList((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // URL 추가 핸들러
  const addExternalUrl = () => {
    const url = form.getFieldValue("urlInput");
    if (!url) return;
    setImageList([...imageList, url]);
    form.setFieldsValue({ urlInput: "" });
  };

  // 파일 업로드 핸들러 (파일을 잡자마자 S3로 보내고 URL 리스트에 추가)
  const handleFileUpload = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp" as const,
      };
      const compressedFile = await imageCompression(file, options);
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("category", "artwork");

      const response = await client.post("/images/upload", formData);
      const url = Array.isArray(response.data)
        ? response.data[0]?.imageUrl
        : response.data?.imageUrl;

      if (url) {
        setImageList((prev) => [...prev, url]);
        message.success("이미지가 업로드되었습니다.");
      }
    } catch (error) {
      message.error("업로드 실패");
    }
    return false; // 기본 업로드 동작 중단
  };

  const onFinish = async (values: any) => {
    if (imageList.length === 0)
      return message.warning("이미지를 등록해주세요.");
    setLoading(true);
    try {
      const [startedAt, finishedAt] = values.workPeriod || [null, null];
      const requestData = {
        thumbnailUrl: imageList[0],
        imageUrls: imageList, // 변경된 순서 그대로 저장
        medium: values.medium,
        size: values.size,
        status: values.status,
        startedAt: startedAt?.format("YYYY-MM-DD"),
        finishedAt: finishedAt?.format("YYYY-MM-DD"),
        visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
        translations: {
          [LanguageCode.KO]: {
            title: values.koTitle,
            description: values.koDesc,
          },
          [LanguageCode.EN]: {
            title: values.enTitle,
            description: values.enDesc,
          },
        },
      };
      await client.post("/artworks", requestData);
      message.success("작품이 저장되었습니다!");
      form.resetFields();
      setImageList([]);
    } catch (error) {
      message.error("저장 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 1000, margin: "20px auto" }}
    >
      <Card
        title={
          <span>
            <PictureOutlined /> 작품 등록
          </span>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <section>
            <span
              style={{
                display: "block",
                marginBottom: 12,
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              작품 이미지 등록
            </span>

            {/* 1. URL 입력 필드 (상단) */}
            <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
              <Form.Item name="urlInput" noStyle>
                <Input
                  prefix={<LinkOutlined />}
                  placeholder="이미지 URL을 입력하고 추가를 누르세요"
                  onPressEnter={(e) => {
                    e.preventDefault();
                    addExternalUrl();
                  }}
                />
              </Form.Item>
              <Button
                type="primary"
                onClick={addExternalUrl}
                icon={<PlusOutlined />}
              >
                추가
              </Button>
            </Space.Compact>

            {/* 2. 파일 업로드 Dragger (중간) */}
            <Dragger
              beforeUpload={handleFileUpload}
              showUploadList={false}
              multiple={true}
              style={{ marginBottom: 20 }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                클릭하거나 파일을 드래그하여 리스트에 추가
              </p>
            </Dragger>

            {/* 3. 통합 이미지 리스트 (하단 - 순서 변경 가능) */}
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={imageList}
                strategy={verticalListSortingStrategy}
              >
                {imageList.map((url, index) => (
                  <SortableItem
                    key={url + index}
                    id={url}
                    url={url}
                    onRemove={() =>
                      setImageList(imageList.filter((_, i) => i !== index))
                    }
                  />
                ))}
              </SortableContext>
            </DndContext>

            {imageList.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  background: "#f5f5f5",
                  borderRadius: "8px",
                  color: "#999",
                }}
              >
                등록된 이미지가 없습니다.
              </div>
            )}
          </section>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            <Form.Item
              name="status"
              label="작업 상태"
              rules={[{ required: true }]}
            >
              <Select>
                {Object.entries(WorkStatus).map(([key, value]) => (
                  <Select.Option key={key} value={value}>
                    {WorkStatusLabels[value as keyof typeof WorkStatusLabels]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="workPeriod" label="작업 기간">
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="medium" label="재료 (Medium)">
              <Input />
            </Form.Item>
            <Form.Item name="size" label="규격 (Size)">
              <Input />
            </Form.Item>
          </div>
        </div>
      </Card>

      {/* 다국어 정보 등 나머지 카드 생략 (기존과 동일) */}
      <Card title="🌐 다국어 정보" style={{ marginTop: 24 }}>
        <Tabs
          type="card"
          items={[
            {
              key: LanguageCode.KO,
              label: "한국어 (KO)",
              children: (
                <div style={{ padding: "16px 0" }}>
                  <Form.Item
                    name="koTitle"
                    label="작품 제목"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="koDesc" label="작품 설명">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </div>
              ),
            },
            {
              key: LanguageCode.EN,
              label: "English (EN)",
              children: (
                <div style={{ padding: "16px 0" }}>
                  <Form.Item
                    name="enTitle"
                    label="Title"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="enDesc" label="Description">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </div>
              ),
            },
          ]}
        />
      </Card>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Form.Item name="isPublic" valuePropName="checked" noStyle>
          <Switch checkedChildren="PUBLIC" unCheckedChildren="PRIVATE" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          icon={<SaveOutlined />}
          style={{ minWidth: 200 }}
        >
          작품 등록 완료
        </Button>
      </div>
    </Form>
  );
};

export default ArtworkPost;
