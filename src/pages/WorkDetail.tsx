import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useArtwork } from '../hooks/useArtwork';
import { useHistory } from '../hooks/useHistory';
import { Spin, Typography } from 'antd';

const { Title } = Typography;

const WorkDetail: React.FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  
  // 🚀 작품 상세 정보와 히스토리 정보를 각각의 훅으로 가져옵니다.
  const { artwork, fetchArtworkDetail, loading: artworkLoading } = useArtwork();
  const { histories, fetchArtworkHistories, loading: historyLoading } = useHistory();

  useEffect(() => {
    if (artworkId) {
      fetchArtworkDetail(Number(artworkId));
      fetchArtworkHistories(Number(artworkId));
    }
  }, [artworkId, fetchArtworkDetail, fetchArtworkHistories]);

  return (
    <Spin spinning={artworkLoading || historyLoading}>
      <Title>작품 상세 및 히스토리</Title>
      {/* 여기에 작품 상세 정보와 히스토리 타임라인 UI를 구현합니다. */}
    </Spin>
  );
};

export default WorkDetail;