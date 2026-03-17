import React, { useEffect, useCallback } from "react"; // useCallback 추가
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
  GlobalOutlined,
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
import SortableItem from "../components/artwork/SortableItem";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

const ArtworkPost: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const {
    imageList,
    setImageList,
    loading: saveLoading,
    createArtwork,
    getArtworkForEdit,
    updateArtwork,
  } = useArtwork();

  const { uploadSingleImage, isUploading } = useImageUpload();

  // 🚀 [수정] 데이터 로딩 로직을 별도 함수로 분리하여 useEffect 안정성 확보
  const loadDetail = useCallback(
    async (artworkId: number) => {
      try {
        const data = await getArtworkForEdit(artworkId);
        if (data) {
          // 🔥 중요: 이미지 리스트를 먼저 세팅해줘야 폼 데이터와 동기화됩니다.
          if (data.images) {
            setImageList(data.images);
          }

          form.setFieldsValue({
            ...data,
            workPeriod:
              data.startedAt && data.finishedAt
                ? [dayjs(data.startedAt), dayjs(data.finishedAt)]
                : undefined,
          });
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        message.error("작품 정보를 가져오는데 실패했습니다.");
      }
    },
    [getArtworkForEdit, form, setImageList],
  );

  useEffect(() => {
    if (isEdit && id) {
      loadDetail(Number(id));
    } else {
      // 신규 등록 시 폼 초기화
      form.resetFields();
      setImageList([]);
    }
  }, [id, isEdit, loadDetail, form, setImageList]);

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

  const addExternalUrl = () => {
    const url = form.getFieldValue("urlInput");
    if (!url) return;
    setImageList([...imageList, url]);
    form.setFieldsValue({ urlInput: "" });
  };

  const handleFileUpload = async (file: File) => {
    try {
      const url = await uploadSingleImage(file, "artwork");
      if (url) {
        setImageList((prev) => (prev.includes(url) ? prev : [...prev, url]));
      }
    } catch (error) {
      console.error("파일 업로드 에러:", error);
    }
    return false;
  };

  // 🚀 [핵심 수정] onFinish에서 날짜 포맷팅을 명시적으로 처리하여 백엔드 400/403 방지
  const onFinish = async (values: any) => {
    const { workPeriod, urlInput, ...rest } = values;

    // 백엔드 날짜 형식에 맞게 변환 (YYYY-MM-DD)
    const formattedValues = {
      ...rest,
      images: imageList, // 현재 DND로 정렬된 이미지 리스트를 명시적으로 전달
      startedAt: workPeriod ? workPeriod[0].format("YYYY-MM-DD") : null,
      finishedAt: workPeriod ? workPeriod[1].format("YYYY-MM-DD") : null,
    };

    const success = isEdit
      ? await updateArtwork(Number(id), formattedValues)
      : await createArtwork(formattedValues);

    if (success) {
      message.success(
        `작품이 성공적으로 ${isEdit ? "수정" : "등록"}되었습니다!`,
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
        initialValues={{ isPublic: true, status: WorkStatus.COMPLETED }}
      >
        <Card
          title={
            <span>
              <PictureOutlined /> {isEdit ? "작품 정보 수정" : "작품 기본 정보"}
            </span>
          }
        >
          {/* 이미지 섹션 */}
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
                      key={`img-${index}-${url.substring(url.length - 10)}`}
                      id={url}
                      url={url}
                      onRemove={() =>
                        setImageList(imageList.filter((_, i) => i !== index))
                      }
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </section>

          {/* 정보 그리드 */}
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
              <Input />
            </Form.Item>
            <Form.Item name="size" label="규격 (Size)">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="가격 (Price)">
              <Input type="number" prefix="₩" />
            </Form.Item>
            <Form.Item name="youtubeUrl" label="유튜브 URL">
              <Input prefix={<LinkOutlined />} />
            </Form.Item>
            <Form.Item name="externalUrl" label="WP 주소">
              <Input prefix={<GlobalOutlined />} />
            </Form.Item>
          </div>
        </Card>

        {/* 다국어 섹션 */}
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
            htmlType="submit" // 🔥 이 버튼을 누를 때만 onFinish(PUT/POST)가 실행됩니다.
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
      <Input />
    </Form.Item>
    <Form.Item name={`${prefix}Description`} label="작품 설명">
      <Input.TextArea rows={4} />
    </Form.Item>
  </div>
);

export default ArtworkPost;
