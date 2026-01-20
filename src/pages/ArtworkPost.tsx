import React, { useEffect } from "react";
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
  Spin,
} from "antd";
import {
  InboxOutlined,
  SaveOutlined,
  LinkOutlined,
  PictureOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

// DND 관련
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
  const { id } = useParams(); // 🚀 URL에서 ID 추출
  const isEdit = !!id; // 수정 모드 여부

  // 🚀 공통 훅 및 작품 훅 사용
  const {
    imageList,
    setImageList,
    loading: saveLoading,
    createArtwork,
    getArtworkForEdit,
    updateArtwork,
  } = useArtwork();

  const { uploadSingleImage, isUploading } = useImageUpload();

  useEffect(() => {
    if (isEdit) {
      const loadDetail = async () => {
        const data = await getArtworkForEdit(Number(id));
        if (data) {
          // Ant Design Form에 데이터 세팅
          form.setFieldsValue({
            ...data,
            // 백엔드 날짜 데이터가 있다면 dayjs로 변환하여 RangePicker에 세팅
            workPeriod:
              data.startedAt && data.finishedAt
                ? [dayjs(data.startedAt), dayjs(data.finishedAt)]
                : undefined,
          });
        }
      };
      loadDetail();
    }
  }, [id, isEdit, form]);
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
    try {
    const url = await uploadSingleImage(file, "artwork");
    
    if (url) {
      // 🚀 핵심: (prev) => ... 처럼 이전 상태값을 인자로 받아야 합니다.
      // 이렇게 하면 리액트가 업데이트 큐를 순차적으로 처리하여 4장 모두 유실 없이 쌓입니다.
      setImageList((prev) => {
        // 이미 리스트에 있는 URL인지 중복 체크 (안정성 확보)
        if (prev.includes(url)) return prev;
        
        const nextList = [...prev, url];
        console.log("현재 업데이트된 이미지 리스트:", nextList);
        return nextList;
      });
    }
  } catch (error) {
    console.error("파일 업로드 중 에러 발생:", error);
  }
    return false;
  };

  const onFinish = async (values: any) => {
    const success = isEdit
      ? await updateArtwork(Number(id), values)
      : await createArtwork(values);

    if (success) {
      message.success(
        `작품이 성공적으로 ${isEdit ? "수정" : "등록"}되었습니다!`
      );
      navigate("/admin/artworks");
    }
  };

  return (
    <Spin spinning={saveLoading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 1000, margin: "20px auto" }}
        initialValues={{ isPublic: true }} // 기본값
      >
        <Card
          title={
            <span>
              <PictureOutlined /> {isEdit ? "작품 정보 수정" : "작품 기본 정보"}
            </span>
          }
        >
          {/* 이미지 섹션 (기존 코드 유지) */}
          <section style={{ marginBottom: 32 }}>
            <span
              style={{ display: "block", marginBottom: 12, fontWeight: "bold" }}
            >
              이미지 등록 (첫 번째 이미지가 썸네일이 됩니다)
            </span>
            <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
              <Form.Item name="urlInput" noStyle>
                <Input
                  prefix={<LinkOutlined />}
                  placeholder="이미지 URL 직접 입력"
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
            <Spin spinning={isUploading} tip="이미지 업로드 중...">
              <Dragger
                beforeUpload={handleFileUpload}
                showUploadList={false}
                multiple={true}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  클릭하거나 파일을 드래그하여 업로드
                </p>
              </Dragger>
            </Spin>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={imageList}
                strategy={verticalListSortingStrategy}
              >
                {/* 🚀 minHeight와 패딩을 주어 영역을 확실히 확보하세요 */}
                <div
                  style={{
                    marginTop: 16,
                    minHeight: "50px",
                    border:
                      imageList.length === 0 ? "1px dashed #d9d9d9" : "none",
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                >
                  {imageList.map((url, index) => (
                    <SortableItem
                      key={`img-${index}-${url.substring(url.length - 10)}`} // 인덱스와 URL 끝자리 조합
                      id={url}
                      url={url}
                      onRemove={() =>
                        setImageList(imageList.filter((_, i) => i !== index))
                      }
                    />
                  ))}
                  {imageList.length === 0 && (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#999",
                        lineHeight: "50px",
                      }}
                    >
                      등록된 이미지가 없습니다.
                    </p>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </section>

          {/* 정보 그리드 섹션 */}
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
              <Select placeholder="상태 선택">
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
              <Input placeholder="예: Oil on canvas" />
            </Form.Item>
            <Form.Item name="size" label="규격 (Size)">
              <Input placeholder="예: 60 x 60 cm" />
            </Form.Item>
          </div>
        </Card>

        {/* 다국어 섹션 (기존 유지) */}
        <Card title="🌐 다국어 정보 관리" style={{ marginTop: 24 }}>
          <Tabs
            type="card"
            items={[
              {
                key: LanguageCode.KO,
                label: "한국어 (KO)",
                children: <LanguageFields prefix="ko" />,
              },
              {
                key: LanguageCode.EN,
                label: "English (EN)",
                children: <LanguageFields prefix="en" />,
              },
            ]}
          />
        </Card>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "flex-end",
            gap: 16,
          }}
        >
          <Form.Item name="isPublic" valuePropName="checked" noStyle>
            <Switch checkedChildren="공개" unCheckedChildren="비공개" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={saveLoading}
            icon={<SaveOutlined />}
            style={{ minWidth: 150 }}
          >
            {isEdit ? "작품 수정 완료" : "작품 등록 완료"}
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

const LanguageFields = ({ prefix }: { prefix: string }) => (
  <div style={{ padding: "16px 0" }}>
    <Form.Item
      name={`${prefix}Title`}
      label="작품 제목"
      rules={[{ required: prefix === "ko" }]}
    >
      <Input placeholder={`${prefix.toUpperCase()} 제목을 입력하세요`} />
    </Form.Item>
    <Form.Item name={`${prefix}Description`} label="작품 설명">
      <Input.TextArea
        rows={4}
        placeholder={`${prefix.toUpperCase()} 설명을 입력하세요`}
      />
    </Form.Item>
  </div>
);

export default ArtworkPost;
