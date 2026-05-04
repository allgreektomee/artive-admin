import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spin, Result, Image, Descriptions, Space, Typography } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { artworkApi } from "../api/artworkApi.js";

const LIST_BASE = "/dev/react-test/artworks";

/**
 * 16장 · 작품 상세 화면
 *
 * - `useParams().id` 가 바뀔 때마다 GET `/artworks/:id` (cleanup 으로 race 방지).
 * - 목록과 달리 훅 없이 페이지에서 직접 `artworkApi` 호출 — 레이어 비교용.
 * - 수정은 alert 만 (연재 안전).
 */
export default function ArtworkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [detail, setDetail] = useState(null);

  const numericId = id != null ? Number(id) : NaN;

  // 16장: id 변경 → 상세 재요청; 언마운트/빠른 이동 시 cancelled 로 stale set 방지
  useEffect(() => {
    if (!Number.isFinite(numericId)) {
      setLoading(false);
      setError(true);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const res = await artworkApi.getArtworkDetail(numericId);
        if (cancelled) return;
        if (res.data?.success) {
          setDetail(res.data.data);
        } else {
          setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [numericId]);

  if (!Number.isFinite(numericId)) {
    return (
      <Result
        status="404"
        title="잘못된 작품 ID"
        extra={
          <Button type="primary" onClick={() => navigate(LIST_BASE)}>
            목록으로
          </Button>
        }
      />
    );
  }

  if (loading) {
    return (
      <div style={{ padding: 48, textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !detail) {
    return (
      <Result
        status="warning"
        title="작품을 불러올 수 없습니다"
        extra={
          <Button type="primary" onClick={() => navigate(LIST_BASE)}>
            목록으로
          </Button>
        }
      />
    );
  }

  const images = Array.isArray(detail.images) ? detail.images : [];

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate(LIST_BASE)} style={{ paddingLeft: 0 }}>
            목록으로
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              window.alert(
                "[reactTestProject]\n실제 수정 화면·저장은 비활성화입니다.\n(실제 코드: navigate(`/admin/artworks/edit/${id}`))",
              );
            }}
          >
            수정
          </Button>
        </div>

        <Typography.Title level={3} style={{ margin: 0 }}>
          작품 상세 #{detail.id}
        </Typography.Title>

        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="한글 제목">{detail.koTitle ?? "—"}</Descriptions.Item>
          <Descriptions.Item label="영문 제목">{detail.enTitle ?? "—"}</Descriptions.Item>
          <Descriptions.Item label="공개 여부">{detail.visibility ?? "—"}</Descriptions.Item>
          <Descriptions.Item label="썸네일 URL">
            {detail.thumbnailUrl ? (
              <Image src={detail.thumbnailUrl} width={120} style={{ objectFit: "cover" }} />
            ) : (
              "—"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="한글 설명">{detail.koDescription ?? "—"}</Descriptions.Item>
          <Descriptions.Item label="영문 설명">{detail.enDescription ?? "—"}</Descriptions.Item>
        </Descriptions>

        <div>
          <Typography.Text strong>이미지 목록 ({images.length})</Typography.Text>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {images.length === 0 ? (
              <Typography.Text type="secondary">없음</Typography.Text>
            ) : (
              images.map((url, i) => (
                <Image key={`${url}-${i}`} src={url} width={100} height={100} style={{ objectFit: "cover" }} />
              ))
            )}
          </div>
        </div>
      </Space>
    </div>
  );
}
