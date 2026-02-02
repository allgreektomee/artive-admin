import React, { useEffect, useState } from "react";
import {
  List,
  Card,
  Button,
  Typography,
  Tag,
  Space,
  Empty,
  Spin,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { historyApi } from "../api/historyApi";
import HistoryMedia from "../components/history/HistoryMedia"; // 이전에 만든 미디어 렌더러
import type { HistoryDetailResponse } from "../types/history";
const { Title, Text } = Typography;

const HistoryList: React.FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState<HistoryDetailResponse[]>([]);

  // 2. 페이징 상태 추가 (선택 사항)
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchHistories = async (page = 0) => {
      if (!artworkId) return;
      setLoading(true);
      try {
        // API 호출 시 언어설정과 페이지 번호 전달 (백엔드 구조에 맞춰)
        const res = await historyApi.getArtworkHistories(
          Number(artworkId),
          "ko",
          page,
        );

        if (res.data.success) {
          // 🚀 PageResponse 구조에 따라 접근
          // 보통 res.data.data.content 에 실제 리스트가 들어있습니다.
          const pageData = res.data.data;
          setHistories(pageData.content);
          setTotal(pageData.totalElements || 0); // 페이징용 전체 개수
        }
      } catch (err) {
        console.error(err);
        message.error("히스토리를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistories(currentPage - 1); // 백엔드 페이지는 보통 0부터 시작
  }, [artworkId, currentPage]);

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
            onChange: (page) => setCurrentPage(page),
            align: "center",
            style: { marginTop: 20 },
          }}
          renderItem={(item) => (
            <Card style={{ marginBottom: 16, borderRadius: 12 }}>
              {/* ... 카드 내용 생략 (기존과 동일) ... */}
            </Card>
          )}
        />
      </Spin>
    </div>
  );
};

export default HistoryList;
