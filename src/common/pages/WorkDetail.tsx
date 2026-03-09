import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Timeline } from 'antd';

const WorkDetail: React.FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>();

  return (
    <div style={{ padding: '40px 20px', maxWidth: 800, margin: '0 auto' }}>
      <Typography.Title level={2}>Artwork #{artworkId}</Typography.Title>
      <Typography.Paragraph>작품 상세 설명 및 히스토리 타임라인이 이곳에 표시됩니다.</Typography.Paragraph>
      
      <div style={{ marginTop: 40 }}>
        <Timeline mode="left">
          <Timeline.Item label="2023-10-01">작업 시작</Timeline.Item>
          <Timeline.Item label="2023-10-15">1차 스케치 완료</Timeline.Item>
          <Timeline.Item>현재 진행 중</Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};

export default WorkDetail;