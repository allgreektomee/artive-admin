import React from 'react';
import { Typography, Divider } from 'antd';

const CriticPage: React.FC = () => {
  return (
    <div style={{ padding: '40px 0', maxWidth: 700, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <Typography.Title level={2} style={{ fontFamily: 'serif' }}>CRITIC & VIEW</Typography.Title>
        <Typography.Text type="secondary">Perspectives on Contemporary Art</Typography.Text>
      </div>

      <div style={{ marginBottom: 60 }}>
        <Typography.Title level={3} style={{ fontFamily: 'serif', marginBottom: 10 }}>"경계에 선 예술가"</Typography.Title>
        <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 30 }}>Written by Art Critic J.Doe</Typography.Text>
        
        <Typography.Paragraph style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 24 }}>
          (이곳에 비평글 본문이 들어갑니다. 텍스트의 가독성을 위해 적절한 줄간격과 폰트 크기를 적용했습니다.)<br/>
          현대 미술의 흐름 속에서 작가가 보여주는 독창적인 시각은...
        </Typography.Paragraph>
        <div style={{ width: '100%', height: 300, background: '#f5f5f5', margin: '40px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>Reference Image</div>
      </div>
      <Divider />
    </div>
  );
};

export default CriticPage;