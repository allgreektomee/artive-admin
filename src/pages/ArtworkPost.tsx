import React from "react";
import { Form, Input, Button, Tabs, DatePicker, Select, Switch, Upload, message, Card, Space } from "antd";
import { InboxOutlined, SaveOutlined, LinkOutlined, PictureOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// DND 관련
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

// 커스텀 훅 및 타입
import { useArtwork } from "../hooks/useArtwork";
import { useImageUpload } from "../hooks/useImageUpload";
import { LanguageCode, WorkStatus, WorkStatusLabels } from "../types";
import SortableItem from "../components/artwork/SortableItem"; // 별도 분리 권장

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

const ArtworkPost: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // 🚀 공통 훅 및 작품 훅 사용
  const { imageList, setImageList, loading: saveLoading, createArtwork } = useArtwork();
  const { uploadSingleImage, isUploading } = useImageUpload();

  // 순서 변경 처리
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

  // URL 직접 추가
  const addExternalUrl = () => {
    const url = form.getFieldValue("urlInput");
    if (!url) return;
    setImageList([...imageList, url]);
    form.setFieldsValue({ urlInput: "" });
  };

  // 🚀 공통 업로드 훅 적용
  const handleFileUpload = async (file: File) => {
    const url = await uploadSingleImage(file, "artwork");
    if (url) {
      setImageList((prev) => [...prev, url]);
    }
    return false;
  };

  const onFinish = async (values: any) => {
    const success = await createArtwork(values);
    if (success) {
      message.success("작품이 성공적으로 등록되었습니다!");
      navigate("/admin/artworks");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 1000, margin: "20px auto" }}>
      <Card title={<span><PictureOutlined /> 작품 기본 정보</span>}>
        <section style={{ marginBottom: 32 }}>
          <span style={{ display: "block", marginBottom: 12, fontWeight: "bold" }}>이미지 등록 (첫 번째 이미지가 썸네일이 됩니다)</span>
          
          <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
            <Form.Item name="urlInput" noStyle>
              <Input prefix={<LinkOutlined />} placeholder="이미지 URL 직접 입력" />
            </Form.Item>
            <Button type="primary" onClick={addExternalUrl} icon={<PlusOutlined />}>추가</Button>
          </Space.Compact>

          <Dragger beforeUpload={handleFileUpload} showUploadList={false} multiple loading={isUploading}>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">클릭하거나 파일을 드래그하여 업로드</p>
          </Dragger>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={imageList} strategy={verticalListSortingStrategy}>
              <div style={{ marginTop: 16 }}>
                {imageList.map((url, index) => (
                  <SortableItem 
                    key={url} 
                    id={url} 
                    url={url} 
                    onRemove={() => setImageList(imageList.filter((_, i) => i !== index))} 
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <Form.Item name="status" label="작업 상태" rules={[{ required: true }]}>
            <Select placeholder="상태 선택">
              {Object.entries(WorkStatus).map(([key, value]) => (
                <Select.Option key={key} value={value}>{WorkStatusLabels[value as keyof typeof WorkStatusLabels]}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="workPeriod" label="작업 기간">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="medium" label="재료 (Medium)"><Input placeholder="예: Oil on canvas" /></Form.Item>
          <Form.Item name="size" label="규격 (Size)"><Input placeholder="예: 60 x 60 cm" /></Form.Item>
        </div>
      </Card>

      {/* 🌐 다국어 섹션: 향후 JA, CN 탭만 추가하면 끝! */}
      <Card title="🌐 다국어 정보 관리" style={{ marginTop: 24 }}>
        <Tabs
          type="card"
          items={[
            { key: LanguageCode.KO, label: "한국어 (KO)", children: <LanguageFields prefix="ko" /> },
            { key: LanguageCode.EN, label: "English (EN)", children: <LanguageFields prefix="en" /> },
          ]}
        />
      </Card>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 16 }}>
        <Form.Item name="isPublic" valuePropName="checked" noStyle>
          <Switch checkedChildren="공개" unCheckedChildren="비공개" defaultChecked />
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large" loading={saveLoading} icon={<SaveOutlined />} style={{ minWidth: 150 }}>
          작품 등록 완료
        </Button>
      </div>
    </Form>
  );
};

// 내부 컴포넌트로 분리하여 관리자 가독성 향상
const LanguageFields = ({ prefix }: { prefix: string }) => (
  <div style={{ padding: "16px 0" }}>
    <Form.Item name={`${prefix}Title`} label="작품 제목" rules={[{ required: prefix === 'ko' }]}>
      <Input placeholder={`${prefix.toUpperCase()} 제목을 입력하세요`} />
    </Form.Item>
    <Form.Item name={`${prefix}Desc`} label="작품 설명">
      <Input.TextArea rows={4} placeholder={`${prefix.toUpperCase()} 설명을 입력하세요`} />
    </Form.Item>
  </div>
);

export default ArtworkPost;