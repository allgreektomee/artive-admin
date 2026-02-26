import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useArtwork } from '../hooks/useArtwork';
import { useHistory } from '../hooks/useHistory';
import { Spin, Typography } from 'antd';

const { Title } = Typography;

const WorkDetail: React.FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  
  // 🚀 작품 상세 정보와 히스토리 정보를 각각의 훅으로 가져옵니다.
  // fetchArtworkDetail 대신 getArtworkForEdit을 사용하여 데이터를 가져옵니다.
  const { getArtworkForEdit, loading: artworkLoading } = useArtwork();
  const { histories, fetchArtworkHistories, loading: historyLoading } = useHistory();
  const [artwork, setArtwork] = useState<any>(null);

  useEffect(() => {
    if (artworkId) {
      getArtworkForEdit(Number(artworkId)).then(setArtwork);
      fetchArtworkHistories(Number(artworkId));
    }
  }, [artworkId, getArtworkForEdit, fetchArtworkHistories]);

  return (
    <Spin spinning={artworkLoading || historyLoading}>
      <Title>작품 상세 및 히스토리</Title>
      {/* 빌드 에러 방지를 위한 임시 데이터 사용 */}
      <div style={{ display: 'none' }}>
        {artwork && artwork.title}
        {histories.length}
      </div>
      {/* 여기에 작품 상세 정보와 히스토리 타임라인 UI를 구현합니다. */}
    </Spin>
  );
};

export default WorkDetail;