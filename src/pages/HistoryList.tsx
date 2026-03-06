import React, { useEffect } from "react";
import { List, Card, Button, Typography, Tag, Space, Spin, Result } from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useHistory } from "../hooks/useHistory";

import HistoryMedia from "../components/history/HistoryMedia"; // 이전에 만든 미디어 렌더러

const { Title, Text } = Typography;

const HistoryList: React.FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  const navigate = useNavigate();

  const {
    loading,
    fetchArtworkHistories,
    error,
    deleteHistory,
    histories,
    currentPage,
    total,
  } = useHistory();

  useEffect(() => {
    fetchArtworkHistories(Number(artworkId));
  }, []);

  if (error) {
    return (
      <Result
        status="warning"
        title="데이터를 가져올 수 없습니다"
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => fetchArtworkHistories(Number(artworkId))}
          >
            다시 시도
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
      {/* 상단 헤더 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Space size="middle">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          <Title level={3} style={{ margin: 0 }}>
            작업 히스토리 관리
          </Title>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(`/admin/artworks/${artworkId}/history/post`)}
        >
          새 기록 추가
        </Button>
      </div>

      <Spin spinning={loading}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={histories}
          // 🚀 하단 페이징 UI 추가
          pagination={{
            current: currentPage,
            total: total,
            pageSize: 10,
            onChange: (page) => fetchArtworkHistories(Number(artworkId), page),
            align: "center",
            style: { marginTop: 20 },
          }}
          renderItem={(item) => (
            <Card
              style={{ marginBottom: 16, borderRadius: 12, overflow: "hidden" }}
              hoverable
              bodyStyle={{ padding: "20px" }}
            >
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {/* 1. 왼쪽 미디어 영역 (300px 고정) */}
                <div style={{ flex: "0 0 300px", minWidth: 300 }}>
                  <HistoryMedia
                    type={item.type}
                    imageUrl={item.imageUrl || ""}
                    title={item.title}
                  />
                </div>

                {/* 2. 오른쪽 정보 영역 (남은 공간 모두 차지) */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Space direction="vertical" size={4}>
                      {/* 타입별 태그 표시 */}
                      <Tag
                        color={
                          item.type === "YOUTUBE"
                            ? "red"
                            : item.type === "IMGURL"
                              ? "blue"
                              : "orange"
                        }
                      >
                        {item.type}
                      </Tag>
                      <Title level={4} style={{ margin: "8px 0" }}>
                        {item.title}
                      </Title>
                    </Space>

                    {/* 등록 날짜 */}
                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      <ClockCircleOutlined style={{ marginRight: 4 }} />
                      {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
                    </Text>
                  </div>

                  {/* 상세 내용 박스 */}
                  <div
                    style={{
                      marginTop: 16,
                      padding: "16px",
                      background: "#f8f9fa",
                      borderRadius: "8px",
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <Text style={{ whiteSpace: "pre-wrap", color: "#555" }}>
                      {item.content}
                    </Text>
                  </div>

                  {/* 하단 버튼 (수정/삭제 등 추가 시) */}
                  <div style={{ marginTop: 16, textAlign: "right" }}>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => deleteHistory(item.id)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}
        />
      </Spin>
    </div>
  );
};

export default HistoryList;
